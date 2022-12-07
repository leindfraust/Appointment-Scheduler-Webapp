<template>
    <div class="modal" :class="{ 'is-active': loading }">
        <div class="modal-background"></div>
        <div class="modal-content loader"></div>
    </div>
    <div class="columns">
        <div class="column is-2">
            <ManagerMenuVue />
        </div>
        <div class="column" style="overflow: auto;">
            <section class="section">
                <div class="notification is-light is-danger" v-if="hospitalStatus.status == 'Inactive'">The account is
                    not activated yet and will not be displayed on hospital searches, complete the hospital's
                    <router-link :to="`/manager/${this.managerHospital.hospital}/profile`" class="has-text-link">
                        profile</router-link> to activate the account.
                </div>
                <h1 class="title">{{ managerHospital.hospital }}</h1>
                <div class="container" v-if="!loading && hospitalStatus.status == 'Active'">
                    <h1 class="title is-4">Insights</h1>
                    <LineChart :chartData="lineChartData" :options="lineChartOptions" />
                </div>
                <hr>
                <div class="container" v-if="Object.keys(doctorAccountsIndexed).length !== 0">
                    <h2 class="title is-4">Upcoming Ongoing Schedules</h2>
                    <div class="columns is-multiline is-centered">
                        <div class="column is-5"
                            v-for="doctor in doctorAccountsIndexed.slice().filter(x => x.verified && x.schedule.find(x => new Date(x.date).getTime() >= new Date(new Date().toDateString()).getTime()) && x.schedule.find(x => x.hospital == managerHospital.hospital)).sort((a, b) => new Date(b?.schedule.find(x => new Date(x.date).getTime() >= new Date(new Date().toDateString()).getTime()).date).getTime() - new Date(a?.schedule.find(x => new Date(x.date).getTime() >= new Date(new Date().toDateString()).getTime()).date).getTime())"
                            :key="doctor._id">
                            <div class="box">
                                <div class="columns">
                                    <div class="column is-narrow">

                                        <figure class="image is-128x128">
                                            <img
                                                :src="`http://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/doctors/${doctor.alias}.jpg`">
                                        </figure>
                                    </div>
                                    <div class="column">
                                        <p class="subtitle is-5">Dr. {{ doctor.name }}</p>
                                        <p class="subtitle is-6">{{ doctor.specialist.toString() }}</p>
                                        <p class="subtitle is-5">Schedules: </p>
                                        <span v-for="schedule in doctor.schedule" :key="schedule.id">
                                            <p class="subtitle is-6"
                                                v-if="new Date(schedule.date).getTime() >= new Date(new Date().toDateString()).getTime() && schedule.hospital == managerHospital.hospital">
                                                <strong
                                                    v-if="new Date(schedule.date).getTime() == new Date(new Date().toDateString()).getTime() && schedule.hospital == managerHospital.hospital"
                                                    class="has-text-info">TODAY: </strong> {{ `${new
                                                            Date(schedule.date).toDateString()}, ${schedule.timeStart} -
                                                                                                    ${schedule.timeEnd}`
                                                    }}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h1 class="title is-4">Doctors Registered</h1>
                <div class="field" v-if="doctorAccounts.length !== 0">
                    <div class="control" style="width: 33%;">
                        <label class="label">Search:</label>
                        <input class="input" type="text" v-model="searchBar" placeholder="Search..." />
                    </div>
                </div>
                <div class="table-container" v-if="Object.keys(doctorAccountsIndexed).length !== 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="has-text-black-ter">Controls</th>
                                <th class="has-text-black-ter">No.</th>
                                <th class="has-text-black-ter">Alias</th>
                                <th class="has-text-black-ter">Full Name</th>
                                <th class="has-text-black-ter">Specialist</th>
                                <th class="has-text-black-ter">Email</th>
                            </tr>
                        </thead>
                        <tbody v-for="(doctor, index) in doctorAccountsIndexed" :key="doctor._id">
                            <tr>
                                <button class="dropdown-item button has-text-info" type="button"
                                    @click="doctorRecoverEmail(doctor._id, doctor.gmail)">Recover</button>
                                <button class="button dropdown-item has-text-danger" type="button"
                                    @click="doctorRemove(doctor._id)">Remove</button>
                                <td class="has-text-black-ter">{{ index + 1 }}</td>
                                <td class="has-text-black-ter">{{ doctor.alias }}</td>
                                <td class="has-text-black-ter">{{ doctor.name }}</td>
                                <td class="has-text-black-ter">{{ doctor.specialist.toString() }}</td>
                                <td class="has-text-black-ter">{{ doctor.gmail }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="notification is-warning"
                    v-else-if="doctorAccountsIndexed.length == 0 && doctorAccounts.length !== 0">
                    No results found.
                </div>
                <div class="notification is-warning" v-if="doctorAccounts.length == 0">
                    No doctors as of yet, generate a security code in <b>Registration and Password</b> for your doctors
                    to use in
                    registering to their account.
                </div>
                <div class="modal" :class="{ 'is-active': isActiveModal }">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <div class="field">
                                <label class="label">Register new email: </label>
                                <div class="control">
                                    <input class="input" type="text" v-model="email" />
                                </div>
                            </div>
                            <button class="button is-success" type="button" @click="updateData">Confirm</button>
                        </div>
                        <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ManagerMenuVue from '../../components/ManagerMenu.vue'
import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'

Chart.register(...registerables)

export default {
    name: "ManagerDashboard",
    components: {
        ManagerMenuVue,
        LineChart
    },
    computed: {
        doctorAccountsIndexed() {
            return this.doctorAccounts.filter(x => { return x.name.toLowerCase().includes(this.searchBar.toLowerCase()) || x.alias.toLowerCase().includes(this.searchBar.toLowerCase()) || x.specialist.find(x => x.toLowerCase().includes(this.searchBar.toLowerCase())) })
        },
    },
    async mounted() {
        this.loading = true
        await axios.get('/session/manager').then(response => this.managerHospital = response.data)
        await axios.post(`/api/manager/${this.managerHospital._id}`).then(response => this.hospitalStatus = response.data)
        await axios.post('/api/doctor/manager', { hospital: this.managerHospital.hospital }).then(response => this.doctorAccounts = response.data)
        await axios.post('/api/appointmentList/managers', { hospital: this.managerHospital.hospital }).then(response => this.hospitalAppointments = response.data);

        //line chart variables
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let schedules = []
        let dataArrLine = []
        this.hospitalAppointments.forEach(x => {
            if (new Date(x.schedule[0].date).getFullYear() == new Date().getFullYear()) return schedules.push(monthNames[x.schedule[0].dayDetail.month - 1])
        })
        let lineChartLabel = [...new Set(schedules)]

        lineChartLabel.forEach(e => dataArrLine.push(this.hospitalAppointments.filter(x => new Date(x.schedule[0].date).getFullYear() == new Date().getFullYear() && monthNames[x.schedule[0].dayDetail.month] == e && x.ifPatientVisited).length))
        this.lineChartData = {
            labels: lineChartLabel,
            datasets: [{
                data: dataArrLine,
                backgroundColor: ['#77CEFF'],
            }]
        }
        this.loading = false
    },
    data() {
        return {
            loading: false,
            hospitalStatus: '',
            managerHospital: '',
            searchBar: '',
            isActiveModal: false,
            doctorAccounts: [],
            email: '',
            id: '',
            lineChartData: [],
            lineChartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Appointment counts throughout this year',
                    },
                },
            },
            hospitalAppointments: []
        }
    },
    methods: {
        doctorRecoverEmail(id, email) {
            this.id = id
            this.email = email
            this.isActiveModal = true
        },
        async updateData() {
            await axios.put(`/api/doctor/${this.id}`, {
                gmail: this.email
            });
            await axios.get('/api/doctor').then(response => this.doctorAccounts = response.data)
            this.isActiveModal = !this.isActiveModal
        },
        async doctorRemove(id) {
            await axios.post('/api/doctorPullHospital', {
                doctorID: id,
                hospital: this.managerHospital.hospital
            });
            await axios.get('/api/doctor').then(response => this.doctorAccounts = response.data)
        },
        closeModal() {
            this.isActiveModal = false
        },
    }
}
</script>
<style scoped>

</style>