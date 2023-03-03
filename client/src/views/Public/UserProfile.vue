<script setup>
import NavigationTab from '../../components/NavigationTab.vue';
import axios from 'axios'
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const appointmentListOngoing = ref([])
const appointmentListDone = ref([])
const appointmentListCancelled = ref([])
const patient = ref([]);
const geolocationData = ref([])
const citiesData = ref([])
const userProvince = ref('')
const userCity = ref('')
const dropDownProvince = ref(false)
const dropDownCity = ref(false)
const errMsg = ref('')
const successMsg = ref(false)
const appointmentModal = ref(false)
const navOngoingAppointments = ref(true)
const navPastAppointments = ref(false)
const navCancelledAppointments = ref(false)
const file = ref()
const uploadProfileButton = ref(false)
const imgPreviewFile = ref()
const searchBar = ref('')
const buttonProfileImgSubmitLoading = ref(false)

onMounted(async () => {
    await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: true }).then(response => appointmentListOngoing.value = response.data);
    await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: false }).then(response => appointmentListDone.value = response.data);
    await axios.post('/api/appointmentList/cancelledAppointments', { id: store.state.patientID }).then(response => appointmentListCancelled.value = response.data);
    await axios.get("/session/patient").then(response => patient.value = response.data);
    await axios.get("/api/geolocation").then(response => geolocationData.value = response.data)
    userProvince.value = await patient.value.province
    userCity.value = await patient.value.city

    await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === userProvince.value))
    citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
});

const ongoingAppointments = computed(() => {
    return sortOngoingAppointments()
});
const pastAppointments = computed(() => {
    return sortPastAppointments()
});

const cancelledAppointments = computed(() => {
    return sortCancelledAppointments()
});

function sortPastAppointments() {
    return appointmentListDone.value.sort((a, b) => {
        return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
    }).filter(x => x.referenceID.toLowerCase().includes(searchBar.value.toLowerCase() || x.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) || x.lastName.toLowerCase().includes(searchBar.value.toLowerCase())))

}
function sortOngoingAppointments() {
    return appointmentListOngoing.value.sort((a, b) => {
        return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
    }).filter(x => x.referenceID.toLowerCase().includes(searchBar.value.toLowerCase()) || x.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) || x.lastName.toLowerCase().includes(searchBar.value.toLowerCase()))
}

function sortCancelledAppointments() {
    return appointmentListCancelled.value.sort((a, b) => {
        new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
    }).filter(x => x.referenceID.toLowerCase().includes(searchBar.value.toLowerCase()) || x.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) || x.lastName.toLowerCase().includes(searchBar.value.toLowerCase()))
}
//methods
async function selectProvince(province) {
    dropDownProvince.value = false
    userCity.value = ''
    userProvince.value = province
    await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === province))
    citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
}
function selectCity(city) {
    dropDownCity.value = false
    userCity.value = city
}
function fileHandleInput(e) {
    file.value = e.target.files[0]
    imgPreviewFile.value = URL.createObjectURL(file.value)
    uploadProfileButton.value = true
}
async function updatePatient() {
    try {
        await axios.put('/session/patient/', {
            name: [patient.value.name[0], patient.value.name[1]],
            email: patient.value.email,
            province: userProvince.value,
            city: userCity.value,
            currentAddress: patient.value.currentAddress
        });
        await axios.put(`/api/user/${patient.value._id}`, {
            name: [patient.value.name[0], patient.value.name[1]],
            gmail: patient.value.email,
            province: userProvince.value,
            city: userCity.value,
            currentAddress: patient.value.currentAddress
        });

        successMsg.value = true
        errMsg.value = ''

        await axios.get("/session/patient").then(response => patient.value = response.data);
        await axios.get("/api/geolocation").then(response => geolocationData.value = response.data)

        userProvince.value = await patient.value.province
        userCity.value = await patient.value.city

        await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === userProvince.value))
        citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
    } catch (err) {
        errMsg.value = err
    }
}
async function cancelAppointment(id) {
    try {
        await axios.put(`/api/appointmentList/${id}`, { ifPatientCancelled: true })
        await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: true }).then(response => appointmentListOngoing.value = response.data);
        await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: false }).then(response => appointmentListDone.value = response.data);
        await axios.post('/api/appointmentList/cancelledAppointments', { id: store.state.patientID }).then(response => appointmentListCancelled.value = response.data);
    } catch (err) {
        errMsg.value = err
    }
}

