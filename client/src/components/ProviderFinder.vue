<template>
    <div id="background">
        <NavigationTab />
        <div class="modal" :class="{ 'is-active': locationPermissionPrompt }">
            <div class="modal-background"></div>
            <div class="modal-content box">
                <section class="section">
                    <div class="container">
                        <figure class="image">
                            <img src="../assets/images/logos/medi-search-horizontal.png" />
                        </figure>
                        <p class="subtitle">To improve our services, allow <b>Medic Search</b> to utilize your GPS
                            location to
                            find the
                            best hospitals or clinics near your area.</p>
                        <div class="has-text-centered">
                            <button class="button is-info"
                                @click="locationPermissionPrompt = false, getUserLocation()">OK</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <section class="section is-medium has-text-centered" v-if="citiesOrMunicipalities == ''">
            <CatchError :err-msg="errMsg" />
            <h1 class="title is-2 is-size-3-mobile">Find and make an appointment on <span
                    class="has-text-info">hospitals and clinics</span>
                near you.
            </h1>
            <br class="is-hidden-mobile" />
            <div class="container" v-if="citiesOrMunicipalities == ''">
                <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                    <div class="dropdown-trigger">
                        <div class="field has-addons is-medium is-hidden-mobile">
                            <div class="control has-icons-left">
                                <input class="input is is-rounded" type="text" v-model="province" style="width: 300px;"
                                    placeholder="What province are you located?" @input="isActiveDropdown = true" />
                                <span class="icon is-left is-large has-text-info">
                                    <i class="fa-solid fa-location-dot"></i>
                                </span>
                            </div>
                            <div class="control is-hidden-mobile">
                                <button class="button  is-info is-rounded" @click="searchProvider('')"
                                    :disabled="province == ''">Search</button>
                            </div>
                        </div>
                        <div class="field has-addons is-medium is-hidden-desktop is-hidden-tablet">
                            <div class="control has-icons-left">
                                <input class="input is-rounded" type="text" v-model="province" style="width: 300px;"
                                    placeholder="What province are you located?" @input="isActiveDropdown = true" />
                                <span class="icon is-left has-text-info">
                                    <i class="fa-solid fa-location-dot"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content has-text-left" v-if="Object.keys(geolocationIndexed).length !== 0">
                            <a class="dropdown-item" v-for="geodata in geolocationIndexed" :key="geodata._id"
                                @click="selectRegion(geodata.province, geodata.location)">{{ geodata.province }}</a>
                        </div>

                        <div class="dropdown-content has-text-left" v-else>
                            <p class="dropdown-item has-text-danger">
                                Province not found or supported, please try again.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="block"></div>
                <button class="button is-info is-rounded is-hidden-desktop is-hidden-tablet" @click="searchProvider('')"
                    :disabled="province == ''">Search</button>
                <div>
                    <div class="block"></div>
                    <div class="notification is-info" style="width: 50%; margin: auto" id="notification-region"
                        v-if="provincePrompt && this.province == ''">You must
                        select a province first.</div>
                    <div class="block is-hidden-mobile">&nbsp;</div>
                    <div class="columns is-centered is-hidden-mobile is-multiline">
                        <div class="column is-2 symptom" @click="searchProvider('Psychiatrists')">
                            <div class="columns symptom-button is-vcentered">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/mental-health.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">Mental Health</p>
                                </div>
                            </div>
                        </div>
                        <div class="column is-2 symptom" @click="searchProvider('Gastroenterologists')">
                            <div class="columns symptom-button is-vcentered">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/stomach-pain.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">Stomach Pain</p>
                                </div>
                            </div>
                        </div>
                        <div class="column is-2 symptom">
                            <div class="columns symptom-button is-vcentered" @click="searchProvider('')">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/dental-health.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">Dental Health</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block is-hidden-mobile">&nbsp;</div>
                    <div class="columns is-centered is-hidden-mobile is-multiline">
                        <div class="column is-2 symptom" @click="searchProvider('Nephrologists')">
                            <div class="columns symptom-button is-vcentered">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/UTI.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">UTI</p>
                                </div>
                            </div>
                        </div>
                        <div class="column is-2 symptom" @click="searchProvider('Ophthalmologists')">
                            <div class="columns symptom-button is-vcentered">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/eye-health.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">Eye Health</p>
                                </div>
                            </div>
                        </div>
                        <div class="column is-2 symptom" @click="searchProvider('')">
                            <div class="columns symptom-button is-vcentered">
                                <div class="column is-4">
                                    <figure class="image"><img src="../assets/images/symptoms/fever.png" />
                                    </figure>
                                </div>
                                <div class="column is-narrow">
                                    <p class="subtitle is-6 has-text-weight-bold">Fever</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Mobile symptom view-->
                    <div class="columns is-hidden-desktop is-hidden-tablet is-centered is-mobile is-multiline"
                        style="padding: 50px; margin-bottom: auto;">
                        <div class="column is-5 symptom symptom-button" @click="searchProvider('Psychiatrists')">
                            <figure class="image"><img src="../assets/images/symptoms/mental-health.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">Mental Health</p>

                        </div>
                        <div class="column is-5 symptom symptom-button" @click="searchProvider('Gastroenterologists')">
                            <figure class="image"><img src="../assets/images/symptoms/stomach-pain.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">Stomach Pain</p>
                        </div>
                        <div class="column is-5 symptom symptom-button">
                            <figure class="image"><img src="../assets/images/symptoms/dental-health.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">Dental Health</p>
                        </div>
                        <div class="column is-5 symptom symptom-button" @click="searchProvider('Nephrologists')">
                            <figure class="image"><img src="../assets/images/symptoms/UTI.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">UTI</p>
                        </div>
                        <div class="column is-5 symptom symptom-button" @click="searchProvider('Ophthalmologists')">
                            <figure class="image"><img src="../assets/images/symptoms/eye-health.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">Eye Health</p>
                        </div>
                        <div class="column is-5 symptom symptom-button" @click="searchProvider('')">
                            <figure class="image"><img src="../assets/images/symptoms/fever.png" />
                            </figure>
                            <p class="subtitle is-6 has-text-weight-bold">Fever</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router';
