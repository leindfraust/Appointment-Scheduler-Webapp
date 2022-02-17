<template>
    <NavigationTabVue />
    <section class="section">
        <div class="container has-text-centered">
            <HospitalFinderVue />
        </div>
    </section>
</template>
<script>
import axios from 'axios'
import NavigationTabVue from '../../components/NavigationTab.vue'
import socket from '../../socket'
import HospitalFinderVue from '../../components/HospitalFinder.vue'

export default {
    name: 'User',
    components: {
        NavigationTabVue,
        HospitalFinderVue
    },
    data() {
        return {
            imgPreUrl: "https://avatars.dicebear.com/api/micah/",
            svgExtUrl: ".svg",
            notifications: []
        }
    },
    methods: {
        inbox() {
            this.$router.push('/chatnow')
            this.$store.commit("userType", "patient")
        },
        async logout() {
            this.$store.commit("patientUsername", null);
            await axios.delete("/session/patient");
            await this.$router.push("/user/login");
        },
    }
}
</script>
<style scoped>
#imgAvatar {
    width: 10%;
}
</style>