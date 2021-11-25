<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" />
            </a>

            <a
                role="button"
                class="navbar-burger"
                :class="{ 'is-active': isActive }"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar"
                @click="navbar"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-end">
                <a class="navbar-item">About</a>

                <a class="navbar-item">Services</a>
                <div class="navbar-item">
                    <div class="buttons">
                        <a v-if="patient != ''" class="button is-light" href="#"><img :src="imgPreUrl + patient + svgExtUrl" />{{ patient }}</a>
                        <a v-else class="button is-light" href="/user/login">Log in</a>
                        <a v-if="patient != ''" class="button is-danger" @click="logout">
                            <strong>Logout</strong>
                        </a>
                        <a v-else class="button is-primary" href="/user/signup">
                            <strong>Sign up</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import axios from 'axios'

export default {
    name: 'NavigationTab',
    data() {
        return {
            isActive: false,
            patient: this.$store.state.patientUsername,
            imgPreUrl: "https://avatars.dicebear.com/api/micah/",
            svgExtUrl: ".svg"
        }
    },
    methods: {
        navbar() {
            this.isActive = !this.isActive
        },
        async logout(){
            await this.$store.commit("patientUsername", '');
            await axios.delete("/session/patient");
            await this.$router.push("/user/login");
        }
    }
}
</script>
<style scoped>
</style>