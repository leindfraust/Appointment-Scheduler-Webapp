<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import PaymongoClient from 'paymongo.js';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CatchError from '../../components/CatchError.vue';

const store = useStore()
const router = useRouter()
const client = PaymongoClient(process.env.VUE_APP_PayMongoSK)
const paymentStatus = computed(() => store.state.paymentStatus)
const paymentProcessing = ref(false)
const patientUsername = ref('')
const errMsg = ref()

onMounted(async () => {
    paymentProcessing.value = true
    if (store.state.patientID !== null) {
        await axios.get("/session/patient").then(response => patientUsername.value = response.data.username);
    }
    await client.source.retrieve(store.state.paymentID).then(async response => {
        paymentProcessing.value = false
        if (response.data.attributes.status == 'chargeable') {
            store.commit("paymentStatus", 'paid')
        } else {
            store.commit("paymentStatus", 'failed')
            store.commit("appointed", false)
            let pastAppointments
            let checkPatientRecord
            try {
                await axios.post('/api/appointmentList/patients', { id: store.state.patientID, ongoing: false }).then(response => pastAppointments = response.data);
                checkPatientRecord = await store.state.doctorDetails.patients.find(x => x.patient === store.state.patientID._id)
                if (await checkPatientRecord && !pastAppointments) {
                    await axios.post('/api/patientDelete', {
                        doctorID: store.state.doctorDetails._id,
                        patientID: store.state.patientDetails._id,
                        patientFullName: store.state.patientDetails.firstName + " " + store.state.patientDetails.lastName
                    });
                }
                await axios.delete(`/api/appointmentList/${store.state.patientDetails._id}`)
            } catch (err) {
                errMsg.value = err
            }
            store.commit("patientDetails", [])
        }
    });
    setTimeout(async () => {
        if (paymentStatus.value == 'paid') {
            store.commit("appointed", true)
            await router.push("/success");
        } else {
            await router.push(`/user/${patientUsername.value}/registration`)
        }
    }, 5000);
});

onUnmounted(() => {
    if (paymentStatus.value == 'paid') {
        store.commit("paymentStatus", 'pending')
    }
})
</script>
<template>
    <section class="section is-medium" v-if="!paymentProcessing">
        <CatchError :err-msg="errMsg" />
        <div class="container" v-if="paymentStatus == 'paid'">
            <div class="box">
                <h3 class="title is-3 has-text-success">You have successfuly paid your appointment. Redirecting browser
                    in 5 seconds.</h3>
            </div>
        </div>
        <div class="container" v-else>
            <div class="box">
                <h3 class="title is-3 has-text-danger">Your payment transaction has failed. Please try again,
                    redirecting browser in 5 seconds.</h3>
            </div>
        </div>
    </section>
    <section class="section is-medium" v-else>
        <div class="container">
            <div class="box">
                <h3 class="title is-3">Your payment is processing, please wait...</h3>
            </div>
        </div>
    </section>
</template>