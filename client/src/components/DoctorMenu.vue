<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a class="navbar-item">
                <label class="label">{{ alias }}</label>
            </a>
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
        class="menu"
        :class="{ 'is-hidden-mobile': isActive, 'fixedMenu': isActive }"
        style="background-color: white; padding: 20px; box-shadow: 5px 10px rgba(240, 240, 240, 0.966);"
    >
        <div class="has-text-centered block" style="padding: 5px;">
            <figure class="is-hidden-mobile is-hidden-touch image is-square" style="margin: auto; ">
                <span v-html="profileImg"></span>
            </figure>
            <figure class="is-hidden-desktop image is-128x128" style="margin: auto; ">
                <span v-html="profileImg"></span>
            </figure>
            <h5 class="title is-5" v-if="isActive">{{ alias }}</h5>
        </div>
        <ul class="menu-list block">
            <p class="menu-label">General</p>
            <li>
                <a @click="routeHome">Appointments</a>
            </li>
            <li>
                <a @click="patientLogs">Patient History</a>
            </li>
            <li>
                <a @click="openSchedule">Schedule</a>
            </li>
            <p class="menu-label">Verification and Information</p>
            <li>
                <a @click="profile">Profile</a>
            </li>
            <li>
                <a @click="openSecurity">Security</a>
            </li>
            <p class="menu-label">Support</p>
            <li>
                <a @click="openFAQs">FAQ</a>
            </li>
            <li>
                <a @click="this.$router.push('/contactus')">Contact Us</a>
            </li>
        </ul>
        <hr />
        <button @click="logout" class="button is-danger" type="button">Logout</button>
    </aside>
</template>
<script>
import store from '../store'
import axios from 'axios'
export default {
    name: "AdminMenu",
    data() {
        return {
            alias: store.state.alias,
            profileImg: store.state.profileImg,
            isActive: true
        }
    },
    methods: {
        async logout() {
            store.commit("alias", null);
            await axios.delete("/session/doctor");
            await this.$router.push("/doctor/login");
        },
        async routeHome() {
            await this.$router.push(`/doctor/user/${this.alias}`);
        },
        async profile() {
            await this.$router.push(`/doctor/user/${this.alias}/profile`);
        },
        async patientLogs() {
            await this.$router.push(`/doctor/user/${this.alias}/patients`)
        },
        async openSecurity() {
            await this.$router.push(`/doctor/user/${this.alias}/security`)
        },
        async openSchedule() {
            await this.$router.push(`/doctor/user/${this.alias}/schedule`);
        },
        menuNav() {
            this.isActive = !this.isActive
        }
    }
}
</script>
<style scoped>
.fixedMenu {
    position: fixed;
    height: 100vh;
}
</style>