async function deleteAppointment(id) {
    try {
        await axios.delete(`/api/appointmentList/${id}`)
        await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: true }).then(response => appointmentListOngoing.value = response.data);
        await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: false }).then(response => appointmentListDone.value = response.data);
        await axios.post('/api/appointmentList/cancelledAppointments', { id: store.state.patientID }).then(response => appointmentListCancelled.value = response.data);
    } catch (err) {
        errMsg.value = err
    }
}

async function uploadProfilePhotoClient() {
    buttonProfileImgSubmitLoading.value = true
    const formData = new FormData()
    formData.append('username', store.state.patientUsername)
    formData.append('imgFile', file.value)

    try {
        await axios.post("/api/imgUploadPatient", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(async response => {
            if (response) {
                store.commit("imgSuccess", true)
                await router.push('/imgUploadSuccessPatient')
            }
        });
    } catch (err) {
        errMsg.value = err
    }
    buttonProfileImgSubmitLoading.value = false
}
</script>
<template>
    <NavigationTab />
    <section class="section">
        <div id="wrapper-container" style="width: 75%; margin: auto;">
            <div class="container" v-if="patient.length !== 0">
                <div class="columns is-vcentered">
                    <div class="column is-4">
                        <div class="field" id="file-img">
                            <figure class="image is-square image-outer" v-if="store.state.checkProfileImg">
                                <img class="is-rounded image-inner" v-if="imgPreviewFile" :Src="imgPreviewFile" />
                                <img class="is-rounded image-inner" v-else
                                    :src="`https://res.cloudinary.com/leindfraust/image/v${new Date().getMonth()}${new Date().getDate()}/upload/assets/patients/${store.state.patientUsername}.jpg`">
                                <div class="buttons is-hidden-mobile" style="bottom:5%; right:10%; position: absolute">
                                    <label for="file-input" style="cursor: pointer"><a class="button is-responsive"
                                            style="border-radius: 50%; height: 50px; width: 50px"><i
                                                class="fa-solid fa-camera"></i>
                                        </a></label>
                                </div>
                                <div class="buttons is-hidden-desktop"
                                    style="bottom: 15%; left:75%; position: absolute">
                                    <label for="file-input" style="cursor: pointer"><a
                                            class="button is-large is-responsive"
                                            style="border-radius: 50%; height: 35px; width: 35px"><i
                                                class="fa-solid fa-camera"></i>
                                        </a></label>
                                </div>
                            </figure>
                            <figure class="image is-square image-outer" v-else>
                                <img class="is-rounded image-inner" v-if="imgPreviewFile" :Src="imgPreviewFile" />
                                <img class="is-rounded image-inner" v-else
                                    :src="`https://ui-avatars.com/api/?name=${store.state.patientUsername}`">
                                <div class="buttons is-hidden-mobile" style="bottom:5%; right:10%; position: absolute">
                                    <label for="file-input" style="cursor: pointer"><a
                                            class="button is-medium is-responsive"><i class="fa-solid fa-camera"></i>
                                        </a></label>
                                </div>
                                <div class="buttons is-hidden-desktop"
                                    style="bottom: 15%; left:75%; position: absolute">
                                    <label for="file-input" style="cursor: pointer"><a
                                            class="button is-medium is-responsive"><i class="fa-solid fa-camera"></i>
                                        </a></label>
                                </div>
                            </figure>
                            <div class="control is-hidden">
                                <input id="file-input" @change="fileHandleInput($event)" class="input" type="file" />
                            </div>
                        </div>
                        <div class="buttons is-centered">
                            <button class="button" v-if="uploadProfileButton"
                                @click="imgPreviewFile = null, uploadProfileButton = false">Cancel</button>
                            <button class="button is-info" :class="{ 'is-loading': buttonProfileImgSubmitLoading }"
                                v-if="uploadProfileButton" @click="uploadProfilePhotoClient">Upload Photo</button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification is-danger" v-if="errMsg">
                            Oops, something went wrong. Try again later or
                            <router-link :to="'/contactus'">contact us</router-link>
                        </div>
                        <div class="notification is-success" v-if="successMsg">Changes have been pushed.</div>
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <label class="label">Email:</label>
                                    <div class="controls" v-if="!patient.email.includes('dummyemail@email.com')">
                                        <input type="text" class="input" v-model="patient.email" />
                                    </div>
                                    <div class="controls" v-else>
                                        <input type="text" class="input" v-model="patient.email"
                                            placeholder="Register an email for this account." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <label class="label">First Name:</label>
                                    <div class="controls">
                                        <input type="text" class="input" v-model="patient.name[0]" />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Last Name:</label>
                                    <div class="controls">
                                        <input type="text" class="input" v-model="patient.name[1]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <label class="label">Province:</label>
                                        <div class="dropdown" :class="{ 'is-active': dropDownProvince }">
                                            <div class="dropdown-trigger">
                                                <button class="button" @click="dropDownProvince = !dropDownProvince">
                                                    <span v-if="userProvince == ''">Select</span>
                                                    <span v-else>{{ userProvince }}</span>
                                                </button>
                                            </div>
                                            <div class="dropdown-menu">
                                                <div class="dropdown-content" v-for="provinces in geolocationData"
                                                    :key="provinces._id">
                                                    <a class="dropdown-item"
                                                        @click="selectProvince(provinces.province)">{{
                                                            provinces.province
                                                        }}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <div class="label">City/Municipality:</div>
                                        <div class="dropdown" :class="{ 'is-active': dropDownCity }">
                                            <div class="dropdown-trigger">
                                                <button class="button" aria-haspopup="true"
                                                    @click="dropDownCity = !dropDownCity"
                                                    :disabled="userProvince == ''">
                                                    <span v-if="userCity == ''">Select</span>
                                                    <span v-else>{{ userCity }}</span>
                                                </button>
                                            </div>
                                            <div class="dropdown-menu" v-if="userProvince">
                                                <div class="dropdown-content" v-for="cities in citiesData"
                                                    :key="cities.name">
                                                    <a class="dropdown-item" @click="selectCity(cities.name)">{{
                                                        cities.name
                                                    }}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Current Address:</label>
                                    <div class="controls">
                                        <input type="text" class="input" v-model="patient.currentAddress" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <p class="control">
                                <a class="button is-info" @click="updatePatient">Save changes</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div class="dropdown" :class="{ 'is-active': appointmentModal }">
                <div class="dropdown-trigger">
                    <button class="button" @click="appointmentModal = !appointmentModal"><span>
                            {{
                                navOngoingAppointments? 'Ongoing Appointments': navPastAppointments ?
                                    'Past Appointments' : 'Cancelled Appointments'
                            }}</span><span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item"
                            @click="navOngoingAppointments = true, navPastAppointments = false, navCancelledAppointments = false, appointmentModal = !appointmentModal">
                            Ongoing Appointments
                        </a>
                        <a class="dropdown-item"
                            @click="navPastAppointments = true, navOngoingAppointments = false, navCancelledAppointments = false, appointmentModal = !appointmentModal">
                            Past Appointments
                        </a>
                        <a class="dropdown-item"
                            @click="navCancelledAppointments = true, navOngoingAppointments = false, navPastAppointments = false, appointmentModal = !appointmentModal">
                            Cancelled Appointments
                        </a>

                    </div>
                </div>
            </div>
            <div class="block"></div>
            <div class="field has-addons">
                <div class="control">
                    <button class="button is-static fa fa-search"></button>
                </div>
                <div class="control">
                    <input type="text" class="input" placeholder="Search Reference ID" v-model="searchBar" />
                </div>
            </div>
            <div class="container box" v-if="navOngoingAppointments">
                <div class="table-container" v-if="Object.keys(ongoingAppointments).length !== 0">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">Reference ID</th>
                                <th class="has-text-black-ter">Schedule</th>
                                <th class="has-text-black-ter">Priority No.</th>
                                <th class="has-text-black-ter">Hospital Appointed</th>
                                <th class="has-text-black-ter">Doctor Appointed</th>
                                <th class="has-text-black-ter">First Name</th>
                                <th class="has-text-black-ter">Last Name</th>
                                <th class="has-text-black-ter">Contact Number</th>
                                <th class="has-text-black-ter">Birthday</th>
                                <th class="has-text-black-ter">Symptoms/Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="appointments in ongoingAppointments" :key="appointments._id">
                                <button class="dropdown-item button has-text-danger" type="button"
                                    @click="cancelAppointment(appointments._id)">Cancel</button>
                                <br />
                                <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
                                <th class="has-text-black-ter">{{
                                    new Date(appointments.schedule[0].date).toDateString()
                                }}</th>
                                <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                                <th class="has-text-black-ter">{{ appointments.hospital }}</th>
                                <th class="has-text-black-ter">{{ appointments.doctorName }}</th>
                                <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                                <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                                <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                                <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                                <td class="has-text-black-ter">{{ appointments.comments }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container" v-else>
                    <div class="notification is-info">You do not have any ongoing appointments.</div>
                </div>
            </div>
            <div class="container box" v-if="navPastAppointments">
                <div class="table-container" v-if="Object.keys(pastAppointments).length !== 0">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Visited</th>
                                <th class="has-text-black-ter">Reference ID</th>
                                <th class="has-text-black-ter">Schedule</th>
                                <th class="has-text-black-ter">Priority No.</th>
                                <th class="has-text-black-ter">Hospital Appointed</th>
                                <th class="has-text-black-ter">Doctor Appointed</th>
                                <th class="has-text-black-ter">First Name</th>
                                <th class="has-text-black-ter">Last Name</th>
                                <th class="has-text-black-ter">Contact Number</th>
                                <th class="has-text-black-ter">Birthday</th>
                                <th class="has-text-black-ter">Symptoms/Comments</th>
                            </tr>
                        </thead>
                        <tbody v-for="appointments in pastAppointments" :key="appointments._id">
                            <tr>
                                <th class="has-text-black-ter">{{ appointments.ifPatientVisited ? 'Yes' : 'No' }}</th>
                                <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
                                <th class="has-text-black-ter">{{
                                    new Date(appointments.schedule[0].date).toDateString()
                                }}</th>
                                <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                                <th class="has-text-black-ter">{{ appointments.hospital }}</th>
                                <th class="has-text-black-ter">{{ appointments.doctorName }}</th>
                                <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                                <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                                <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                                <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                                <td class="has-text-black-ter">{{ appointments.comments }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container" v-else>
                    <div class="notification is-info">You do not have any past appointments.</div>
                </div>
            </div>
            <div class="container box" v-if="navCancelledAppointments">
                <div class="table-container" v-if="Object.keys(cancelledAppointments).length !== 0">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">Reference ID</th>
                                <th class="has-text-black-ter">Schedule</th>
                                <th class="has-text-black-ter">Priority No.</th>
                                <th class="has-text-black-ter">Hospital Appointed</th>
                                <th class="has-text-black-ter">Doctor Appointed</th>
                                <th class="has-text-black-ter">First Name</th>
                                <th class="has-text-black-ter">Last Name</th>
                                <th class="has-text-black-ter">Contact Number</th>
                                <th class="has-text-black-ter">Birthday</th>
                                <th class="has-text-black-ter">Symptoms/Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="appointments in cancelledAppointments" :key="appointments._id">
                                <button class="dropdown-item button has-text-danger" type="button"
                                    @click="deleteAppointment(appointments._id)">Delete</button>
                                <br />
                                <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
                                <th class="has-text-black-ter">{{
                                    new Date(appointments.schedule[0].date).toDateString()
                                }}</th>
                                <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                                <th class="has-text-black-ter">{{ appointments.hospital }}</th>
                                <th class="has-text-black-ter">{{ appointments.doctorName }}</th>
                                <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                                <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                                <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                                <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                                <td class="has-text-black-ter">{{ appointments.comments }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container" v-else>
                    <div class="notification is-info">You do not have any cancelled appointments.</div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
@media (max-width: 991.98px) {
    #wrapper-container {
        width: 100% !important
    }
}

.image-outer {
    background: center center no-repeat url('../../assets/images/background-figure-style.png');
    background-size: contain;
}

.image-inner {
    padding: 25px
}

.section {
    background: center center no-repeat url('../../assets/images/background-client-profile.png');
    background-size: cover;
}
</style>