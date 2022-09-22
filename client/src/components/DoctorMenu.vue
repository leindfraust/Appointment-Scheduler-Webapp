<template>
    <nav class="navbar is-hidden-desktop">
        <div class="navbar-brand">
            <a class="navbar-item">
                <label class="label">Dr. {{ $store.state.doctorName }}</label>
            </a>
            <a role="button" class="navbar-burger" :class="{ 'is-active': !isActive }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="menuNav">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>
    <aside class="menu box" :class="{ 'is-hidden-mobile': isActive, 'fixedMenu': isActive }"
        style="background-color: #D8E5FF; padding: 20px;">
        <div class="has-text-centered block" style="padding: 5px;">
            <figure class="is-hidden-mobile is-hidden-touch image image-outer is-square" style="margin: auto; ">
                <img class="is-rounded image-inner"
                    :src="`http://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/doctors/${alias}.jpg`">
            </figure>
            <h5 class="title is-6" v-if="isActive">Dr. {{ $store.state.doctorName }}</h5>
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
        <div class="block has-text-centered">
            <button @click="logout" class="button is-link is-rounded" type="button">Logout</button>
        </div>
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
<style>
.image-outer {
    background: center center no-repeat url('../assets/images/background-figure-style.png');
    background-size: contain;
}

.image-inner {
    padding: 15px
}
</style>