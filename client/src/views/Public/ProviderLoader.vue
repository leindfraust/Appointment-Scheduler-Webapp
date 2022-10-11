<template>
    <div id="background">
        <NavigationTab />
        <div class="modal" :class="{ 'is-active': isHospitalLoading }">
            <div class="modal-background"></div>
            <div class="modal-content" style="overflow: hidden">
                <div class="loader" style="margin: auto;"></div>
            </div>
        </div>
        <div class="block is-hidden-desktop"></div>
        <div v-if="citiesOrMunicipalities != ''">
            <div class="columns is-mobile" style="overflow: auto;">
                <div class="column is-narrow">
                    <div class="select is-rounded">
                        <select v-model="city">
                            <option value="" disabled>City/Municipality</option>
                            <option value="">Any</option>
                            <option
                                v-for="(cityorMunicipality, index) in citiesOrMunicipalities.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                :key="index">{{
                                cityorMunicipality.name
                                }}</option>
                        </select>
                    </div>
                </div>
                <div class="column is-narrow">
                    <div class="select is-rounded">
                        <select v-model="typeFilter">
                            <option :value="''" disabled>Type of Facility</option>
                            <option :value="''">Any</option>
                            <option value="Public">Public Hospital</option>
                            <option value="Private">Private Hospital</option>
                            <option value="Clinic">Clinic</option>
                        </select>
                    </div>
                </div>
                <div class="column is-narrow">
                    <button class="button is-rounded" @click="filterDistanceToggle"><span>Distance</span><span
                            class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true" v-if="distanceFilter"></i>
                            <i class="fas fa-angle-up" aria-hidden="true" v-else></i>
                        </span></button>
                </div>
                <div class="column is-narrow">
                    <div class="select is-rounded">
                        <select v-model="filterSpecialist" @change="filterBySpecialization">
                            <option value="" disabled>Specialist</option>
                            <option value="">Any</option>
                            <option v-for="specialist in specializations" :key="specialist" :value="specialist">{{
                            specialist
                            }}</option>
                        </select>
                    </div>
                </div>
                <div class="column">
                    <div class="is-pulled-right">
                        <div class="field has-addons">
                            <div class="control has-icons-left">
                                <input class="input" type="text" v-model="province" style="width: 300px;"
                                    placeholder="What region are you located?" list="provinces" />
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-location-dot"></i>
                                </span>
                            </div>
                            <datalist id="provinces">
                                <option v-for="geodata in geolocationIndexed" :key="geodata._id">
                                    {{geodata.province}}</option>
                            </datalist>
                            <div class="control">
                                <button class="button is-info is-rounded" @click="loadProvider()"
                                    :disabled="province == ''">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column" v-if="geoHospitalNearestUser.length !== 0"
                    style="max-height: 100vh; overflow: auto">
                    <div class="container is-fluid">
                        <div class="columns has-text-left" id="hospital" style="margin-bottom: 5%"
                            v-for="(geoHospital, index) in geoHospitalNearestUserIndexed" :key="index">
                            <div class="column is-5">
                                <a @click="bookAppointment(geoHospital)">
                                    <figure class="image is-3by2 is-rounded">
                                        <img loading="lazy" style="border-radius: 10px"
                                            :src="`https://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/managers/${geoHospital.hospital}.jpg`" />
                                    </figure>
                                </a>
                            </div>
                            <div class="column">
                                <div class="notification is-info is-light"
                                    v-if="filterSpecialist && geoHospital?.specialistArrFilter !== 0">{{
                                    geoHospital?.specialistArrFilter
                                    }} available {{ filterSpecialist }}</div>
                                <a @click="bookAppointment(geoHospital)">
                                    <h1 class="title is-4">{{ geoHospital.hospital }}</h1>
                                    <p class="subtitle is-6">{{ geoHospital.barangayORStreet }}, {{ geoHospital.city }},
                                        {{
                                        geoHospital.province
                                        }}</p>
                                </a>
                                <br>
                                <div class="content">
                                    <b>Type of Facility:</b> {{ geoHospital.type }}
                                    <span v-if="typeof geoHospital.details[0].contacts !== 'undefined'">
                                        <p class="subtitle is-6"><b>Contacts:</b> <span
                                                v-for="(contacts, index) in geoHospital.details[0].contacts"
                                                :key="index">
                                                {{ contacts.contact + ' ' }}</span></p>
                                    </span>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div class="column notification is-danger is-light has-text-centered"
                        v-if="geoHospitalNearestUserIndexed.length == 0">
                        Sorry, no Hospitals/Clinics has been found.
                    </div>
                </div>
                <div class="column notification is-danger is-light has-text-centered" v-else-if="!isHospitalLoading">
                    Hospitals/Clinics not found, please try again or search another region.
                </div>
                <div class="column is-5">
                    <iframe loading="lazy" id="geoIframe"
                        :src="`https://maps.google.com/maps?q=${userLatitude},${userLongitude}&hl=es;z=14&amp;output=embed`"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import NavigationTab from '../../components/NavigationTab.vue'

