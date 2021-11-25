<template>
  <div class="card container doctorContainer">
    <div class="block">
      <div class="card-image">
        <div class="columns is-mobile">
          <div class="column" v-for="specialist in specialistList" :key="specialist._id">
            <a @click="getDoctors(specialist.specialist)">
              <figure class="image is-4by3">
                <img
                  :src="
                    require(`../../assets/specialization/${specialist.specialist}.jpg`)
                  "
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div v-if="doctorList == ''">
        <p class="subtitle has-text-centered">No doctors are currently available in this specialization.</p>
      </div>
      <div  v-else class="card-content" v-for="doctors in doctorList" :key="doctors._id">
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
            <p class="subtitle is-6">{{ doctors.specialist }}</p>
            <button class="button" @click="pickDoctor(doctors._id, doctors.schedule)">Appoint</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import socket from "../../socket";
import store from "../../store";

export default {
  name: "DoctorList",

  data() {
    return {
      patientDetails: null,
      doctorList: null,
      specialistList: null,
      checkRooms: []
    };
  },
  async mounted() {
    //temporary 
    //needs to edit data GET to find hospital name, will be implemented in the future once main feature is ready
    await axios
      .get("/api/manager")
      .then((response) => this.specialistList = response.data[0].specializations);
    await axios
      .get("/session/patient")
      .then(response => this.patientDetails = response.data)
  },
  methods: {
    async getDoctors(specialization) {
      await axios
        .get("/api/admin")
        .then(
          (response) =>
          (this.doctorList = response.data.filter(
            (x) => x.specialist === specialization && x.schedule != '' && x.schedule.find(x => new Date(x.date).getTime() > new Date().getTime())
          ))
        );
    },
    async pickDoctor(id, schedule) {
      store.commit("userID", id);
      store.commit("doctorSched", schedule);
      store.commit("statusAvailability", true)
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