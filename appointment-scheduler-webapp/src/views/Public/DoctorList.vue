<template>
  <div class="card container doctorContainer">
    <div class="block">
      <div class="card-image">
        <div class="columns is-mobile">
          <div class="column" v-for="specialist in specialistList" :key="specialist._id">
            <a @click="getDoctors(specialist.specialization)">
              <figure class="image is-4by3">
                <img
                  :src="
                    require(`../../assets/specialization/${specialist.specialization}.jpg`)
                  "
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div class="card-content" v-for="doctors in doctorList" :key="doctors._id">
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
            <button class="button" @click="messageDoctor(doctors._id, doctors.alias)">Message</button>
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
    await axios
      .get("/api/specialistList")
      .then((response) => (this.specialistList = response.data));
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
            (x) => x.specialist === specialization && x.schedule != ""
          ))
        );
    },
    async pickDoctor(id, schedule) {
      store.commit("userID", id);
      store.commit("doctorSched", schedule);
      store.state.statusAvailability = true;
      await this.$router.push(`/user/${this.patientDetails.username}/registration`);
    },
    async messageDoctor(id, alias) {
      let roomID = this.patientDetails._id + "-room-" + id
      await axios.get("/api/chatrooms").then(response => this.checkRooms = response.data.find(x => x.roomID === roomID))
      if (await this.checkRooms) {
        await this.$router.push(`/user/${this.patientDetails.username}/chatnow`)
      } else {
        await axios.post("/api/chatrooms", {
          roomID: this.patientDetails._id + "-room-" + id,
          patient: this.patientDetails._id,
          doctor: id,
          patientName: this.patientDetails.username,
          doctorName: alias
        }); 
      } 
      store.commit("userType", "patient")
      await this.$router.push('/chatnow')
    }
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