<template>
<section class="section">
<h1 class="title">{{managerHospital.hospital}}</h1>
<button class="button is-danger" @click="logout">Logout</button>
    <div class="field">
        <div class="control" style="width: 33%;">
            <label class="label">Search: </label>
            <input class="input" type="text" v-model="searchBar" placeholder="Search...">
        </div>
    </div>
    <div class="table-container">
        <table class="table">
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
                        @click="doctorRemove(doctor._id)"
                    >Remove</button>
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
    </div>
    <div class="modal" :class="{'is-active': isActiveModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" v-model="email">
                    </div>
                    <button class="button is-success" type="button" @click="updateData">Confirm</button>
                </div>
            </div>
             <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
        </div>
    </div>
    </section>
</template>
<script>
import axios from 'axios'

export default {
    name: "Manager",
    computed: {
        doctorAccountsIndexed() {
            return this.doctorAccounts.filter(x => {return x.name.toLowerCase().includes(this.searchBar.toLowerCase()) || x.specialist.toLowerCase().includes(this.searchBar.toLowerCase())})
        },
    },
    async mounted() {
        await axios.get('/session/manager').then(response => this.managerHospital = response.data)
        await axios.get('/api/admin').then(response => this.doctorAccounts = response.data.filter(x => x.hospitalOrigin.find(x => x.hospital === this.managerHospital.hospital)))
        console.log(await this.doctorAccounts)
        console.log(this.managerHospital.hospital)
    },
    data() {
        return {
            managerHospital: '',
            searchBar: '',
            isActiveModal: false,
            doctorAccounts: [],
            email: '',
            id: ''
        }
    },
    methods: {
        doctorRecoverEmail(id, email){
            this.id = id
            this.email = email
            this.isActiveModal = true
        },
        async updateData(){
            await axios.put(`/api/admin/${this.id}`, {
                gmail: this.email
            });
            await axios.get('/api/admin').then(response => this.doctorAccounts = response.data)
            this.isActiveModal = !this.isActiveModal
        },
        async doctorRemove(){
            await axios.post('/api/doctorPullHospital', {
                doctorID: this.id,
                hospital: this.managerHospital.hospital
            });
        },
        closeModal() {
            this.isActiveModal = false
        },
        async logout(){
            await axios.delete('/session/manager');
            await this.$store.commit("managerHospital", null);
            await this.$router.push("/user/manager/login");
        },
    }
}
</script>
<style scoped>
</style>