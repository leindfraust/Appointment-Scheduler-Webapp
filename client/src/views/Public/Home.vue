<template>
  <NavigationTabVue />
  <section class="section is-medium has-text-centered" >
    <HospitalFinderVue />
    <div class="container box" id="covidAPI" style="width: 70%;">
      <h1 class="title has-text-left">Latest COVID-19 Data</h1>
      <hr>
      <div class="columns">
        <div class="column">
          <h4 class="title is-2">Worldwide 🌎</h4>
          <div class="container is-fluid has-text-left">
            <p class="subtitle">
              <b>Total Active Cases:</b>
              {{ covidAPIWorldWide.active }}+
            </p>
            <p class="subtitle">
              <b>Total Deaths:</b>
              {{ covidAPIWorldWide.deaths }}+
            </p>
            <p class="subtitle">
              <b>Total Recoveries:</b>
              {{ covidAPIWorldWide.recovered }}+
            </p>
          </div>
        </div>
        <div class="column">
          <h4 class="title is-2">Philippines 🇵🇭</h4>
          <div class="container is-fluid has-text-left">
            <p class="subtitle">
              <b>Total Active Cases:</b>
              {{ covidAPIPh.active }}+
            </p>
            <p class="subtitle">
              <b>Total Deaths:</b>
              {{ covidAPIPh.deaths }}+
            </p>
            <p class="subtitle">
              <b>Total Recoveries:</b>
              {{ covidAPIPh.recovered }}+
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HospitalFinderVue from "../../components/HospitalFinder.vue";
import NavigationTabVue from "../../components/NavigationTab.vue";
import axios from 'axios'
export default {
  name: "Home",
  components: {
    NavigationTabVue,
    HospitalFinderVue
  },
  data() {
    return {
      userPatient: null,
      covidAPIPh: [],
      covidAPIWorldWide: []
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
    await axios.get('https://disease.sh/v3/covid-19/countries/philippines').then(response => this.covidAPIPh = response.data)
    await axios.get('https://disease.sh/v3/covid-19/all').then(response => this.covidAPIWorldWide = response.data)
  },
};
</script>

<style scoped>
.section {
  background-color: whitesmoke !important;
}
@media (max-width: 991.98px) {
  #covidAPI {
    width: 100% !important;
  }
}
</style>