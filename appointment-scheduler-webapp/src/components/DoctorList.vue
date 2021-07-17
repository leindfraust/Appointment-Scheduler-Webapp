<template>
  <div class="card container doctorContainer">
    <div class="block">
      <div class="card-image">
        <div class="columns is-mobile">
          <div class="column" v-for="specialist in specialistList" :key="specialist._id">
            <a @click="getDoctors(specialist.specialization)"><figure class="image is-4by3">
              <img
                :src="require(`../assets/specialization/${specialist.specialization}.jpg`)"
              />
            </figure></a>
          </div>
        </div>
      </div><hr>
      <div class="card-content" v-for="doctors in doctorList" :key="doctors._id">
        <div class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img
                :src="require(`../assets/doctors/${doctors.alias}` + '.jpg')"
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
import store from '../store'

export default {
  name: "DoctorList",

  data() {
    return {
      doctorList: null,
      specialistList: null,
    };
  },
  async mounted() {
    await axios
      .get('/api/specialistList')
      .then((response) => (this.specialistList = response.data));
  },
  methods: {
    getDoctors(specialization) {
    axios
      .get('/api/admin')
      .then((response) => (this.doctorList = response.data.filter(x => x.specialist === specialization && x.schedule != '')));
    },
    async pickDoctor(id, schedule) {
      store.commit("userID", id)
      store.commit("doctorSched", schedule)
      store.state.statusAvailability = true
      await this.$router.push('/registration')
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