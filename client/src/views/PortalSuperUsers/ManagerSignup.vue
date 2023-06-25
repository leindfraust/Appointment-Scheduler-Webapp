<script setup>
import axios from 'axios'
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

const geolocationData = ref([])
const isActiveDropdownProvince = ref(false)
const isActiveDropdownCity = ref(false)
const registrationCode = ref('')
const pricing = ref('')
const hospital = ref('')
const email = ref('')
const hospitalType = ref('')
const latitude = ref('')
const longitude = ref('')
const barangayORStreet = ref('')
const postalCode = ref('')
const city = ref('')
const province = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loadingUsername = ref(false)
const loadingProvider = ref(false)
const usernameFound = ref('')
const providerFound = ref('')
const passwordNotMatch = ref(false)
const citiesData = ref([])
const specializationsSelected = ref([])
const specializationList = ref(store.getters.getSpecializationList)
const searchBar = ref('')
const errMsg = ref('')
const searchTimeout = ref(null)

onBeforeMount(async () => {
    await axios.get('/api/geolocation').then(response => geolocationData.value = response.data)
})
const specializationListIndexed = computed(() => specializationList.value.filter(x => x.toLowerCase().includes(searchBar.value.toLowerCase())))

function generateCode() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    registrationCode.value = result.toUpperCase()
}
async function usernameFindTimeout() {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
        searchTimeout.value = null
    }
    searchTimeout.value = setTimeout(usernameFinder, 500)
}
async function usernameFinder() {
    loadingUsername.value = true
    usernameFound.value = false
    await axios.post('/api/user/check_username', {
        username: username.value
    }).then(response => {
        if (response.data) {
            usernameFound.value = response.data
        }
    })
    await axios.post('/api/doctor/check_username', {
        username: username.value
    }).then(response => {
        if (response.data) {
            usernameFound.value = response.data
        }
    })
    await axios.post('/api/manager/check_username', {
        username: username.value
    }).then(response => {
        if (response.data) {
            usernameFound.value = response.data
        }
    })
    if (username.value == '') {
        usernameFound.value = ''
    }
    loadingUsername.value = false
}
async function providerFindTimeout() {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
        searchTimeout.value = null
    }
    searchTimeout.value = setTimeout(providerFinder, 500)
}
async function providerFinder() {
    loadingProvider.value = true
    await axios.post('/api/manager/check_provider', {
        provider: hospital.value
    }).then(response => { providerFound.value = response.data })
    if (hospital.value == '') {
        providerFound.value = ''
    }
    loadingProvider.value = false
}
async function selectProvince(provinceParam) {
    city.value = ''
    province.value = provinceParam
    isActiveDropdownProvince.value = false
    await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === province.value))
    citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
}
function selectCity(cityParam) {
    city.value = cityParam
    isActiveDropdownCity.value = false
}
function selectStandardPlan() {
    pricing.value = 'Standard'
}
function selectPremiumPlan() {
    pricing.value = 'Premium'
}
function provinceDropdown() {
    isActiveDropdownProvince.value = !isActiveDropdownProvince.value
}
function cityDropdown() {
    isActiveDropdownCity.value = !isActiveDropdownCity.value
}
function selectSpecialization(specialization) {
    if (!specializationsSelected.value.find(x => x.specialist === specialization)) {
        specializationsSelected.value.push({
            specialist: specialization
        });
    }
}
function undoSpecialization(specialization) {
    specializationsSelected.value = specializationsSelected.value.filter(x => x.specialist !== specialization)
}
async function create() {
    generateCode()
    passwordNotMatch.value = false

    if (password.value !== confirmPassword.value) {
        passwordNotMatch.value = true
    } else {
        passwordNotMatch.value = false
    }

    if (password.value === confirmPassword.value && !usernameFound.value && !providerFound.value) {
        try {
            await axios.post('/api/manager', {
                registrationCode: registrationCode.value,
                pricing: pricing.value,
                status: 'Inactive',
                hospital: hospital.value,
                type: hospitalType.value,
                email: email.value,
                province: province.value,
                city: city.value,
                barangayORStreet: barangayORStreet.value,
                postalCode: postalCode.value,
                location: {
                    type: 'Point',
                    coordinates: [longitude.value, latitude.value]
                },
                specializations: specializationsSelected.value,
                username: username.value,
                password: password.value
            });
            store.commit('accountCreated', true)
            await router.push('/account/login')
        } catch (err) {
            errMsg.value = err
        }
    }
}

