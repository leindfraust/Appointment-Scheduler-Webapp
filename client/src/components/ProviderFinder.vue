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
                    <h1 class="title is-2 is-size-3-mobile has-text-weight-bold">Find and make appointments with <span
                            class="has-text-info">clinics and hospitals</span>
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
                                        <div class="dropdown" :class="{ 'is-active': recSpecialistDropdown }"
                                            style="width: 300px">
                                            <div class="dropdown-trigger">
                                                <div class="field">
                                                    <div class="control"
                                                        :class="{ 'has-icons-right': getRecLoadingSpecialist }">
                                                        <input class="input is-medium" type="text"
                                                            v-model="filterSpecialist" placeholder="Specialist or symptom"
                                                            @input="getRecSpecialistTimeout" style="width: 300px" />
                                                        <p class="help is-info">You may leave this blank if you want to get
                                                            all specialists.
                                                        </p>
                                                        <span class="icon is-small is-right">
                                                            <i class="fas fa-spinner fa-spin"
                                                                v-if="getRecLoadingSpecialist"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="dropdown-menu">
                                                    <div class="dropdown-content has-text-left"
                                                        style="max-height: 15rem; overflow: auto;"
                                                        v-if="Object.keys(specializationsSorted).length !== 0">
                                                        <a class="dropdown-item"
                                                            v-for="specialization in specializationsSorted"
                                                            :key="specialization"
                                                            @click="recSpecialistDropdown = false, filterSpecialist = specialization">{{
                                                                specialization
                                                            }}</a>
                                                    </div>
                                                    <div class="dropdown-content has-text-left"
                                                        style="max-height: 15rem; overflow: auto;" v-else>
                                                        <a class="dropdown-item has-text-info">
                                                            <p>Recommending you a specialist...</p>
                                                            <p class="help has-text-weight-bold has-text-black">powered
                                                                by
                                                                ChatGPT</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control is-hidden-mobile">
                                        <button class="button is-medium is-info is-rounded" @click="searchProvider('')"
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
                        <br />
                        <br />
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
                        <div class="dropdown is-hidden-desktop is-hidden-tablet"
                            :class="{ 'is-active': recSpecialistDropdown }" style="width: 300px">
                            <div class="dropdown-trigger">
                                <div class="field">
                                    <div class="control" :class="{ 'has-icons-right': getRecLoadingSpecialist }">
                                        <input class="input is-medium" type="text" v-model="filterSpecialist"
                                            placeholder="Specialist or symptom" @input="getRecSpecialistTimeout"
                                            style="width: 300px" />
                                        <span class="icon is-small is-right">
                                            <i class="fas fa-spinner fa-spin" v-if="getRecLoadingSpecialist"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="dropdown-menu">
                                    <div class="dropdown-content has-text-left" style="max-height: 15rem; overflow: auto;"
                                        v-if="Object.keys(specializationsSorted).length !== 0">
                                        <a class="dropdown-item" v-for="specialization in specializationsSorted"
                                            :key="specialization"
                                            @click="recSpecialistDropdown = false, filterSpecialist = specialization">{{
                                                specialization
                                            }}</a>
                                    </div>
                                    <div class="dropdown-content has-text-left" style="max-height: 15rem; overflow: auto;"
                                        v-else>
                                        <a class="dropdown-item has-text-info">
                                            <p>Recommending you a specialist...</p>
                                            <p class="help has-text-weight-bold has-text-black">powered
                                                by
                                                ChatGPT</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
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
<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import CatchError from './CatchError.vue';
import NavigationTab from './NavigationTab.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const locationPermissionPrompt = ref(false)
const locationPermissionDenied = ref(false)
const geolocation = ref([])
const checkUser = ref("")
const province = ref("")
const citiesOrMunicipalities = ref([])
const userLongitude = ref("")
const userLatitude = ref("")
const errMsg = ref('')
const isActiveDropdown = ref(false)
const filterSpecialist = ref('')
const specializations = ref(store.getters.getSpecializationList)
const filterTime = ref('')
const filterDate = ref(undefined)
const getRecSpecialistDelay = ref(null)
const getRecLoadingSpecialist = ref(false)
const recSpecialistDropdown = ref(false)

const geolocationIndexed = computed(() => geolocation.value.filter(x => { return x.province.toLowerCase().includes(province.value.toLowerCase()); }))
const specializationsSorted = computed(() => specializations.value.filter(x => x.toLowerCase().includes(filterSpecialist.value.toLowerCase())))

onBeforeMount(async () => {
    await axios.get("/api/geolocation").then(response => geolocation.value = response.data);
    let popup = localStorage.getItem("expire_popup")
    if (!popup || new Date(parseInt(popup)).getTime() <= new Date().getTime()) {
        locationPermissionPrompt.value = true
        let date = new Date()
        localStorage.setItem("expire_popup", date.setDate(date.getDate() + 30))
    } else {
        locationPermissionPrompt.value = false
        getUserLocation()
    }
})

onMounted(async () => {
    if (store.state.patientID !== null) {
        checkUser.value = true;
    }
    else {
        checkUser.value = false;
    }
})

async function getRecSpecialist() {
    getRecLoadingSpecialist.value = true
    await axios.post('/api/query-recommended-specialist', {
        symptom: filterSpecialist.value
    }).then(response => {
        filterSpecialist.value = response.data
    }).catch(err => errMsg.value = err)
    getRecLoadingSpecialist.value = false
}
async function getRecSpecialistTimeout() {
    recSpecialistDropdown.value = true
    if (Object.keys(specializationsSorted.value).length == 0 || specializationsSorted.value.length == 0) {
        if (getRecSpecialistDelay.value) {
            clearTimeout(getRecSpecialistDelay.value)
            getRecSpecialistDelay.value = null
        }
        getRecSpecialistDelay.value = setTimeout(getRecSpecialist, 5000)
    } else {
        if (getRecSpecialistDelay.value) {
            clearTimeout(getRecSpecialistDelay.value)
            getRecSpecialistDelay.value = null
        }
    }
}
function selectRegion(provinceParam, location) {
    province.value = provinceParam;
    if (locationPermissionDenied.value || !userLatitude.value && !userLongitude.value) {
        userLatitude.value = location.coordinates[1]
        userLongitude.value = location.coordinates[0]
    }
    isActiveDropdown.value = false;
}
async function searchProvider() {
    if (province.value) {
        await router.push({ path: '/provider', query: { hospital: '', province: province.value, symptom: filterSpecialist.value, userLat: userLatitude.value, userLong: userLongitude.value, date: new Date(filterDate.value).toLocaleDateString(), time: filterTime.value } })
    }
}
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoUserPosition, geoUserPositionError.value);
    }
    else {
        alert("Geolocation is not supported by this browser");
    }
}
async function geoUserPosition(position) {
    userLatitude.value = position.coords.latitude;
    userLongitude.value = position.coords.longitude;
    if (!locationPermissionDenied.value) {
        await axios.post('/api/geolocation/geofind-near-user', {
            latitude: userLatitude.value,
            longitude: userLongitude.value
        }).then(response => province.value = response.data[0].province).catch(err => errMsg.value = err)
    }
}
function geoUserPositionError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationPermissionDenied.value = true;
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
</style>