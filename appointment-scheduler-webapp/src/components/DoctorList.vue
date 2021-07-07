<template>
  <div class="card container" style="width: 50%">
    <div class="block">
      <div class="card-image">
        <div class="columns">
          <div class="column" v-for="specialist in specialistList" :key="specialist._id">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
            <h1 class="subtitle has-text-centered">{{ specialist.specialist }}</h1>
          </div>
        </div>
      </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorList",

  data() {
    return {
      image: "../assets/doctors/Timay.jpg",
      doctorList: null,
      specialistList: null,
    };
  },
  async mounted() {
    axios
      .get("/api/admin")
      .then((response) => (this.doctorList = response.data));

    await axios
      .get('/api/admin')
      .then((response) => (this.specialistList = response.data));

    this.getSpeciaList();
  },
  methods: {
    getSpeciaList() {
      let specialist = this.specialistList;

      let specialNew = [] 
      specialist.forEach((e) => {
        if (!specialNew.includes(e)) {
          specialNew.push(e)
        }
      });
      console.log(specialNew)
    },
  },
};
</script>

<style>
</style>