</script>
<template>
    <section class="section" style="background-color: whitesmoke;">
        <div class="container box" style="width: 50%; margin: auto;">
            <div class="notification is-danger" v-if="errMsg">
                Oops, something went wrong. Try again later or
                <router-link :to="'/contactus'">contact us</router-link>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Provider Name</label>
                    <div v-if="providerFound !== ''">
                        <p class="help is-danger" v-if="providerFound">
                            Unavailable
                            <i class="fas fa-spinner fa-spin" v-if="loadingProvider"></i>
                        </p>
                        <p class="help is-success" v-else>
                            Available
                            <i class="fas fa-spinner fa-spin" v-if="loadingProvider"></i>
                        </p>
                    </div>
                    <input class="input" type="text" placeholder="Hospital/Clinic name" v-model="hospital"
                        @input="providerFindTimeout" />
                </div>
            </div>
            <div clas="field">
                <div class="field">
                    <label class="label">E-mail</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="Official hospital email" v-model="email" />
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Province</label>
                        <div class="dropdown" :class="{ 'is-active': isActiveDropdownProvince }">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" @click="provinceDropdown">
                                    <span v-if="province == ''">Select</span>
                                    <span v-else>{{ province }}</span>
                                </button>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content" v-for="provinces in geolocationData" :key="provinces._id">
                                    <a class="dropdown-item" @click="selectProvince(provinces.province)">{{
                                        provinces.province
                                    }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">City/Municipality</label>
                        <div class="dropdown" :class="{ 'is-active': isActiveDropdownCity }">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" @click="cityDropdown"
                                    :disabled="province == ''">
                                    <span v-if="city == ''">Select</span>
                                    <span v-else>{{ city }}</span>
                                </button>
                            </div>
                            <div class="dropdown-menu" v-if="province">
                                <div class="dropdown-content" v-for="cities in citiesData" :key="cities.name">
                                    <a class="dropdown-item" @click="selectCity(cities.name)">{{ cities.name }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="label">Postal Code:</label>
                </div>
                <input type="number" class="input" v-model="postalCode" placeholder="Postal Code" />
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Type:</label>
                    <label class="radio">
                        <input type="radio" name="type" @click="hospitalType = 'Public'" />Public
                    </label>
                    <label class="radio">
                        <input type="radio" name="type" @click="hospitalType = 'Private'" />Private
                    </label>
                    <label class="radio">
                        <input type="radio" name="type" @click="hospitalType = 'Clinic'" />Clinic
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Barangay or Street</label>
                    <input class="input" type="text" placeholder="Barangay or Street of the hospital"
                        v-model="barangayORStreet" />
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Latitude</label>
                            <input class="input" type="number" placeholder="Latitude of the hospital location"
                                v-model="latitude" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Longitude</label>
                            <input class="input" type="number" placeholder="Longitude of the hospital location"
                                v-model="longitude" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Username:</label>
                            <div v-if="usernameFound !== ''">
                                <p class="help is-danger" v-if="usernameFound">
                                    Unavailable
                                    <i class="fas fa-spinner fa-spin" v-if="loadingUsername"></i>
                                </p>
                                <p class="help is-success" v-else>
                                    Available
                                    <i class="fas fa-spinner fa-spin" v-if="loadingUsername"></i>
                                </p>
                            </div>
                            <input class="input" type="text" placeholder="Username" v-model="username"
                                @input="usernameFindTimeout" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Password</label>
                            <input class="input" type="password" placeholder="Password" v-model="password" />
                        </div>
                        <div class="control">
                            <label class="label">Confirm Password</label>
                            <input class="input" type="password" placeholder="Confirm Password" v-model="confirmPassword" />
                        </div>
                        <div class="notification is-light is-danger" v-if="passwordNotMatch">Password does not match.
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Specializations offered(Select all that applies)</label>
                    <nav class="panel">
                        <div class="panel-block">
                            <input class="input" type="text" v-model="searchBar" placeholder="Search" />
                        </div>
                        <div style="max-height: 20em; overflow: auto">
                            <div class="panel-block" v-for="(specializations, index) in specializationListIndexed"
                                :key="index" :value="specializations">
                                <a @click="selectSpecialization(specializations)">{{ specializations }}</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="column">
                    <label class="label">Selected</label>
                    <div class="columns is-multiline">
                        <div class="column" id="selectedSpecializations">
                            <button v-for="(specialist, index) in specializationsSelected" :key="index"
                                class="button is-light" style="margin: 5px">
                                {{ specialist.specialist }}&nbsp;
                                <span class="has-text-danger" @click="undoSpecialization(specialist.specialist)">X</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="label has-text-centered">Choose a plan</h1>
            <div class="columns has-text-centered">
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">STANDARD PLAN</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label class="radio">
                                        <input class="radio" name="plan" type="radio" @click="selectStandardPlan" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">PREMIUM PLAN</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="radio">
                                        <input class="radio" name="plan" type="radio" @click="selectPremiumPlan" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="button is-primary" @click="create"
                :disabled="pricing == '' || hospital == '' || email == '' || hospitalType == '' || latitude == '' || longitude == '' || barangayORStreet == '' || city == '' || province == '' || specializationsSelected == []">Create
                Account</button>
        </div>
    </section>
</template>
<style scoped>
.dropdown-menu {
    max-height: 20em;
    overflow: auto;
}

#selectedSpecializations {
    max-height: 26em;
    overflow: auto;
}

@media (max-width: 991.98px) {
    .container {
        width: 100% !important;
    }
}
</style>