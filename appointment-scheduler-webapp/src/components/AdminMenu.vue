<template>
    <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <figure class="media block">
            <span class="image is-128x128" v-html="profileImg"></span>
        </figure>
        <button @click="logout" class="button is-danger" type="button">Logout</button>
        <ul class="menu-list">
            <li>
                <a @click="routeHome">Home</a>
            </li>
            <li>
                <a @click="patientLogs">Patient logs</a>
            </li>
            <li>
                <a @click="profile">Profile</a>
            </li>
            <li>
                <a @click="openSchedule">Schedule</a>
            </li>
        </ul>
    </aside>
</template>
<script>
import store from '../store'
import axios from 'axios'
import cld from '../cloudinary'

export default {
    name: "AdminMenu",
    data() {
        return {
            alias: store.state.alias,
            profileImg: store.state.profileImg
        }
    },
    methods: {
        async logout() {
            store.commit("alias", null);
            await axios.delete("/session/admin");
            await this.$router.push("/admin/login");
        },
        async routeHome() {
            await this.$router.push(`/admin/user/${this.alias}`);
        },
        async profile() {
            await this.$router.push(`/admin/user/${this.alias}/profile`);
        },
        async patientLogs() {
            await this.$router.push(`/admin/user/${this.alias}/patients`)
        },
        async openSchedule() {
            await this.$router.push(`/admin/user/${this.alias}/schedule`);
        },
    }
}
</script>
<style scoped>
</style>