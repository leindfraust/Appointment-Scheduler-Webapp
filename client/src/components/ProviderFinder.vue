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
        <section class="hero is-large has-text-centered" v-if="citiesOrMunicipalities == ''">
            <div class="hero-body">
                <div class="container">
                    <CatchError :err-msg="errMsg" />
                    <h1 class="title is-2 is-size-3-mobile has-text-weight-bold">Find and make an appointment on <span
                            class="has-text-info">hospitals and clinics</span>
                        near you.
                    </h1>
                    <br class="is-hidden-mobile" />
                    <div class="container" v-if="citiesOrMunicipalities == ''">
                        <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                            <div class="dropdown-trigger">
                                <div class="field has-addons is-medium is-hidden-mobile">
                                    <div class="control has-icons-left">
                                        <input class="input is-medium is-rounded" type="text" v-model="province"
                                            style="width: 300px;" placeholder="What province are you located?"
                                            @input="isActiveDropdown = true" />
                                        <span class="icon is-left is-medium has-text-info">
                                            <i class="is-size-4 fa-solid fa-location-dot"></i>
                                        </span>
                                    </div>
                                    <div class="control is-hidden-mobile">
                                        <v-date-picker v-model="filterDate" :min-date="new Date()">
                                            <template v-slot="{ inputValue, inputEvents }">
                                                <input class="input is-medium is-rounded"
                                                    :value="!inputValue ? 'Any date' : inputValue" v-on="inputEvents"
                                                    style="width: 150px;" />
                                            </template>
                                        </v-date-picker>
                                    </div>
                                    <div class="control is-hidden-mobile">
                                        <div class="select is-medium">
                                            <select v-model="filterTime">
                                                <option value="">Any time</option>
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control is-hidden-mobile">
                                        <div class="select is-medium">
                                            <select v-model="filterSpecialist">
                                                <option value="">Any specialist</option>
                                                <option v-for="specialization in specializations" :key="specialization"
                                                    :value="specialization">{{ specialization }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control is-hidden-mobile">
                                        <button class="button is-medium is-info is-rounded" @click="searchProvider('')"
                                            :disabled="province == ''">Search</button>
                                    </div>
                                </div>
                                <div class="field has-addons is-medium is-hidden-desktop is-hidden-tablet">
                                    <div class="control has-icons-left">
                                        <input class="input is-rounded" type="text" v-model="province"
                                            style="width: 300px;" placeholder="What province are you located?"
                                            @input="isActiveDropdown = true" />
                                        <span class="icon is-left has-text-info">
                                            <i class="fa-solid fa-location-dot"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content has-text-left"
                                    v-if="Object.keys(geolocationIndexed).length !== 0">
                                    <a class="dropdown-item" v-for="geodata in geolocationIndexed" :key="geodata._id"
                                        @click="selectRegion(geodata.province, geodata.location)">{{
                                            geodata.province
                                        }}</a>
                                </div>

                                <div class="dropdown-content has-text-left" v-else>
                                    <p class="dropdown-item has-text-danger">
                                        Province not found or supported, please try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        <div class="columns is-mobile is-gapless is-centered is-hidden-desktop is-hidden-tablet">
                            <div class="column is-narrow">
                                <v-date-picker v-model="filterDate" :min-date="new Date()">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <input class="input" :value="!inputValue ? 'Any date' : inputValue"
                                            v-on="inputEvents" style="width: 150px;" />
                                    </template>
                                </v-date-picker>
                            </div>
                            <div class="column is-narrow">
                                <div class="select">
                                    <select v-model="filterTime">
                                        <option value="">Any time</option>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="select is-hidden-desktop is-hidden-tablet">
                            <select v-model="filterSpecialist">
                                <option value="">Any specialist</option>
                                <option v-for="specialization in specializations" :key="specialization"
                                    :value="specialization">{{ specialization }}</option>
                            </select>
                        </div>
                        <div class="block"></div>
                        <button class="button is-info is-rounded is-hidden-desktop is-hidden-tablet"
                            @click="searchProvider('')" :disabled="province == ''">Search</button>
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
            errMsg: '',
            specializations: this.$store.getters.getSpecializationList,
            filterSpecialist: '',
            filterDate: undefined,
            filterTime: ''
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
        async searchProvider() {
            if (this.province) {
                await router.push({ path: '/provider', query: { hospital: '', province: this.province, symptom: this.filterSpecialist, userLat: this.userLatitude, userLong: this.userLongitude, date: new Date(this.filterDate).toLocaleDateString(), time: this.filterTime } })
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