<template>
  <NavigationTab />
  <section class="section">
    <div class="columns">
      <div class="column">
        <div class="container box" v-if="hospitalDetails">
          <h1 class="title">{{ hospitalDetails.hospital }}</h1>
          <p
            class="subtitle"
          >📌 {{ hospitalDetails.barangayORStreet }}, {{ hospitalDetails.city }}, {{ hospitalDetails.province }}</p>
          <p class="subtitle is-6">{{ hospitalDetails.details[0].description }}</p>
          <figure class="image is-16by9">
            <img
              :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/managers/${hospitalDetails.hospital}.jpg`"
            />
          </figure>
          <br />
          <div class="columns">
            <div class="column">
              <iframe
                :src="`https://maps.google.com/maps?q=${hospitalDetails.location.coordinates[1]},${hospitalDetails.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"
              ></iframe>
            </div>
            <div class="column">
              <p class="subtitle">Contacts:</p>
              <ul class="block" v-if="typeof hospitalDetails.details[0].contacts !== 'undefined'">
                <li v-for="contacts in hospitalDetails.details[0].contacts">{{ contacts.contact }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box container">
          <div class="block">
            <h1 class="title">Pick a specialist.</h1>
            <p class="subtitle" v-if="!specializationClicked">
              Having trouble picking a specialist? Get appointed to a
              <a
                class="has-text-link"
                @click="getDoctors('General Practitioner')"
              >General Practitioner</a>.
            </p>
            <div class="columns is-multiline is-mobile" v-if="!specializationClicked">
              <div class="column is-4" v-for="(specialist, index) in specialistList" :key="index">
                <a @click="getDoctors(specialist.specialist)">
                  <figure
                    class="image is-4by3"
                    v-if="specialist.specialist !== 'General Practitioner'"
                  >
                    <img
                      :src="`https://ui-avatars.com/api/?name=${specialist.specialist}`
                      "
                    />
                  </figure>
                  <p
                    class="subtitle has-text-centered"
                    v-if="specialist.specialist !== 'General Practitioner'"
                  >{{ specialist.specialist }}</p>
                </a>
              </div>
            </div>
            <div class="container" v-else>
              <button class="button" @click="viewSpecializations">⬅️ Specializations</button>
              <div v-if="doctorList == ''">
                <br />
                <p
                  class="subtitle has-text-centered"
                >No doctors are currently available in this specialization.</p>
              </div>
              <div v-else class="card-content" v-for="doctors in doctorList" :key="doctors._id">
                <h1 class="title is-3">Choose a doctor:</h1>
                <div class="media">
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img
                        :src="`http://res.cloudinary.com/leindfraust/image/upload/v1/assets/doctors/${doctors.alias}.jpg`"
                      />
                    </p>
                  </figure>
                  <div class="media-content">
                    <p class="title is-4">{{ doctors.name }}</p>
                    <p class="subtitle is-6">{{ pickedSpecialist }}</p>
                    <button
                      class="button"
                      @click="pickDoctor(doctors._id, doctors.schedule)"
                    >Appoint</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "../../store";
import NavigationTab from "../../components/NavigationTab.vue";

export default {
  name: "DoctorList",
  components: {
    NavigationTab
  },
  data() {
    return {
      hospitalID: this.$store.state.hospitalID,
      hospitalDetails: null,
      patientDetails: null,
      doctorList: null,
      specialistList: null,
      pickedSpecialist: null,
      specializationClicked: false
    };
  },
  async mounted() {
    //temporary 
    //needs to edit data GET to find hospital name, will be implemented in the future once main feature is ready
    await axios
      .get("/session/patient")
      .then(response => this.patientDetails = response.data);
  },
  async created() {
    await axios.get("/api/manager").then(response => this.hospitalDetails = response.data.find(x => x._id == this.hospitalID));
    this.specialistList = await this.hospitalDetails.specializations;
  },
  methods: {
    async getDoctors(specialization) {
      this.specializationClicked = true
      this.pickedSpecialist = specialization;
      await axios
        .get("/api/admin")
        .then((response) => (this.doctorList = response.data.filter((x) => x.specialist.find(x => x === specialization) && x.schedule != "" && x.schedule.find(x => new Date(x.date).getTime() > new Date().getTime()))));
    },
    viewSpecializations() {
      this.specializationClicked = false
    },
    async pickDoctor(id, schedule) {
      store.commit("userID", id);
      store.commit("doctorSched", schedule);
      store.commit("statusAvailability", true);
      store.commit("hospitalName", this.hospitalDetails.hospital);
      await this.$router.push(`/user/${this.patientDetails.username}/registration`);
    },
  },
};
</script>

<style>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.doctorContainer {
  width: 50% !important;
}
@media (max-width: 991.98px) {
  .doctorContainer {
    width: 97% !important;
  }
}
</style>