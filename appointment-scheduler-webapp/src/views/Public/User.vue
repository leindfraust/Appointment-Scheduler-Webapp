<template>
<aside class="menu">
        <p class="menu-label">Hello, {{ patient }}</p>
        <figure class="media block">
           <img id="imgAvatar" :src="imgPreUrl + patient + svgExtUrl">
        </figure>
        <button @click="logout" class="button is-danger" type="button">Logout</button>
        <ul class="menu-list">
            <li>
                <a @click="profile">Profile</a>
            </li>
            <li>
                <a @click="inbox">Inbox</a>
            </li>
        </ul>
    </aside>
    <button class="button is-info" @click="doctors">Get started</button>
</template>
<script>
import axios from 'axios'
import socket from '../../socket'

export default {
    name: 'User',
    data(){
        return {
            patient: this.$store.state.patientUsername,
            imgPreUrl: "https://avatars.dicebear.com/api/micah/",
            svgExtUrl: ".svg"
        }
    },
    methods: {
        doctors() {
            this.$router.push(`/user/${this.patient}/doctors`)
        },
        inbox(){
            this.$router.push('/chatnow')
            this.$store.commit("userType", "patient")
        },
        async logout(){
            this.$store.commit("patientUsername", null);
            await axios.delete("/session/patient");
            await this.$router.push("/user/login");
        }
    }
}
</script>
<style scoped>
#imgAvatar {
    width: 10%
}
</style>