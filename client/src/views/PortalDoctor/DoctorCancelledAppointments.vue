<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import DoctorMenu from '../../components/DoctorMenu.vue'
import axios from 'axios'
import { useStore } from 'vuex';
import groupBy from 'lodash/groupBy'
import CatchError from '../../components/CatchError.vue';

const store = useStore()

const cancelledAppointments = ref([])
const searchBar = ref('')
const errMsg = ref('')

onBeforeMount(async () => {
    await axios.post('/api/appointmentList/cancelledAppointments', { id: store.state.doctorID }).then(response => cancelledAppointments.value = response.data)
})

const cancelledAppointmentsFiltered = computed(() => {
    if (cancelledAppointments.value.length !== 0) {
        return groupBy(cancelledAppointments.value.filter(x => {
            return (
                x.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                x.lastName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                x.referenceID.toLowerCase().includes(searchBar.value.toLowerCase())
            );
        }).sort((a, b) => {
            return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
        }),
            "schedule[0].date")
    } else {
        return false
    }
});

async function deleteAppointment(id) {
    await axios.delete(`/api/appointmentList/${id}`).catch(err => errMsg.value = err)
    await axios.post('/api/appointmentList/cancelledAppointments', { id: store.state.doctorID }).then(response => cancelledAppointments.value = response.data)
}

</script>
<template>
    <div class="main-doctor">
        <div class="columns">
            <div class="column is-2">
                <DoctorMenu />
            </div>
            <div class="column main-doctor-content">
                <section class="section">
                    <CatchError :err-msg="errMsg" />
                    <h1 class="title">CANCELLED APPOINTMENTS</h1>
                    <div class="field" v-if="cancelledAppointments.length !== 0">
                        <div class="control">
                            <input class="input" type="text" style="width: 50% !important" v-model="searchBar"
                                placeholder="Search..." />
                        </div>
                    </div>
                    <div class="container is-widescreen is-fullhd"
                        v-if="Object.keys(cancelledAppointmentsFiltered).length !== 0">
                        <div class="box" v-for="(appointmentList, index) in cancelledAppointmentsFiltered" :key="index">
                            <h1 class="subtitle has-text-black">Schedule: {{ new
                                    Date(index).toDateString()
                            }}</h1>
                            <div class="table-container">
                                <table class="table is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th class="has-text-black-ter">Controls</th>
                                            <th class="has-text-black-ter">Reference ID</th>
                                            <th class="has-text-black-ter">Priority No.</th>
                                            <th class="has-text-black-ter">Hospital Appointed</th>
                                            <th class="has-text-black-ter">First Name</th>
                                            <th class="has-text-black-ter">Last Name</th>
                                            <th class="has-text-black-ter">Contact Number</th>
                                            <th class="has-text-black-ter">Birthday</th>
                                            <th class="has-text-black-ter">Symptoms/Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="appointments in appointmentList" :key="appointments._id">
                                            <button class="button is-danger is-light"
                                                @click="deleteAppointment(appointment._id)">Delete</button>
                                            <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
                                            <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                                            <th class="has-text-black-ter">{{ appointments.hospital }}</th>
                                            <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                                            <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                                            <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                                            <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                                            <td class="has-text-black-ter" style="white-space: pre-wrap;">{{
                                                    appointments.comments
                                            }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <section class="section" v-else>
                        <div class="notification is-info">
                            <h1 class="title is-5">No cancelled appointments.</h1>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>