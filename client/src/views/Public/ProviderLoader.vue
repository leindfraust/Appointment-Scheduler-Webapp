<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FooterBlock from '../../components/FooterBlock.vue'
import NavigationTab from '../../components/NavigationTab.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const city = ref("");
const isHospitalLoading = ref(false);
const hospital = ref("");
const geolocation = ref([]);
const typeFilter = ref('');
const citiesOrMunicipalities = ref([]);
const hospitalQuery = ref('');
const province = ref(route.query.province);
const userLatitude = ref(route.query.userLat);
const userLongitude = ref(route.query.userLong);
const geoHospitalNearestUser = ref([]);
const specializations = ref(store.getters.getSpecializationList);
const filterSpecialist = ref(route.query.symptom);
const filterDate = ref(new Date(route.query.date));
const filterTime = ref(route.query.time);
const distanceFilter = ref(true);
const dateTimeFilter = ref(false);
const doctorSpecialistFilter = ref([]);

const geoHospitalNearestUserIndexed = computed(() => {
    if (geoHospitalNearestUser.value) {
        return geoHospitalNearestUser.value.slice().sort((a, b) => distanceFilter.value ? a.distance - b.distance : ((b.engagements / 10 + b.ratings * 2) * 1000 - b.distance) / 1000 - ((a.engagements / 10 + a.ratings * 2) * 1000 - a.distance) / 1000).filter(x => { return x.hospital.toLowerCase().includes(hospital.value.toLowerCase()); }).filter(x => x?.arrFilter > 0).filter(x => typeFilter.value == '' ? x.type == 'Private' || x.type == 'Public' || x.type == 'Clinic' : x.type == typeFilter.value).filter(x => x.city.includes(city.value)).slice().sort((a, b) => b.arrFilter - a.arrFilter);
    } else {
        return false;
    }
});

onMounted(async () => {
    await axios.get("/api/geolocation").then(response => geolocation.value = response.data);
    await loadProvider()
})

async function unloadPropData(props) {
    hospitalQuery.value = ''
    if (geolocation.value.filter(prop => prop.province == props).length !== 0) {
        province.value = props
    } else {
        hospitalQuery.value = props
    }
    await loadProvider()
}

async function bookAppointment(hospitalDetails) {
    const filters = {
        filterSpecialist: filterSpecialist.value,
        filterDate: filterDate.value,
        filterTime: filterTime.value
    }
    store.commit("hospitalDetails", hospitalDetails)
    store.commit("patientFilters", filters)
    await axios.put(`/api/manager/${hospitalDetails._id}`, {
        engagements: hospitalDetails.engagements + 1
    });
    await router.push(`/${hospitalDetails._id}/doctors`)
}

async function loadProvider() {
    isHospitalLoading.value = true;
    if (await geolocation.value.find(x => x.province === province.value)) {
        await router.push({
            path: '/provider',
            query: {
                hospital: hospitalQuery.value,
                province: province.value,
                symptom: filterSpecialist.value,
                userLat: userLatitude.value,
                userLong: userLongitude.value,
                date: new Date(filterDate.value).toLocaleDateString(),
                time: filterTime.value
            }
        })
        citiesOrMunicipalities.value = geolocation.value.find(x => x.province === province.value);
        if (!hospitalQuery.value) {
            hospitalQuery.value = ''
        }
        await axios.post("/api/geoFindHospitalNearestUser", {
            province: province.value,
            hospitalQuery: hospitalQuery.value,
            latitude: parseFloat(userLatitude.value),
            longitude: parseFloat(userLongitude.value)
        }).then(response => geoHospitalNearestUser.value = response.data);
        document.getElementById('background').style.background = 'none'
        await filterSpecialistDateTime()
    }
    isHospitalLoading.value = false;
}

