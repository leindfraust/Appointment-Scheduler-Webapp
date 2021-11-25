<template>
    <section class="section is-medium">
        <h3 class="subtitle has-text-centered">Welcome Superuser/Developer, {{ superUser }}</h3>
        <p class="subtitle has-text-centered">
            <a @click="logout" class="has-text-danger">Logout</a>
        </p>
        <div class="container" style="width: 33%;">
            <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                    <li :class="{ 'is-active': isActiveManager }">
                        <a @click="manager">Manager accounts</a>
                    </li>
                    <li :class="{ 'is-active': isActiveDoctor }">
                        <a @click="doctor">Doctor accounts</a>
                    </li>
                    <li :class="{ 'is-active': isActivePatient }">
                        <a @click="patient">Patient accounts</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="controls">
            <label class="label">Search: </label>
            <input class="input" type="text" placeholder="Search..." v-model="searchBar">
        </div>
        <br />
        <div class="table-container">
            <div class="modal" :class="{ 'is-active': isActiveModal }">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="card">
                        <div class="card-content">
                            <div class="content">
                                <div
                                    v-if="type == 'manager'"
                                    class="dropdown"
                                    :class="{ 'is-active': isActiveDropdown }"
                                >
                                    <div class="dropdown-trigger">
                                        <button
                                            class="button has-text-danger"
                                            aria-haspopup="true"
                                            aria-controls="dropdown-menu"
                                            @click="dropdown"
                                        >
                                            <span>Edit Status</span>
                                            <span class="icon is-small">
                                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="dropdown-menu block" id="dropdown-menu" role="menu">
                                        <div class="dropdown-content">
                                            <a
                                                class="dropdown-item"
                                                :class="{ 'is-active': isActiveDropdownItemOne }"
                                                @click="statusActive"
                                            >Active</a>
                                            <a
                                                class="dropdown-item"
                                                :class="{ 'is-active': isActiveDropdownItemTwo }"
                                                @click="statusInactive"
                                            >Inactive</a>
                                        </div>
                                    </div>
                                </div>
                                <form class="field has-text-centered">
                                    <label class="label">New Email</label>
                                    <div class="control">
                                        <input
                                            class="input"
                                            type="text"
                                            v-model="email"
                                            placeholder="Gmail, Yahoo mail..."
                                            required
                                        />
                                    </div>
                                    <button
                                        class="button is-primary"
                                        type="button"
                                        @click="updateData"
                                    >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
                </div>
            </div>
            <table
                v-if="isActiveManager"
                class="table is-striped is-fullwidth is-narrow is-bordered"
            >
                <thead>
                    <tr>
                        <th class="has-text-black-ter">Controls</th>
                        <th class="has-text-black-ter">Status</th>
                        <th class="has-text-black-ter">No.</th>
                        <th class="has-text-black-ter">Hospital</th>
                        <th class="has-text-black-ter">Email</th>
                        <th class="has-text-black-ter">Province</th>
                        <th class="has-text-black-ter">City</th>
                        <th class="has-text-black-ter">Barangay or Street</th>
                        <th class="has-text-black-ter">Latitude</th>
                        <th class="has-text-black-ter">Longtitude</th>
                        <th class="has-text-black-ter">Specializations</th>
                    </tr>
                </thead>
                <tbody v-for="(manager, index) in managerAccountsIndexed" :key="manager._id">
                    <tr>
                        <button
                            class="dropdown-item button has-text-info"
                            type="button"
                            @click="managerEdit(manager._id, manager.email)"
                        >Edit</button>
                        <button
                            class="button dropdown-item has-text-danger"
                            type="button"
                            @click="managerDelete(manager._id)"
                        >Delete</button>
                        <td
                            class="has-text-success"
                            v-if="manager.status == 'Active'"
                        >{{ manager.status }}</td>
                        <td
                            class="has-text-danger"
                            v-if="manager.status == 'Inactive'"
                        >{{ manager.status }}</td>
                        <td class="has-text-black-ter">{{ index + 1 }}</td>
                        <td class="has-text-black-ter">{{ manager.hospital }}</td>
                        <td class="has-text-black-ter">{{ manager.email }}</td>
                        <td class="has-text-black-ter">{{ manager.province }}</td>
                        <td class="has-text-black-ter">{{ manager.city }}</td>
                        <td class="has-text-black-ter">{{ manager.barangayORStreet }}</td>
                        <td class="has-text-black-ter">{{ manager.latitude }}</td>
                        <td class="has-text-black-ter">{{ manager.longtitude }}</td>
                        <td
                            class="has-text-black-ter"
                            v-for="specialist in manager.specializations"
                        >{{ specialist.specialist }}</td>
                    </tr>
                </tbody>
            </table>

            <table
                v-if="isActiveDoctor"
                class="table is-striped is-fullwidth is-narrow is-bordered"
            >
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
                        <button
                            class="dropdown-item button has-text-info"
                            type="button"
                            @click="doctorRecoverEmail(doctor._id, doctor.gmail)"
                        >Recover</button>
                        <button
                            class="button dropdown-item has-text-danger"
                            type="button"
                            @click="doctorDelete(doctor._id)"
                        >Delete</button>
                        <td class="has-text-black-ter">{{ index + 1 }}</td>
                        <td class="has-text-black-ter">{{ doctor.alias }}</td>
                        <td class="has-text-black-ter">{{ doctor.name }}</td>
                        <td class="has-text-black-ter">{{ doctor.specialist }}</td>
                        <td class="has-text-black-ter">{{ doctor.gmail }}</td>
                        <td
                            class="has-text-black-ter"
                            v-for="doctorSchedule in doctor.schedule"
                        >{{ doctorSchedule.date }}</td>
                    </tr>
                </tbody>
            </table>

            <table
                v-if="isActivePatient"
                class="table is-striped is-fullwidth is-narrow is-bordered"
            >
                <thead>
                    <tr>
                        <th class="has-text-black-ter">Controls</th>
                        <th class="has-text-black-ter">No.</th>
                        <th class="has-text-black-ter">Full Name</th>
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
                        <button
                            class="dropdown-item button has-text-info"
                            type="button"
                            @click="patientRecoverEmail(patient._id, patient.gmail)"
                        >Recover</button>
                        <button
                            class="button dropdown-item has-text-danger"
                            type="button"
                            @click="patientDelete(patient._id)"
                        >Delete</button>
                        <td class="has-text-black-ter">{{ index + 1 }}</td>
                        <td class="has-text-black-ter">{{ patient.name }}</td>
                        <td class="has-text-black-ter">{{ patient.age }}</td>
                        <td class="has-text-black-ter">{{ patient.sex }}</td>
                        <td class="has-text-black-ter">{{ patient.contactNum }}</td>
                        <td class="has-text-black-ter">{{ patient.gmail }}</td>
                        <td class="has-text-black-ter">{{ patient.province }}</td>
                        <td class="has-text-black-ter">{{ patient.city }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <section class="section" style="width: 50%; margin: auto">
            <div class="field">
                <h1 class="title">Create a new Province</h1>
                <div class="control">
                    <label class="label">Province</label>
                    <input class="input" type="text" v-model="province" placeholder="Province" />
                    <button
                        class="button"
                        type="button"
                        @click="provincePost"
                        :disabled="province == ''"
                    >Confirm</button>
                    <div
                        v-if="provincePostSuccess"
                        class="has-text-success"
                    >Province has been created.</div>
                </div>
            </div>
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
                            <div
                                class="dropdown-content"
                                v-for="province in provinceList"
                                :key="province._id"
                            >
                                <a
                                    @click="chooseProvince(province._id, province.province[0])"
                                    class="dropdown-item"
                                >{{ province.province[0] }}</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <label class="label">City/Municipality</label>
                    <input
                        class="input"
                        type="text"
                        v-model="cityOrMunicipality"
                        placeholder="City or Municipality"
                    />
                    <span>e.g Bais City or Bindoy Municipality</span>
                    <br />
                    <br />
                    <label class="label">Latitude N</label>
                    <input class="input" type="number" v-model="latitude" placeholder="Latitude" />
                    <label class="label">Longtitude E</label>
                    <input
                        class="input"
                        type="number"
                        v-model="longtitude"
                        placeholder="Longtitude"
                    />
                    <button
                        class="button"
                        type="button"
                        @click="cityOrMunicipalityPost"
                        :disabled="selectedProvince == '' || cityOrMunicipality == '' || latitude == '' || longtitude == ''"
                    >Confirm</button>
                    <div v-if="cityOrMunicipalityPostSuccess" class="has-text-success">City or Municipality added</div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import axios from 'axios'

export default {
    name: "SuperUser",
    computed: {
        managerAccountsIndexed() {
            return this.managerAccounts.filter(x => {return x.hospital.toLowerCase().includes(this.searchBar.toLowerCase())})
        },
        doctorAccountsIndexed() {
            return this.doctorAccounts.filter(x => {return x.name.toLowerCase().includes(this.searchBar.toLowerCase()) || x.specialist.toLowerCase().includes(this.searchBar.toLowerCase())})
        },
        patientAccountsIndexed(){
            return this.patientAccounts.filter(x => {return x.name.toLowerCase().includes(this.searchBar.toLowerCase())})
        }
    },
    async mounted() {
        await axios.get("/session/superuser").then(response => this.superUser = response.data.superuser)
        await axios.get("/api/geolocation").then(response => this.provinceList = response.data)
    },
    data() {
        return {
            searchBar: '',
            superUser: '',
            managerAccounts: [],
            doctorAccounts: [],
            patientAccounts: [],
            isActiveManager: false,
            isActiveDoctor: false,
            isActivePatient: false,
            isActiveModal: false,
            isActiveDropdown: false,
            isActiveDropdownItemOne: false,
            isActiveDropdownItemTwo: false,
            isActiveDropdownProvince: false,
            id: '',
            email: '',
            status: '',
            type: '',
            province: '',
            cityOrMunicipality: '',
            latitude: '',
            longtitude: '',
            provinceList: [],
            selectedProvince: '',
            selectedProvinceID: '',
            provincePostSuccess: false,
            cityOrMunicipalityPostSuccess: false
        }
    },
    methods: {
        async manager() {
            this.isActiveManager = true
            this.isActiveDoctor = false
            this.isActivePatient = false

            await axios.get("/api/manager").then(response => this.managerAccounts = response.data)
        },
        async doctor() {
            this.isActiveManager = false
            this.isActiveDoctor = true
            this.isActivePatient = false

            await axios.get("/api/admin").then(response => this.doctorAccounts = response.data)
        },
        async patient() {
            this.isActiveManager = false
            this.isActiveDoctor = false
            this.isActivePatient = true

            await axios.get("/api/user").then(response => this.patientAccounts = response.data)
        },
        async managerEdit(id, email) {
            this.isActiveModal = !this.isActiveModal
            this.id = id
            this.email = email
            this.type = 'manager'
        },
        async doctorRecoverEmail(id, email) {
            this.isActiveModal = !this.isActiveModal
            this.id = id
            this.email = email
            this.type = 'doctor'
        },
        async patientRecoverEmail(id, email) {
            this.isActiveModal = !this.isActiveModal
            this.id = id
            this.email = email
            this.type = 'patient'
        },
        async updateData() {
            if (this.type == 'manager') {
                await axios.put(`/api/manager/${this.id}`, {
                    status: this.status,
                    email: this.email
                });
                await axios.get('/api/manager').then(response => this.managerAccounts = response.data)
                this.isActiveModal = !this.isActiveModal
            } else if (this.type == 'doctor') {
                await axios.put(`/api/admin/${this.id}`, {
                    gmail: this.email
                });
                await axios.get('/api/admin').then(response => this.doctorAccounts = response.data)
                this.isActiveModal = !this.isActiveModal
            } else if (this.type == 'patient') {
                await axios.put(`/api/user/${this.id}`, {
                    gmail: this.email
                });
                await axios.get('/api/user').then(response => this.patientAccounts = response.data)
                this.isActiveModal = !this.isActiveModal
            }
        },
        async managerDelete(id) {
            await axios.delete(`/api/manager/${id}`)
            await axios.get('/api/manager').then(response => this.managerAccounts = response.data)
        },
        async doctorDelete(id) {
            await axios.delete(`/api/admin/${id}`)
            await axios.get('/api/admin').then(response => this.doctorAccounts = response.data)
        },
        async patientDelete(id) {
            await axios.delete(`/api/user/${id}`)
            await axios.get('/api/user').then(response => this.patientAccounts = response.data)

        },
        closeModal() {
            this.isActiveModal = false
        },
        dropdown() {
            this.isActiveDropdown = !this.isActiveDropdown
        },
        statusActive() {
            this.status = 'Active'
            this.isActiveDropdownItemOne = true
            this.isActiveDropdownItemTwo = false
        },
        statusInactive() {
            this.status = 'Inactive'
            this.isActiveDropdownItemOne = false
            this.isActiveDropdownItemTwo = true
        },
        async provincePost() {
            await axios.post('/api/geolocation', {
                province: this.province
            });
            await axios.get("/api/geolocation").then(response => this.provinceList = response.data)
            this.provincePostSuccess = await true
        },
        async cityOrMunicipalityPost() {
            await axios.post('/api/provinceUpdate', {
                provinceID: this.selectedProvinceID,
                cityOrMunicipality: this.cityOrMunicipality,
                latitude: this.latitude,
                longtitude: this.longtitude
            });
            this.cityOrMunicipalityPostSuccess = true
            this.selectedProvince = ''
            this.selectedProvinceID = ''
            this.cityOrMunicipality = ''
            this.latitude = ''
            this.longtitude = ''
        },
        provinceDropdownActive() {
            this.isActiveDropdownProvince = !this.isActiveDropdownProvince
        },
        chooseProvince(id, provinceName) {
            this.selectedProvinceID = id
            this.selectedProvince = provinceName
        },
        async logout() {
            await axios.delete("/session/superuser");
            await this.$store.commit("superUserAuth", false)
            await this.$router.push("/user/superuser/login")
        }
    }
}
</script>
<style scoped>
</style>