export default {
    name: "HospitalFinder",
    computed: {
        geolocationIndexed() {
            return this.geolocation.filter(x => { return x.province.toLowerCase().includes(this.province.toLowerCase()); });
        },
        geoHospitalNearestUserIndexed() {
            if (this.geoHospitalNearestUser && this.filterSpecialist) {
                return this.geoHospitalNearestUser.filter(x => { return x.hospital.toLowerCase().includes(this.hospital.toLowerCase()); }).filter(x => x?.specialistArrFilter > 0).filter(x => this.typeFilter == '' ? x.type == 'Private' || x.type == 'Public' || x.type == 'Clinic' : x.type == this.typeFilter).filter(x => x.city.includes(this.city));
            } else if (this.geoHospitalNearestUser) {
                return this.geoHospitalNearestUser.filter(x => { return x.hospital.toLowerCase().includes(this.hospital.toLowerCase()); }).filter(x => this.typeFilter == '' ? x.type == 'Private' || x.type == 'Public' || x.type == 'Clinic' : x.type == this.typeFilter).filter(x => x.city.includes(this.city))
            }
            else {
                return false;
            }
        }
    },
    async mounted() {
        await axios.get("/api/geolocation").then(response => this.geolocation = response.data);
        await this.loadProvider()
    },
    data() {
        return {
            city: "",
            isHospitalLoading: false,
            checkUser: "",
            hospital: "",
            geolocation: [],
            typeFilter: '',
            citiesOrMunicipalities: [],
            province: this.$route.query.name,
            userLatitude: this.$route.query.userLat,
            userLongitude: this.$route.query.userLong,
            geoHospitalNearestUser: "",
            specializations: this.$store.getters.getSpecializationList,
            filterSpecialist: this.$route.query.symptom,
            distanceFilter: false,
            doctorSpecialistFilter: [],
            provincePrompt: false
        };
    },
    methods: {
        async bookAppointment(hospitalDetails) {
            this.$store.commit("hospitalDetails", hospitalDetails)
            await axios.put(`/api/manager/${hospitalDetails._id}`, {
                engagements: hospitalDetails.engagements + 1
            });
            await this.$router.push(`/${hospitalDetails._id}/doctors`)
        },
        filterDistanceToggle() {
            this.isHospitalLoading = true;
            this.geoHospitalNearestUser.sort((a, b) => this.distanceFilter ? b.distance - a.distance : a.distance - b.distance);
            this.distanceFilter = !this.distanceFilter
            this.isHospitalLoading = false;
        },
        async loadProvider() {
            this.isHospitalLoading = true;
            if (await this.geolocation.find(x => x.province === this.province)) {
                this.$router.push({ path: '/provider', query: { name: this.province, symptom: this.filterSpecialist, userLat: this.userLatitude, userLong: this.userLongitude } })
                this.citiesOrMunicipalities = this.geolocation.find(x => x.province === this.province);
                await axios.post("/api/geoFindHospitalNearestUser", {
                    province: this.province,
                    latitude: parseFloat(this.userLatitude),
                    longitude: parseFloat(this.userLongitude)
                }).then(response => this.geoHospitalNearestUser = response.data);
                document.getElementById('background').style.background = 'none'
                if (this.filterSpecialist) {
                    await this.filterBySpecialization()
                }
            }
            this.isHospitalLoading = false;
        },
        async filterBySpecialization() {
            this.isHospitalLoading = true;
            this.doctorSpecialistFilter = []
            this.$router.push({ path: '/provider', query: { name: this.province, symptom: this.filterSpecialist, userLat: this.userLatitude, userLong: this.userLongitude } })
            await axios.get("/api/doctor/filteration").then(response => {
                this.geoHospitalNearestUser.forEach((e) => this.doctorSpecialistFilter.push(response.data.filter(x => x.hospitalOrigin.find(x => x.hospital == e.hospital) && x.specialist.find(x => x == this.filterSpecialist && e.specializations.find(x => x.specialist == this.filterSpecialist)) && (x.schedule).find(x => x.hospital == e.hospital && new Date(x.id) > new Date())).length))
            });

            this.geoHospitalNearestUser.forEach((x, i) => x["specialistArrFilter"] = this.doctorSpecialistFilter[i])
            this.geoHospitalNearestUser.sort((a, b) => b.specialistArrFilter - a.specialistArrFilter)
            this.isHospitalLoading = false;
        },
    },
    components: { NavigationTab }
}
</script>
<style scoped>
.separator {
    display: flex;
    align-items: center;
    text-align: center;
}

.separator::before,
.separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
}

.separator:not(:empty)::before {
    margin-right: .25em;
}

.separator:not(:empty)::after {
    margin-left: .25em;
}

@media (max-width: 991.98px) {
    #geoIframe {
        width: 75vw;
        height: 200px;
    }

    #background {
        height: auto !important;
    }

    #notification-region {
        width: 100% !important;
    }

    #location-prompt {
        width: 100% !important;
    }
}

#geoIframe {
    position: relative;
    height: 100%;
    width: 100%;
}

#location-prompt {
    width: 50%;
    margin: auto;
}

#background {
    height: 100vh;
    background: no-repeat center url('../../assets/images/background-client.png');
    background-size: cover;
}

.loader {
    border: 7px solid #f3f3f3;
    border-radius: 50%;
    border-top: 7px solid gray;
    border-bottom: 7px solid gray;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 991.98px) {
    #notification {
        width: 100% !important;
    }

    #hospital {
        margin-bottom: 15% !important;
    }
}

/* custom scrollbar */
::-webkit-scrollbar {
    width: 20px;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
}

[list]::-webkit-calendar-picker-indicator {
    opacity: 0 !important;
}
</style>