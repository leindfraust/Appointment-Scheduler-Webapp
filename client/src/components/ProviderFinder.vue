<template>
    <div id="background">
        <NavigationTab />
        <div class="modal" :class="{ 'is-active': isHospitalLoading }">
            <div class="modal-background"></div>
            <div class="modal-content" style="overflow: hidden">
                <div class="loader" style="margin: auto;"></div>
            </div>
        </div>
        <section class="section is-medium has-text-centered" v-if="citiesOrMunicipalities == ''">
            <h1 class="title">Find and make an appointment on hospitals or clinics
            </h1>
            <div class="container" v-if="citiesOrMunicipalities == ''">
                <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                    <div class="dropdown-trigger">
                        <div class="field has-addons">
                            <div class="control has-icons-left">
                                <input class="input" type="text" v-model="province" style="width: 300px;"
                                    placeholder="What region are you located?" @click="regionSelect"
                                    :disabled="locationPermissionDenied" />
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-location-dot"></i>
                                </span>
                            </div>
                            <div class="control">
                                <button class="button is-info is-rounded" @click="loadProvider('')"
                                    :disabled="province == ''">Search</button>
                            </div>
                            <div class="notification is-light is-danger" v-if="locationPermissionDenied">
                                <a class="has-text-success" @click="getUserLocation">Enable</a> location to start
                                booking an
                                <b>appointment</b>.
                            </div>
                        </div>
                        <div class="dropdown-menu">
                            <div class="dropdown-content has-text-left"
                                v-if="Object.keys(geolocationIndexed).length !== 0">
                                <a class="dropdown-item" v-for="geodata in geolocationIndexed" :key="geodata._id"
                                    @click="selectRegion(geodata.province)">{{ geodata.province }}</a>
                            </div>

                            <div class="dropdown-content has-text-left" v-else>
                                <p class="dropdown-item has-text-danger">
                                    Region not found or supported, please try again.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">&nbsp;</div>
                <div>
                    <div class="notification is-info" style="width: 50%; margin: auto"
                        v-if="provincePrompt && this.province == ''">You must
                        select a region first.</div>
                    <div class="columns" style="width: 80%; margin:auto">
                        <div class="column " id="mental-health">
                            <a @click="loadProvider('Psychiatrists')">
                                <img src="../assets/images/symptoms/mental-health.png" />
                                <p class="subtitle is-5">Mental Health</p>
                            </a>
                        </div>
                        <div class="column" id="UTI">
                            <a @click="loadProvider('Nephrologists')">
                                <img src="../assets/images/symptoms/UTI.png" />
                                <p class="subtitle is-5">UTI</p>
                            </a>
                        </div>
                        <div class="column" id="stomach-pain">
                            <a @click="loadProvider('Gastroenterologists')">
                                <img src="../assets/images/symptoms/stomach-pain.png" />
                                <p class="subtitle is-5">Stomach Pain</p>
                            </a>
                        </div>
                        <div class="column" id="eye-health">
                            <a @click="loadProvider('Ophthalmologists')">
                                <img src="../assets/images/symptoms/eye-health.png" />
                                <p class="subtitle is-5">Eye Health</p>
                            </a>
                        </div>
                        <div class="column" id="dental-health">
                            <a @click="loadProvider('')">
                                <img src="../assets/images/symptoms/dental-health.png" />
                                <p class="subtitle is-5">Dental Health</p>
                            </a>
                        </div>
                        <div class="column" id="fever">
                            <a @click="loadProvider('')">
                                <img src="../assets/images/symptoms/fever.png" />
                                <p class="subtitle is-5">Fever</p>
                            </a>
                        </div>
                        <div class="column" id="sore-throat">
                            <a @click="loadProvider('Pediatricians')">
                                <img src="../assets/images/symptoms/sore-throat.png" />
                                <p class="subtitle is-5">Sore Throat</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-if="citiesOrMunicipalities != ''">
            <!--filter-->
            <!--implementation new-->
            <div class="columns">
                <div class="column is-narrow">
                    <div class="dropdown" :class="{ 'is-active': cityMunicipalityFilter }">
                        <div class="doprdown-trigger">
                            <button class="button is-rounded"
                                @click="cityMunicipalityFilter = !cityMunicipalityFilter"><span>{{ city == '' ?
                                        'City/Municipality' : city
                                }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span></button>
                        </div>
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item"><a @click="filterByCity('')">Any</a></div>
                                <div class="dropdown-item"
                                    v-for="(cityorMunicipality, index) in citiesOrMunicipalities.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                    :key="index"><a @click="filterByCity(cityorMunicipality.name)">{{
                                            cityorMunicipality.name
                                    }}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-narrow">
                    <div class="dropdown" :class="{ 'is-active': facilityTypeFilter }">
                        <div class="doprdown-trigger">
                            <button class="button is-rounded" @click="facilityTypeFilter = !facilityTypeFilter">
                                <span>{{ typeFilter == null ? 'Type of Facility' : typeFilter }}</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span></button>
                        </div>
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item"><a @click="filterAll">All
                                    </a></div>
                                <div class="dropdown-item"><a @click="filterPublic">Public
                                    </a></div>
                                <div class="dropdown-item"><a @click="filterPrivate">Private
                                    </a></div>
                            </div>
                        </div>
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
                <div class="column has-text-right">
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                        <div class="dropdown-trigger">
                            <div class="field has-addons">
                                <div class="control has-icons-left">
                                    <input class="input" type="text" v-model="province" style="width: 300px;"
                                        placeholder="What region are you located?" @click="regionSelect"
                                        :disabled="locationPermissionDenied" />
                                    <span class="icon is-small is-left">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </span>
                                </div>
                                <div class="control">
                                    <button class="button is-info is-rounded" @click="loadProvider('')"
                                        :disabled="province == ''">Search</button>
                                </div>
                                <div class="notification is-light is-danger" v-if="locationPermissionDenied">
                                    <a class="has-text-success" @click="getUserLocation">Enable</a> location to
                                    start
                                    booking an
                                    <b>appointment</b>.
                                </div>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content has-text-left"
                                    v-if="Object.keys(geolocationIndexed).length !== 0">
                                    <a class="dropdown-item" v-for="geodata in geolocationIndexed" :key="geodata._id"
                                        @click="selectRegion(geodata.province)">{{
                                                geodata.province
                                        }}</a>
                                </div>

                                <div class="dropdown-content has-text-left" v-else>
                                    <p class="dropdown-item has-text-danger">
                                        Region not found or supported, please try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--implementation new-->
            <div class="block" v-if="this.checkUser == false">
                <div class="notification box" id="notification"
                    style="width: 50%; margin: auto; background-color: white;">
                    You must
                    <a class="has-text-success" href="/user/login">login</a>. or
                    <a class="has-text-danger" href="/user/signup">create an account</a>. to make an appointment.
                </div>
            </div>
            <div class="columns">
                <div class="column" v-if="geoHospitalNearestUser.length !== 0"
                    style="max-height: 100vh; overflow: auto">
                    <div class="container is-fluid">
                        <div class="columns has-text-left" id="hospital" style="margin-bottom: 5%"
                            v-for="(geoHospital, index) in geoHospitalNearestUserIndexed" :key="index">
                            <div class="column is-5">
                                <a @click="checkUser ? bookAppointment(geoHospital) : $router.push('/user/login')">
                                    <figure class="image is-3by2 is-rounded">
                                        <img loading="lazy" style="border-radius: 10px"
                                            :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/managers/${geoHospital.hospital}.jpg`" />
                                    </figure>
                                </a>
                            </div>
                            <div class="column">
                                <div class="notification is-info is-light"
                                    v-if="filterSpecialist && geoHospital?.specialistArrFilter !== 0">{{
                                            geoHospital?.specialistArrFilter
                                    }} available {{ filterSpecialist }}</div>
                                <a @click="checkUser ? bookAppointment(geoHospital) : $router.push('/user/login')">
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
import store from '../store';
import NavigationTab from './NavigationTab.vue'

export default {
    name: "HospitalFinder",
    computed: {
        geolocationIndexed() {
            return this.geolocation.filter(x => { return x.province.toLowerCase().includes(this.province.toLowerCase()); });
        },
        geoHospitalNearestUserIndexed() {
            if (this.geoHospitalNearestUser && this.filterSpecialist) {
                return this.geoHospitalNearestUser.filter(x => { return x.hospital.toLowerCase().includes(this.hospital.toLowerCase()); }).filter(x => x?.specialistArrFilter > 0).filter(x => this.typeFilter == null ? x.type == 'Private' || x.type == 'Public' : x.type == this.typeFilter).filter(x => x.city.includes(this.city));
            } else if (this.geoHospitalNearestUser) {
                return this.geoHospitalNearestUser.filter(x => { return x.hospital.toLowerCase().includes(this.hospital.toLowerCase()); }).filter(x => this.typeFilter == null ? x.type == 'Private' || x.type == 'Public' : x.type == this.typeFilter).filter(x => x.city.includes(this.city))
            }
            else {
                return false;
            }
        }
    },
    async created() {
        await axios.get("/api/geolocation").then(response => this.geolocation = response.data);
        this.getUserLocation();
    },
    async mounted() {
        if (this.$store.state.patientID !== null) {
            this.checkUser = true;
        }
        else {
            this.checkUser = false;
        }
    },
    data() {
        return {
            locationPermissionDenied: false,
            city: "",
            isHospitalLoading: false,
            checkUser: "",
            hospital: "",
            geolocation: [],
            typeFilter: null,
            citiesOrMunicipalities: [],
            province: "",
            userLatitude: "",
            userLongitude: "",
            isActiveDropdown: false,
            geoHospitalNearestUser: "",
            specializations: this.$store.getters.getSpecializationList,
            filterSpecialist: "",
            distanceFilter: false,
            cityMunicipalityFilter: false,
            facilityTypeFilter: false,
            doctorSpecialistFilter: [],
            provincePrompt: false
        };
    },
    methods: {
        async bookAppointment(hospitalDetails) {
            store.commit("hospitalDetails", hospitalDetails)
            await axios.put(`/api/manager/${hospitalDetails._id}`, {
                engagements: hospitalDetails.engagements + 1
            });
            await this.$router.push(`/user/${this.$store.state.patientUsername}/${hospitalDetails._id}/doctors`);
        },
        filterByCity(city) {
            this.city = city;
        },
        filterAll() {
            this.typeFilter = null;
        },
        filterPrivate() {
            this.typeFilter = "Private";
        },
        filterPublic() {
            this.typeFilter = 'Public'
        },
        filterDistanceToggle() {
            this.isHospitalLoading = true;
            this.geoHospitalNearestUser.sort((a, b) => this.distanceFilter ? b.distance - a.distance : a.distance - b.distance);
            this.distanceFilter = !this.distanceFilter
            this.isHospitalLoading = false;
        },
        regionSelect() {
            if (!this.locationPermissionDenied) {
                this.isActiveDropdown = true;
            }
        },
        selectRegion(province) {
            this.province = province;
            this.isActiveDropdown = false;
        },
        async filterBySpecialization() {
            this.isHospitalLoading = true;
            this.doctorSpecialistFilter = []
            await axios.get("/api/doctor/filteration").then(response => {
                this.geoHospitalNearestUser.forEach((e) => this.doctorSpecialistFilter.push(response.data.filter(x => x.hospitalOrigin.find(x => x.hospital == e.hospital) && x.specialist.find(x => x == this.filterSpecialist && e.specializations.find(x => x.specialist == this.filterSpecialist)) && (x.schedule).find(x => x.hospital == e.hospital && new Date(x.id) > new Date())).length))
            });

            this.geoHospitalNearestUser.forEach((x, i) => x["specialistArrFilter"] = this.doctorSpecialistFilter[i])
            this.geoHospitalNearestUser.sort((a, b) => b.specialistArrFilter - a.specialistArrFilter)
            this.isHospitalLoading = false;
        },
        async loadProvider(filterSymptom) {
            if (this.province) {
                this.provincePrompt = false
                this.isHospitalLoading = true;
                this.citiesOrMunicipalities = this.geolocation.find(x => x.province === this.province);
                await axios.post("/api/geoFindHospitalNearestUser", {
                    province: this.province,
                    latitude: this.userLatitude,
                    longitude: this.userLongitude
                }).then(response => this.geoHospitalNearestUser = response.data);
                this.filterSpecialist = filterSymptom
                this.isHospitalLoading = false;
                document.getElementById('background').style.background = 'none'
            } else {
                this.provincePrompt = true
            }
        },
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.geoUserPosition, this.geoUserPositionError);
            }
            else {
                alert("Geolocation is not supported by this browser");
            }
        },
        geoUserPosition(position) {
            this.userLatitude = position.coords.latitude;
            this.userLongitude = position.coords.longitude;
        },
        geoUserPositionError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    this.locationPermissionDenied = true;
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Unable to obtain Geolocation information.");
                    break;
                case error.TIMEOUT:
                    alert("Request timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occured, please try again.");
                    break;
            }
        }
    },
    components: { NavigationTab }
}
</script>
<style scoped>
@media (max-width: 991.98px) {
    #geoIframe {
        width: 75vw;
        height: 200px;
    }
}

#geoIframe {
    position: relative;
    height: 100%;
    width: 100%;
}

#background {
    height: 100vh;
    background: no-repeat center url('../assets/images/background-client.png');
    background-size: cover;
}

#mental-health:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#UTI:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#stomach-pain:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#eye-health:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#dental-health:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#fever:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
}

#sore-throat:hover {
    border: 2px rgb(152, 203, 247) solid;
    border-radius: 7px;
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
</style>