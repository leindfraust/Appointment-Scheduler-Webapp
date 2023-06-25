<script setup>
import axios from 'axios'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import groupBy from 'lodash/groupBy'

const store = useStore()
const router = useRouter()

const searchBar = ref('')
const superUser = ref('')
const managerAccounts = ref([])
const doctorAccounts = ref([])
const patientAccounts = ref([])
const ticketList = ref([])
const isActiveMenu = ref(true)
const isActiveDashboard = ref(true)
const isActiveManager = ref(false)
const isActiveDoctor = ref(false)
const isActivePatient = ref(false)
const isActiveGeolocation = ref(false)
const isActiveTickets = ref(false)
const isActiveModal = ref(false)
const isActiveDropdownEditStatus = ref(false)
const isActiveDropdownEditPricing = ref(false)
const isActiveDropdownItemOne = ref(false)
const isActiveDropdownItemTwo = ref(false)
const isActiveDropdownPricingItemOne = ref(false)
const isActiveDropdownPricingItemTwo = ref(false)
const isActiveDropdownProvince = ref(false)
const id = ref('')
const email = ref('')
const status = ref('')
const type = ref('')
const pricing = ref('')
const province = ref('')
const provinceLatitude = ref('')
const provinceLongitude = ref('')
const cityOrMunicipality = ref('')
const latitude = ref('')
const longitude = ref('')
const postalCode = ref('')
const provinceList = ref([])
const selectedProvince = ref('')
const selectedProvinceID = ref('')
const provincePostSuccess = ref(false)
const cityOrMunicipalityPostSuccess = ref(false)


onBeforeMount(async () => {
    await axios.get("/session/superuser").then(response => superUser.value = response.data.superuser)
    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
})

const managerAccountsIndexed = computed(() => managerAccounts.value.filter(x => { return x.hospital.toLowerCase().includes(searchBar.value.toLowerCase()) }))
const doctorAccountsIndexed = computed(() => doctorAccounts.value.filter(x => { return x.name.toLowerCase().includes(searchBar.value.toLowerCase()) || x.specialist.find(x => x.toLowerCase().includes(searchBar.value.toLowerCase())) }))
const patientAccountsIndexed = computed(() => patientAccounts.value.filter(x => { return x.name[0].toLowerCase().includes(searchBar.value.toLowerCase()) || x.name[1].toLowerCase().includes(searchBar.value.toLowerCase()) }))
const ticketsIndexed = computed(() => ticketList.value.filter(x => { return x.id.toLowerCase().includes(searchBar.value.toLowerCase()) || x.type.toLowerCase().includes(searchBar.value.toLowerCase()) || x.email.toLowerCase().includes(searchBar.value.toLowerCase()) }))
const provinceAndCitiesIndexed = computed(() => {
    return groupBy(
        provinceList.value.filter(x => {
            return (x.citiesOrMunicipalities.find(x => { return x.name.toLowerCase().includes(searchBar.value.toLowerCase()) }));

        }),
        "province"
    )
})