async function filterSpecialistDateTime() {
    doctorSpecialistFilter.value = []
    if (filterTime.value == undefined) {
        filterTime.value = ''
    }
    await router.push({
        path: '/provider',
        query: {
            hospital: hospitalQuery.value,
            province: province.value,
            symptom: filterSpecialist.value,
            userLat: userLatitude.value,
            userLong: userLongitude.value,
            date: new Date(filterDate.value).toLocaleDateString(),
            time: filterTime.value
        }
    })
    const hospitals = geoHospitalNearestUser.value
    for await (const hospital of hospitals) {
        isHospitalLoading.value = true;
        if (!hospitalQuery.value) {
            hospitalQuery.value = ''
        }
        await axios.post("/api/doctor/filteration", {
            hospital: hospital.hospital,
            filterSpecialist: filterSpecialist.value,
            date: filterDate.value,
            time: filterTime.value
        }).then(async response => {
            doctorSpecialistFilter.value.push({ hospital: hospital.hospital, docLength: response.data.filter((doctor) => filterSpecialist.value ? hospital.specializations.find(x => x.specialist === filterSpecialist.value) && doctor.hospitalOrigin.filter(x => x === hospital.hospital) : doctor.hospitalOrigin.filter(x => x === hospital.hospital)).length })
            isHospitalLoading.value = false;
        });
    }
    geoHospitalNearestUser.value.forEach(async (x) => x["arrFilter"] = await doctorSpecialistFilter.value.find(e => x.hospital == e.hospital)?.docLength)
}
</script>
<template>
    <div id="background">
        <NavigationTab :provider-finder-mode="true" :provider-provinces="geolocation" :query="province"
            :provider-list="geoHospitalNearestUser" @unload-prop-data="unloadPropData($event, arg)" />
        <div class="modal" :class="{ 'is-active': isHospitalLoading }">
            <div class="modal-background"></div>
            <div class="modal-content" style="overflow: hidden">
                <div class="loader" style="margin: auto;"></div>
            </div>
        </div>
        <div class="modal" :class="{ 'is-active': dateTimeFilter }">
            <div class="modal-background"></div>
            <div class="modal-content" style="overflow: auto">
                <div class="box">
                    <section class="section has-text-centered">
                        <label class="label">Choose Preferred Date</label>
                        <v-date-picker v-model="filterDate" :min-date="new Date()" is-expanded />
                        <div class="block"></div>
                        <label class="label">Choose Preferred Time(Optional) </label>
                        <div class="buttons is-centered">
                            <button class="button" :class="{ 'is-active': filterTime == 'AM' }"
                                @click="filterTime == 'AM' ? filterTime = '' : filterTime = 'AM'">AM</button>
                            <button class="button" :class="{ 'is-active': filterTime == 'PM' }"
                                @click="filterTime == 'PM' ? filterTime = '' : filterTime = 'PM'">PM</button>
                        </div>

                        <div class="block"></div>
                        <div class="buttons is-centered">
                            <button class="button"
                                @click="dateTimeFilter = false, filterTime = '', filterDate = undefined, filterSpecialistDateTime()">Cancel</button>
                            <button class="button is-info" :disabled="filterDate == undefined"
                                @click="filterSpecialistDateTime(), dateTimeFilter = false">Confirm</button>
                        </div>

                    </section>
                </div>
            </div>
        </div>
        <div class="block"></div>
        <div class="is-hidden-desktop" v-if="citiesOrMunicipalities != ''">
            <div class="columns is-mobile" style="overflow: auto;">
                <div class="column is-narrow">
                    <div class="select is-rounded">
                        <select v-model="distanceFilter">
                            <option :value="false">Sort by Recommended</option>
                            <option :value="true">Sort by Nearest</option>
                        </select>
                    </div>
                </div>
                <div class="column is-narrow">
                    <div class="select is-rounded">
                        <select v-model="city">
                            <option value="" disabled>City/Municipality</option>
                            <option value="">Any</option>
                            <option
                                v-for="(cityorMunicipality, index) in citiesOrMunicipalities.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                :key="index">{{
                                    cityorMunicipality.name.replace('City', '').replace('Municipality', '')
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
                    <div class="select is-rounded">
                        <select v-model="filterSpecialist" @change="filterSpecialistDateTime">
                            <option :value="undefined || ''" disabled>Specialist</option>
                            <option :value="undefined || ''">Any</option>
                            <option v-for="specialist in specializations" :key="specialist" :value="specialist">{{
                                specialist
                            }}</option>
                        </select>
                    </div>
                </div>
                <div class="column is-narrow">
                    <button class="button is-info" @click="dateTimeFilter = true">Date and Time</button>
                </div>
            </div>
        </div>
        <div class="container is-fluid" v-if="citiesOrMunicipalities != ''">
            <div class="block"></div>
            <div class="columns">
                <div class="column is-2 has-text-centered-mobile is-hidden-mobile"
                    style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); clip-path: inset(0px -15px 0px 0px);">
                    <br />
                    <div class="container">
                        <div class="block">
                            <div class="select">
                                <select v-model="distanceFilter">
                                    <option :value="true">Sort by Nearest</option>
                                    <option :value="false">Sort by Recommended</option>
                                </select>
                            </div>
                        </div>
                        <div class="block">
                            <div class="select">
                                <select v-model="city">
                                    <option value="" disabled>City/Municipalit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </option>
                                    <option value="">Any</option>
                                    <option
                                        v-for="(cityorMunicipality, index) in citiesOrMunicipalities.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                        :key="index">{{
                                            cityorMunicipality.name.replace('City', '').replace('Municipality', '')
                                        }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="block">
                            <div class="select">
                                <select v-model="typeFilter">
                                    <option :value="''" disabled>Type of
                                        Facility&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                    <option :value="''">Any</option>
                                    <option value="Public">Public Hospital</option>
                                    <option value="Private">Private Hospital</option>
                                    <option value="Clinic">Clinic</option>
                                </select>
                            </div>
                        </div>
                        <div class="block">
                            <div class="select">
                                <select v-model="filterSpecialist" @change="filterSpecialistDateTime">
                                    <option :value="undefined || ''" disabled>Specialist</option>
                                    <option :value="undefined || ''">Any</option>
                                    <option v-for="specialist in specializations" :key="specialist" :value="specialist">
                                        {{
                                            specialist
                                        }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="block">
                            <button class="button is-info" @click="dateTimeFilter = true">Date and Time</button>
                        </div>
                    </div>
                </div>
                <div class="column is-1 is-hidden-mobile"></div>
                <div class="column is-6" v-if="geoHospitalNearestUser.length !== 0">
                    <br />
                    <div class="container is-fluid">
                        <div class="columns is-centered has-text-left" id="hospital" style="margin-bottom: 7.5%;"
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
                                    v-if="(filterDate instanceof Date && !isNaN(filterDate) || filterSpecialist)">
                                    Available
                                    for appointments</div>
                                <a @click="bookAppointment(geoHospital)">
                                    <h1 class="title is-4">{{ geoHospital.hospital }}</h1>
                                    <p class="subtitle is-6">{{ geoHospital.barangayORStreet }}, {{
                                        geoHospital.city
                                    }},
                                        {{
                                            geoHospital.province
                                        }}</p>
                                </a>
                                <br>
                                <div class="content">
                                    <b>Type of Facility:</b> {{ geoHospital.type }}
                                    <span v-if="typeof geoHospital.details[0].contacts !== 'undefined'">
                                        <p class="subtitle is-6"><b>Contacts:</b> <span
                                                v-for="(contacts, index) in geoHospital.details[0].contacts" :key="index">
                                                {{ contacts.contact + ' ' }}</span></p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column notification is-danger is-light has-text-centered"
                        v-if="geoHospitalNearestUserIndexed.length == 0">
                        Sorry, no doctors available.
                    </div>
                </div>
                <div class="column notification is-danger is-light has-text-centered" v-else-if="!isHospitalLoading">
                    No registered hospitals/clinics are found, please try again or search another province.
                </div>
            </div>
        </div>
    </div>
    <FooterBlock />
</template>
<style scoped>
select {
    border: 0px;
    outline: 0px;
}

.select {
    max-width: 12rem;
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
</style>