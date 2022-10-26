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
            <h1 class="title">Find and make an appointment on best hospitals or clinics near your area.
            </h1>
            <div class="container" v-if="citiesOrMunicipalities == ''">
                <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                    <div class="dropdown-trigger">
                        <div class="field has-addons">
                            <div class="control has-icons-left">
                                <input class="input" type="text" v-model="province" style="width: 300px;"
                                    placeholder="What province are you located?" @input="isActiveDropdown = true" />
                                <span class="icon is-small is-left">
                                    <i class="fa-solid fa-location-dot"></i>
                                </span>
                            </div>
                            <div class="control is-hidden-mobile">
                                <button class="button is-info is-rounded" @click="searchProvider('')"
                                    :disabled="province == ''">Search</button>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content has-text-left" v-if="Object.keys(geolocationIndexed).length !== 0">
                            <a class="dropdown-item" v-for="geodata in geolocationIndexed" :key="geodata._id"
                                @click="selectRegion(geodata.province, geodata.geolocation)">{{ geodata.province }}</a>
                        </div>

                        <div class="dropdown-content has-text-left" v-else>
                            <p class="dropdown-item has-text-danger">
                                Province not found or supported, please try again.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="block"></div>
                <button class="button is-info is-rounded is-hidden-desktop" @click="searchProvider('')"
                    :disabled="province == ''">Search</button>
                <div>
                    <div class="block"></div>
                    <div class="separator subtitle">Or pick a symptom.</div>
                    <div class="notification is-info" style="width: 50%; margin: auto" id="notification-region"
                        v-if="provincePrompt && this.province == ''">You must
                        select a province first.</div>
                    <div class="columns is-mobile is-multiline" style="width: 80%; margin:auto">
                        <div class="column is-6-mobile " id="mental-health">
                            <a @click="searchProvider('Psychiatrists')">
                                <img src="../assets/images/symptoms/mental-health.png" />
                                <p class="subtitle is-5">Mental Health</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="UTI">
                            <a @click="searchProvider('Nephrologists')">
                                <img src="../assets/images/symptoms/UTI.png" />
                                <p class="subtitle is-5">UTI</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="stomach-pain">
                            <a @click="searchProvider('Gastroenterologists')">
                                <img src="../assets/images/symptoms/stomach-pain.png" />
                                <p class="subtitle is-5">Stomach Pain</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="eye-health">
                            <a @click="searchProvider('Ophthalmologists')">
                                <img src="../assets/images/symptoms/eye-health.png" />
                                <p class="subtitle is-5">Eye Health</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="dental-health">
                            <a @click="searchProvider('')">
                                <img src="../assets/images/symptoms/dental-health.png" />
                                <p class="subtitle is-5">Dental Health</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="fever">
                            <a @click="searchProvider('')">
                                <img src="../assets/images/symptoms/fever.png" />
                                <p class="subtitle is-5">Fever</p>
                            </a>
                        </div>
                        <div class="column is-6-mobile" id="sore-throat">
                            <a @click="searchProvider('Pediatricians')">
                                <img src="../assets/images/symptoms/sore-throat.png" />
                                <p class="subtitle is-5">Sore Throat</p>
                            </a>
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
            provincePrompt: false
        };
    },
    methods: {
        selectRegion(province, location) {
            this.province = province;
            if (this.locationPermissionDenied) {
                this.userLatitude = location.latitude
                this.userLongitude = location.longitude
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