function dashboard() {
    isActiveMenu.value = true
    isActiveDashboard.value = true
    isActiveManager.value = false
    isActiveDoctor.value = false
    isActivePatient.value = false
    isActiveGeolocation.value = false
    isActiveTickets.value = false
}
async function manager() {
    isActiveMenu.value = true
    isActiveDashboard.value = false
    isActiveManager.value = true
    isActiveDoctor.value = false
    isActivePatient.value = false
    isActiveGeolocation.value = false
    isActiveTickets.value = false

    await axios.get("/api/manager").then(response => managerAccounts.value = response.data)
}
async function doctor() {
    isActiveMenu.value = true
    isActiveDashboard.value = false
    isActiveManager.value = false
    isActiveDoctor.value = true
    isActivePatient.value = false
    isActiveGeolocation.value = false
    isActiveTickets.value = false

    await axios.get("/api/doctor").then(response => doctorAccounts.value = response.data)
}
async function patient() {
    isActiveMenu.value = true
    isActiveDashboard.value = false
    isActiveManager.value = false
    isActiveDoctor.value = false
    isActivePatient.value = true
    isActiveGeolocation.value = false
    isActiveTickets.value = false

    await axios.get("/api/user").then(response => patientAccounts.value = response.data)
}
async function tickets() {
    isActiveMenu.value = true
    isActiveDashboard.value = false
    isActiveManager.value = false
    isActiveDoctor.value = false
    isActivePatient.value = false
    isActiveGeolocation.value = false
    isActiveTickets.value = true

    await axios.get("/api/superuser").then(response => ticketList.value = response.data[0].tickets)
}
async function geolocation() {
    isActiveMenu.value = true
    isActiveDashboard.value = false
    isActiveManager.value = false
    isActiveDoctor.value = false
    isActivePatient.value = false
    isActiveGeolocation.value = true
    isActiveTickets.value = false

    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
}
async function managerEdit(idParam, emailParam) {
    isActiveModal.value = !isActiveModal.value
    id.value = idParam
    email.value = emailParam
    type.value = 'manager'
}
async function doctorRecoverEmail(idParam, emailParam) {
    isActiveModal.value = !isActiveModal.value
    id.value = idParam
    email.value = emailParam
    type.value = 'doctor'
}
async function patientRecoverEmail(idParam, emailParam) {
    isActiveModal.value = !isActiveModal.value
    id.value = idParam
    email.value = emailParam
    type.value = 'patient'
}
async function updateData() {
    if (type.value == 'manager') {
        await axios.put(`/api/manager/${id.value}`, {
            status: status.value,
            pricing: pricing.value,
            email: email.value
        });
        await axios.get('/api/manager').then(response => managerAccounts.value = response.data)
        isActiveModal.value = !isActiveModal.value
    } else if (type.value == 'doctor') {
        await axios.put(`/api/doctor/${id.value}`, {
            gmail: email.value
        });
        await axios.get('/api/doctor').then(response => doctorAccounts.value = response.data)
        isActiveModal.value = !isActiveModal.value
    } else if (type.value == 'patient') {
        await axios.put(`/api/user/${id.value}`, {
            gmail: email.value
        });
        await axios.get('/api/user').then(response => patientAccounts.value = response.data)
        isActiveModal.value = !isActiveModal.value
    }
}
async function managerDelete(id) {
    await axios.delete(`/api/manager/${id}`)
    await axios.get('/api/manager').then(response => managerAccounts.value = response.data)
}
async function doctorDelete(id) {
    await axios.delete(`/api/doctor/${id}`)
    await axios.get('/api/doctor').then(response => doctorAccounts.value = response.data)
}
async function patientDelete(id) {
    await axios.delete(`/api/user/${id}`)
    await axios.get('/api/user').then(response => patientAccounts.value = response.data)

}
async function cityDelete(id, city, latitude, longitude, postalCode) {
    await axios.post("/api/provinceCityPull", {
        provinceID: id,
        cityOrMunicipality: city,
        latitude: latitude,
        longitude: longitude,
        postalCode: postalCode
    });
    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
}
async function deleteProvince(id) {
    await axios.delete(`/api/geolocation/${id}`)
    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
}
function closeModal() {
    isActiveModal.value = false
}
function dropdown() {
    isActiveDropdownEditStatus.value = !isActiveDropdownEditStatus.value
}
function dropdownPricing() {
    isActiveDropdownEditPricing.value = !isActiveDropdownEditPricing.value
}
function statusActive() {
    status.value = 'Active'
    isActiveDropdownItemOne.value = true
    isActiveDropdownItemTwo.value = false
}
function statusInactive() {
    status.value = 'Inactive'
    isActiveDropdownItemOne.value = false
    isActiveDropdownItemTwo.value = true
}
function pricingStandard() {
    pricing.value = 'Standard'
    isActiveDropdownPricingItemOne.value = true
    isActiveDropdownPricingItemTwo.value = false
}
function pricingPremium() {
    pricing.value = 'Premium'
    isActiveDropdownPricingItemOne.value = false
    isActiveDropdownPricingItemTwo.value = true
}
async function provincePost() {
    await axios.post('/api/geolocation', {
        province: province.value,
        location: {
            type: 'Point',
            coordinates: [provinceLongitude.value, provinceLatitude.value]
        },
    });
    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
    provincePostSuccess.value = true
}
async function cityOrMunicipalityPost() {
    await axios.post('/api/provinceUpdate', {
        provinceID: selectedProvinceID.value,
        cityOrMunicipality: cityOrMunicipality.value,
        latitude: latitude.value,
        longitude: longitude.value,
        postalCode: postalCode.value
    });
    cityOrMunicipalityPostSuccess.value = true
    selectedProvince.value = ''
    selectedProvinceID.value = ''
    cityOrMunicipality.value = ''
    latitude.value = ''
    longitude.value = ''

    await axios.get("/api/geolocation").then(response => provinceList.value = response.data)
}
function provinceDropdownActive() {
    isActiveDropdownProvince.value = !isActiveDropdownProvince.value
}
function chooseProvince(idParam, provinceName) {
    selectedProvinceID.value = idParam
    selectedProvince.value = provinceName
    isActiveDropdownProvince.value = false
}
async function closeTicket(id) {
    await axios.post('/api/superuser/updateTicket', {
        ticketID: id,
        ticketActive: false
    });
    await axios.get("/api/superuser").then(response => ticketList.value = response.data[0].tickets)
}
async function reopenTicket(id) {
    await axios.post('/api/superuser/updateTicket', {
        ticketID: id,
        ticketActive: true
    });
    await axios.get("/api/superuser").then(response => ticketList.value = response.data[0].tickets)
}
async function deleteTicket(id, type, email, title, message, active) {
    await axios.post('/api/superuser/deleteTicket', {
        ticketID: id,
        email: email,
        ticketType: type,
        ticketTitle: title,
        ticketMessage: message,
        ticketActive: active
    });
    await axios.get("/api/superuser").then(response => ticketList.value = response.data[0].tickets)
}
async function logout() {
    await axios.delete("/session/superuser");
    store.commit("superUserAuth", false)
    await router.push("/superuser/login")
}