import CatchError from './CatchError.vue';
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
        let popup = localStorage.getItem("expire_popup")
        if (!popup || new Date(parseInt(popup)).getTime() <= new Date().getTime()) {
            this.locationPermissionPrompt = true
            let date = new Date()
            localStorage.setItem("expire_popup", date.setDate(date.getDate() + 30))
        } else {
            this.locationPermissionPrompt = false
            this.getUserLocation()
        }
    },
    mounted() {
        if (this.$store.state.patientID !== null) {
            this.checkUser = true;
        }
        else {
            this.checkUser = false;
        }
    },
    data() {
        return {
            locationPermissionPrompt: false,
            locationPermissionDenied: false,
            city: "",
            checkUser: "",
            geolocation: [],
            citiesOrMunicipalities: [],
            province: "",
            userLatitude: "",
            userLongitude: "",
            isActiveDropdown: false,
            provincePrompt: false,
            errMsg: ''
        };
    },
    methods: {
        selectRegion(province, location) {
            this.province = province;
            if (this.locationPermissionDenied) {
                this.userLatitude = location.coordinates[1]
                this.userLongitude = location.coordinates[0]
            }
            this.isActiveDropdown = false;
        },
        searchProvider(filterSymptom) {
            if (this.province) {
                this.provincePrompt = false
                router.push({ path: '/provider', query: { name: this.province, symptom: filterSymptom, userLat: this.userLatitude, userLong: this.userLongitude } })
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
        async geoUserPosition(position) {
            this.userLatitude = position.coords.latitude;
            this.userLongitude = position.coords.longitude;
            if (!this.locationPermissionDenied) {
                await axios.post('/api/geolocation/geofind-near-user', {
                    latitude: this.userLatitude,
                    longitude: this.userLongitude
                }).then(response => this.province = response.data[0].province).catch(err => this.errMsg = err)
            }
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
    components: { NavigationTab, CatchError }
}
</script>
<style scoped>
.symptom-button {
    background: linear-gradient(95.61deg, #AEC9FF 41.1%, rgba(208, 223, 253, 0.38) 104.19%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
}

.symptom {
    margin-right: 5%;
    cursor: pointer;
}

@media (max-width: 991.98px) {
    .symptom {
        margin: 4% !important;
    }
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
</style>