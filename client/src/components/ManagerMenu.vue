<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

const isActive = ref(false)
const managerHospital = ref(null)

onMounted(async () => await axios.get('/session/manager').then(response => managerHospital.value = response.data.hospital))

async function logout() {
    await axios.delete('/session/manager');
    store.commit("managerHospital", null);
    await router.push("/account/login");
}
function menuNav() {
    isActive.value = !isActive.value
}
function navProfile() {
    router.push(`/manager/${managerHospital.value}/profile`);
}
function navDoctors() {
    router.push(`/manager/${managerHospital.value}`)
}
function navChangePass() {
    router.push(`/manager/${managerHospital.value}/security`)
}
</script>
<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="menuNav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>
    <aside class="menu box" :class="{ 'is-hidden-mobile': !isActive, 'fixedMenu': !isActive }"
        style="background-color: white; padding: 20px; height: 100vh">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li>
                <a @click="navDoctors">Dashboard</a>
            </li>
            <li>
                <a @click="navProfile">Profile</a>
            </li>
        </ul>
        <p class="menu-label">Security</p>
        <ul class="menu-list">
            <li>
                <a @click="navChangePass">Registration and Password</a>
            </li>
        </ul>
        <p class="menu-label">Support</p>
        <ul class="menu-list">
            <li>
                <a @click="this.$router.push('/contactus')">Contact Us</a>
            </li>
        </ul>
        <hr />
        <button class="button is-danger" @click="logout">Logout</button>
    </aside>
</template>
<style>
.fixedMenu {
    position: fixed;
}
</style>