</script>
<template>
    <div class="columns">
        <div class="column is-2">
            <nav class="navbar is-hidden-desktop">
                <div class="navbar-brand">
                    <p class="navbar-item">Hello: {{ superUser }}</p>
                    <a role="button" class="navbar-burger" :class="{ 'is-active': !isActiveMenu }"
                        @click="isActiveMenu = !isActiveMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
            </nav>
            <aside class="menu box" style="background-color: white; padding: 20px; height: 100vh; "
                :class="{ 'is-hidden-mobile': isActiveMenu, 'fixedMenu': isActiveMenu }">
                <p class="subtitle is-6 is-hidden-mobile">Hello {{ superUser }}</p>
                <p class="menu-label">General</p>
                <ul class="menu-list">
                    <li>
                        <a @click="dashboard">Dashboard</a>
                    </li>
                </ul>
                <p class="menu-label">Accounts</p>
                <ul class="menu-list">
                    <li>
                        <a :class="{ 'is-active': isActiveManager }" @click="manager">Manager accounts</a>
                    </li>
                    <li>
                        <a :class="{ 'is-active': isActiveDoctor }" @click="doctor">Doctor accounts</a>
                    </li>
                    <li>
                        <a :class="{ 'is-active': isActivePatient }" @click="patient">Patient accounts</a>
                    </li>
                </ul>
                <p class="menu-label">Operations</p>
                <ul class="menu-list">
                    <li>
                        <a :class="{ 'is-active': isActiveGeolocation }" @click="geolocation">Geolocation</a>
                    </li>
                    <li>
                        <a :class="{ 'is-active': isActiveTickets }" @click="tickets">Tickets</a>
                    </li>
                </ul>
                <hr />
                <button class="button is-danger" @click="logout">Logout</button>
            </aside>
        </div>
        <div class="column" style="overflow: auto">
            <section class="section">
                <div class="columns is-multiline" v-if="isActiveDashboard">
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=624199be-220b-4ba6-8f32-84eb27e8aa13&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=62c6c3c7-7e6a-4eef-8d99-26c53d88bbf2&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=6241b58b-377f-452d-8971-c364718db3ff&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=6241b7a6-a205-4291-8c3b-da5132939df6&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=6241b45e-220b-4919-8476-84eb27f87521&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=6241a5a0-797a-4051-869a-5157a21251ca&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                    <div class="column">
                        <iframe
                            style="background: #21313C;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
                            width="530" height="480"
                            src="https://charts.mongodb.com/charts-project-0-pxqjj/embed/charts?id=6241b38b-0445-478b-8bf9-19a45abf8264&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
                    </div>
                </div>
                <div class="controls"
                    v-if="isActiveManager || isActiveDoctor || isActivePatient || isActiveGeolocation || isActiveTickets">
                    <label class="label">Search:</label>
                    <input class="input" type="text" placeholder="Search..." v-model="searchBar" />
                </div>
                <br />
                <div class="table-container">
                    <div class="modal" :class="{ 'is-active': isActiveModal }">
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <div v-if="type == 'manager'" class="dropdown"
                                            :class="{ 'is-active': isActiveDropdownEditStatus }">
                                            <div class="dropdown-trigger">
                                                <button class="button is-danger" @click="dropdown">Edit Status</button>
                                            </div>
                                            <div class="dropdown-menu block">
                                                <div class="dropdown-content">
                                                    <a class="dropdown-item"
                                                        :class="{ 'is-active': isActiveDropdownItemOne }"
                                                        @click="statusActive">Active</a>
                                                    <a class="dropdown-item"
                                                        :class="{ 'is-active': isActiveDropdownItemTwo }"
                                                        @click="statusInactive">Inactive</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="block"></div>
                                        <div v-if="type == 'manager'" class="dropdown"
                                            :class="{ 'is-active': isActiveDropdownEditPricing }">
                                            <div class="dropdown-trigger">
                                                <button class="button is-link" @click="dropdownPricing">Edit
                                                    Pricing</button>
                                            </div>
                                            <div class="dropdown-menu block">
                                                <div class="dropdown-content">
                                                    <a class="dropdown-item"
                                                        :class="{ 'is-active': isActiveDropdownPricingItemOne }"
                                                        @click="pricingStandard">Standard</a>
                                                    <a class="dropdown-item"
                                                        :class="{ 'is-active': isActiveDropdownPricingItemTwo }"
                                                        @click="pricingPremium">Premium</a>
                                                </div>
                                            </div>
                                        </div>
                                        <form class="field has-text-centered">
                                            <label class="label">New Email</label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="email"
                                                    placeholder="Gmail, Yahoo mail..." required />
                                            </div>
                                            <button class="button is-primary" type="button"
                                                @click="updateData">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
                        </div>
                    </div>
                    <table v-if="isActiveManager" class="table is-striped is-fullwidth is-narrow is-bordered">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">Status</th>
                                <th class="has-text-black-ter">No.</th>
                                <th class="has-text-black-ter">Pricing</th>
                                <th class="has-text-black-ter">Hospital</th>
                                <th class="has-text-black-ter">Email</th>
                                <th class="has-text-black-ter">Province</th>
                                <th class="has-text-black-ter">City</th>
                                <th class="has-text-black-ter">Barangay or Street</th>
                                <th class="has-text-black-ter">Latitude</th>
                                <th class="has-text-black-ter">longitude</th>
                                <th class="has-text-black-ter">Specializations</th>
                            </tr>
                        </thead>
                        <tbody v-for="(manager, index) in managerAccountsIndexed" :key="manager._id">
                            <tr>
                                <button class="dropdown-item button has-text-info" type="button"
                                    @click="managerEdit(manager._id, manager.email)">Edit</button>
                                <button class="button dropdown-item has-text-danger" type="button"
                                    @click="managerDelete(manager._id)">Delete</button>
                                <td class="has-text-success" v-if="manager.status == 'Active'">{{ manager.status }}</td>
                                <td class="has-text-danger" v-if="manager.status == 'Inactive'">{{ manager.status }}
                                </td>
                                <td class="has-text-black-ter">{{ index + 1 }}</td>
                                <td class="has-text-black-ter">{{ manager.pricing }}</td>
                                <td class="has-text-black-ter">{{ manager.hospital }}</td>
                                <td class="has-text-black-ter">{{ manager.email }}</td>
                                <td class="has-text-black-ter">{{ manager.province }}</td>
                                <td class="has-text-black-ter">{{ manager.city }}</td>
                                <td class="has-text-black-ter">{{ manager.barangayORStreet }}</td>
                                <td class="has-text-black-ter">{{ manager.location.coordinates[1] }}</td>
                                <td class="has-text-black-ter">{{ manager.location.coordinates[0] }}</td>
                                <td class="has-text-black-ter" v-for="specialist in manager.specializations"
                                    :key="specialist.specialist">{{ specialist.specialist }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table v-if="isActiveDoctor" class="table is-striped is-fullwidth is-narrow is-bordered">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">No.</th>
                                <th class="has-text-black-ter">Alias</th>
                                <th class="has-text-black-ter">Full Name</th>
                                <th class="has-text-black-ter">Specialist</th>
                                <th class="has-text-black-ter">Gmail</th>
                                <th class="has-text-black-ter">Schedules</th>
                            </tr>
                        </thead>
                        <tbody v-for="(doctor, index) in doctorAccountsIndexed" :key="doctor._id">
                            <tr>
                                <button class="dropdown-item button has-text-info" type="button"
                                    @click="doctorRecoverEmail(doctor._id, doctor.gmail)">Recover</button>
                                <button class="button dropdown-item has-text-danger" type="button"
                                    @click="doctorDelete(doctor._id)">Delete</button>
                                <td class="has-text-black-ter">{{ index + 1 }}</td>
                                <td class="has-text-black-ter">{{ doctor.alias }}</td>
                                <td class="has-text-black-ter">{{ doctor.name }}</td>
                                <td class="has-text-black-ter">{{ doctor.specialist.toString() }}</td>
                                <td class="has-text-black-ter">{{ doctor.gmail }}</td>
                                <td class="has-text-black-ter" v-for="doctorSchedule in doctor.schedule"
                                    :key="doctorSchedule.id">{{ new Date(doctorSchedule.date).toLocaleDateString() }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-if="isActivePatient" class="table is-striped is-fullwidth is-narrow is-bordered">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">No.</th>
                                <th class="has-text-black-ter">First Name</th>
                                <th class="has-text-black-ter">Last Name</th>
                                <th class="has-text-black-ter">Age</th>
                                <th class="has-text-black-ter">Sex</th>
                                <th class="has-text-black-ter">Contact No.</th>
                                <th class="has-text-black-ter">Gmail</th>
                                <th class="has-text-black-ter">Province</th>
                                <th class="has-text-black-ter">City</th>
                            </tr>
                        </thead>
                        <tbody v-for="(patient, index) in patientAccountsIndexed" :key="patient._id">
                            <tr>
                                <button class="dropdown-item button has-text-info" type="button"
                                    @click="patientRecoverEmail(patient._id, patient.gmail)">Recover</button>
                                <button class="button dropdown-item has-text-danger" type="button"
                                    @click="patientDelete(patient._id)">Delete</button>
                                <td class="has-text-black-ter">{{ index + 1 }}</td>
                                <td class="has-text-black-ter">{{ patient.name[0] }}</td>
                                <td class="has-text-black-ter">{{ patient.name[1] }}</td>
                                <td class="has-text-black-ter">{{ patient.age }}</td>
                                <td class="has-text-black-ter">{{ patient.sex }}</td>
                                <td class="has-text-black-ter">{{ patient.contactNum }}</td>
                                <td class="has-text-black-ter">{{ patient.gmail }}</td>
                                <td class="has-text-black-ter">{{ patient.province }}</td>
                                <td class="has-text-black-ter">{{ patient.city }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-if="isActiveTickets" class="table is-striped is-fullwidth is-narrow is-bordered">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">Status</th>
                                <th class="has-text-black-ter">No.</th>
                                <th class="has-text-black-ter">Date Issued</th>
                                <th class="has-text-black-ter">ID</th>
                                <th class="has-text-black-ter">Type</th>
                                <th class="has-text-black-ter">Email</th>
                                <th class="has-text-black-ter">Subject</th>
                                <th class="has-text-black-ter">Problem</th>
                            </tr>
                        </thead>
                        <tbody v-for="(ticket, index) in ticketsIndexed" :key="ticket.id">
                            <tr>
                                <button v-if="ticket.active" class="dropdown-item button has-text-info" type="button"
                                    @click="closeTicket(ticket.id)">Close Ticket</button>
                                <button v-if="!ticket.active" class="dropdown-item button has-text-info" type="button"
                                    @click="reopenTicket(ticket.id)">Reopen Ticket</button>
                                <button class="dropdown-item button has-text-danger" type="button"
                                    @click="deleteTicket(ticket.id, ticket.type, ticket.email, ticket.title, ticket.message, ticket.active)">Delete
                                    ticket</button>
                                <td class="has-text-success" v-if="ticket.active">Active</td>
                                <td class="has-text-danger" v-if="!ticket.active">Inactive</td>
                                <td class="has-text-black-ter">{{ index + 1 }}</td>
                                <td class="has-text-black-ter">{{ new Date(ticket.date).toLocaleDateString() }}</td>
                                <td class="has-text-black-ter">{{ ticket.id }}</td>
                                <td class="has-text-black-ter">{{ ticket.type }}</td>
                                <td class="has-text-black-ter">{{ ticket.email }}</td>
                                <td class="has-text-black-ter">{{ ticket.title }}</td>
                                <td class="has-text-black-ter">{{ ticket.message }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="isActiveGeolocation">
                        <div class="box" v-for="(geolocation, index) in provinceAndCitiesIndexed" :key="index">
                            <a class="has-text-danger" @click="deleteProvince(geolocation[0]._id)">Delete Province</a>
                            <p class="subtitle has-text-black">Province: {{ index }}</p>
                            <p class="subtitle is-6 has-text-black">Latitude: {{
                                geolocation[0].location.coordinates[1]
                            }}
                            </p>
                            <p class="subtitle is-6 has-text-black">Longitude: {{ geolocation[0].location.coordinates[0]
                            }}
                            </p>

                            <table class="table is-striped is-fullwidth is-narrow is-bordered">
                                <thead>
                                    <tr>
                                        <th class="has-text-black-ter">Controls</th>
                                        <th class="has-text-black-ter">No.</th>
                                        <th class="has-text-black-ter">City/Municipality</th>
                                        <th class="has-text-black-ter">Postal Code</th>
                                        <th class="has-text-black-ter">Latitude</th>
                                        <th class="has-text-black-ter">Longitude</th>
                                    </tr>
                                </thead>
                                <tbody
                                    v-for="(cityOrMunicipality, index) in geolocation[0].citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                    :key="index">
                                    <tr>
                                        <button class="button dropdown-item has-text-danger" type="button"
                                            @click="cityDelete(geolocation[0]._id, cityOrMunicipality.name, cityOrMunicipality.location.coordinates[1], cityOrMunicipality.location.coordinates[0], cityOrMunicipality.postalCode)">Delete</button>
                                        <td class="has-text-black-ter">{{ index + 1 }}</td>
                                        <td class="has-text-black-ter">{{ cityOrMunicipality.name }}</td>
                                        <td class="has-text-black-ter">{{ cityOrMunicipality.postalCode }}</td>
                                        <td class="has-text-black-ter">{{ cityOrMunicipality.location.coordinates[1] }}
                                        </td>
                                        <td class="has-text-black-ter">{{ cityOrMunicipality.location.coordinates[0] }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <section v-if="isActiveGeolocation" class="section" style="width: 50%;">
                    <h1 class="title">Create a new Province</h1>
                    <div class="field">
                        <label class="label">Province</label>
                        <div class="control">
                            <input class="input" type="text" v-model="province" placeholder="Name of the province" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Province Latitude</label>
                        <div class="control">
                            <input class="input" type="text" v-model="provinceLatitude"
                                placeholder="Input the correct latitude" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Province Longitude</label>
                        <div class="control">
                            <input class="input" type="text" v-model="provinceLongitude"
                                placeholder="Input the correct longitude" />
                        </div>
                    </div>
                    <button class="button" type="button" @click="provincePost"
                        :disabled="province == '' || provinceLatitude == '' || provinceLongitude == ''">Confirm</button>
                    <div v-if="provincePostSuccess" class="has-text-success">Province has been created.</div>
                    <div class="field">
                        <h1 class="title">Push City/Municipality into a Province</h1>
                        <div class="control">
                            <div class="dropdown" :class="{ 'is-active': isActiveDropdownProvince }">
                                <div class="dropdown-trigger">
                                    <button class="button" @click="provinceDropdownActive()">
                                        <span v-if="selectedProvince == ''">Select a Province</span>
                                        <span v-else>{{ selectedProvince }}</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content" v-for="province in provinceList" :key="province._id">
                                        <a @click="chooseProvince(province._id, province.province)" class="dropdown-item">{{
                                            province.province }}</a>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <label class="label">City/Municipality</label>
                            <input class="input" type="text" v-model="cityOrMunicipality"
                                placeholder="City or Municipality" />
                            <span>e.g Bais City or Bindoy Municipality</span>
                            <label class="label">Postal Code</label>
                            <input class="input" type="number" v-model="postalCode" placeholder="Postal Code" />
                            <label class="label">Latitude N</label>
                            <input class="input" type="number" v-model="latitude" placeholder="Latitude" />
                            <label class="label">longitude E</label>
                            <input class="input" type="number" v-model="longitude" placeholder="longitude" />
                            <button class="button" type="button" @click="cityOrMunicipalityPost"
                                :disabled="selectedProvince == '' || cityOrMunicipality == '' || latitude == '' || longitude == ''">Confirm</button>
                            <div v-if="cityOrMunicipalityPostSuccess" class="has-text-success">City or Municipality
                                added</div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>
<style scoped></style>