<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a
                role="button"
                class="navbar-burger"
                :class="{ 'is-active': !isActive }"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar"
                @click="menuNav"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>
    <aside
        class="menu box"
        :class="{ 'is-hidden-mobile': isActive, 'fixedMenu': isActive }"
        style="background-color: white; padding: 20px; height: 100vh"
    >
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li>
                <a @click="navDoctors">Home</a>
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
                <a>FAQ</a>
            </li>
            <li>
                <a @click="this.$router.push('/contactus')">Contact Us</a>
            </li>
        </ul>
        <hr />
        <button class="button is-danger" @click="logout">Logout</button>
    </aside>
</template>
<script>
import axios from 'axios'

export default {
    name: 'ManagerMenu',
    data() {
        return {
            isActive: true,
            managerHospital: ''
        }
    },
    async mounted() {
        await axios.get('/session/manager').then(response => this.managerHospital = response.data.hospital)
    },
    methods: {
        async logout() {
            await axios.delete('/session/manager');
            await this.$store.commit("managerHospital", null);
            await this.$router.push("/user/manager/login");
        },
        menuNav() {
            this.isActive = !this.isActive
        },
        navProfile() {
            this.$router.push(`/user/manager/${this.managerHospital}/profile`);
        },
        navDoctors() {
            this.$router.push(`/user/manager/${this.managerHospital}`)
        },
        navChangePass() {
            this.$router.push(`/user/manager/${this.managerHospital}/security`)
        }
    }
}
</script>
<style>
.fixedMenu {
    position: fixed;
}
</style>