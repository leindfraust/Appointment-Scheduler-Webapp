<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const alias = ref(store.state.alias)
const isActive = ref(false)

async function logout() {
    store.commit("alias", null);
    await axios.delete("/session/doctor");
    await router.push("/account/login");
}
async function routeHome() {
    await router.push(`/doctor/${alias.value}/appointments`);
}
async function openProfile() {
    await router.push(`/doctor/${alias.value}/profile`);
}
async function openPatientHistory() {
    await router.push(`/doctor/${alias.value}/appointments/history`)
}
async function openPatientAppointmentsCancelled() {
    await router.push(`/doctor/${alias.value}/appointments/cancelled`)
}
async function openSecurity() {
    await router.push(`/doctor/${alias.value}/security`)
}
async function openSchedule() {
    await router.push(`/doctor/${alias.value}/schedule`);
}
async function openPayment() {
    await router.push(`/doctor/${alias.value}/payment`)
}
function menuNav() {
    isActive.value = !isActive.value
}
</script>
<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a class="navbar-item">
                <label class="label">Dr. {{ $store.state.doctorName }}</label>
            </a>
            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="menuNav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>
    <aside class="menu box" :class="{ 'is-hidden-mobile': !isActive, 'fixedMenu': !isActive }"
        style="background-color: #D8E5FF; padding: 20px; height: 100vh;">
        <div class="has-text-centered block" style="padding: 5px;">
            <figure class="is-hidden-mobile is-hidden-touch image image-outer is-square" style="margin: auto; ">
                <img class="is-rounded image-inner"
                    :src="`http://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/doctors/${alias}.jpg`">
            </figure>
            <h5 class="title is-6" v-if="!isActive">Dr. {{ $store.state.doctorName }}</h5>
        </div>
        <ul class="menu-list block">
            <p class="menu-label">General</p>
            <li>
                <a @click="routeHome">Appointments</a>
            </li>
            <li>
                <a @click="openPatientHistory">Appointment History</a>
            </li>
            <li>
                <a @click="openPatientAppointmentsCancelled">Cancelled Appointments</a>
            </li>
            <li>
                <a @click="openSchedule">Schedule</a>
            </li>
            <p class="menu-label">Verification and Information</p>
            <li>
                <a @click="openProfile">Profile</a>
            </li>
            <li>
                <a @click="openSecurity">Security</a>
            </li>
            <li>
                <a @click="openPayment">Payment</a>
            </li>
            <p class="menu-label">Support</p>
            <li>
                <a @click="this.$router.push('/contactus')">Contact Us</a>
            </li>
        </ul>
        <div class="block has-text-centered">
            <button @click="logout" class="button is-link is-rounded" type="button">Logout</button>
        </div>
    </aside>
</template>
<style scoped>
.fixedMenu {
    position: fixed;
}
</style>
<style>
.image-outer {
    background: center center no-repeat url('../assets/images/background-figure-style.png');
    background-size: contain;
}

.image-inner {
    padding: 15px
}
</style>