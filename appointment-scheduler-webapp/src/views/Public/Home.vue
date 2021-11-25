<template>
  <NavigationTabVue />
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h1 class="title">Healing takes time, and asking for help is a courageous step.</h1>
            <figure class="image is-16by9">
              <img src="../../assets/images/istockphoto_1213515925_612x612_removebg_preview_1.png" />
            </figure>
          </div>
          <div class="column has-text-centered" style="margin-top: 20%">
            <button
              class="button"
              style="font-size: 24px; border-radius: 25px; color: #126782"
            >GET STARTED</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavigationTabVue from "../../components/NavigationTab.vue";
import axios from 'axios'
export default {
  name: "Home",
  components: {
    NavigationTabVue
  },
  data() {
    return {
      userPatient: null
    }
  },
  async mounted() {
    await axios
      .get("/session/patient")
      .then(
        (response) =>
          (this.userPatient = response.data)
      );
    if (await this.userPatient.username) {
      this.$store.commit("patientUsername", this.userPatient.username)
      this.$store.commit("patientID", this.userPatient._id)
      await this.$router.push(`/user/${this.userPatient.username}`);
    }
  }
};
</script>

<style scoped>
.hero {
  background: linear-gradient(
    180deg,
    rgba(171, 196, 255, 0) 11.59%,
    rgba(142, 179, 227, 0.331896) 35.73%,
    rgba(102, 155, 188, 0.79) 65.94%
  ) !important;
}
</style>