<template>
<NavigationTabVue/>
<section class="section" >
        <div class="box" style="margin: auto; width:100%;"><p class="subtitle">{{patient}}</p>
        <figure class="media block">
           <img id="imgAvatar" :src="imgPreUrl + patient + svgExtUrl">
        </figure>
        <button class="button is-info" @click="doctors">Get started</button>
        </div>
    </section>

</template>
<script>
import axios from 'axios'
import NavigationTabVue from '../../components/NavigationTab.vue'

export default {
    name: 'User',
    components: {
        NavigationTabVue
    },
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