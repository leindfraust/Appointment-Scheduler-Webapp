<template>
  <NavigationTab />
  <div class="modal" :class="{ 'is-active': isDoctorLoading }">
    <div class="modal-background"></div>
    <div class="modal-content" style="overflow: hidden">
      <div class="loader" style="margin: auto;"></div>
    </div>
  </div>
  <section class="section">
    <div class="columns">
      <div class="column">
        <div class="container box" v-if="hospitalDetails">
          <h1 class="title">{{ hospitalDetails.hospital }}</h1>
          <p class="subtitle">📌 {{ hospitalDetails.barangayORStreet }}, {{ hospitalDetails.city }}, {{
              hospitalDetails.province
          }}</p>
          <p class="subtitle is-6">{{ hospitalDetails.details[0].description }}</p>
          <figure class="image is-16by9">
            <img
              :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/managers/${hospitalDetails.hospital}.jpg`" />
          </figure>
          <br />
          <div class="columns">
            <div class="column">
              <iframe
                :src="`https://maps.google.com/maps?q=${hospitalDetails.location.coordinates[1]},${hospitalDetails.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"></iframe>
            </div>
            <div class="column">
              <p class="subtitle">Contacts:</p>
              <ul class="block" v-if="typeof hospitalDetails.details[0].contacts !== 'undefined'">
                <li v-for="contacts in hospitalDetails.details[0].contacts" :key="contacts.contact">{{ contacts.contact
                }}</li>
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
              <a class="has-text-link" @click="getDoctors('General Practitioner')">General Practitioner</a>.
            </p>
            <div class="columns is-multiline is-mobile" v-if="!specializationClicked">
              <div class="column is-4" v-for="(specialist, index) in specialistList" :key="index">
                <a @click="getDoctors(specialist.specialist)">
                  <figure class="image is-4by3" v-if="specialist.specialist !== 'General Practitioner'">
                    <img :src="`https://ui-avatars.com/api/?name=${specialist.specialist}`
                    " />
                  </figure>
                  <p class="subtitle has-text-centered" v-if="specialist.specialist !== 'General Practitioner'">{{
                      specialist.specialist
                  }}</p>
                </a>
              </div>
            </div>
            <div class="container" v-else>
              <button class="button" @click="viewSpecializations">⬅️ Specializations</button>
              <div v-if="doctorList == ''">
                <br />
                <p class="subtitle has-text-centered">No doctors are currently available in this specialization.</p>
              </div>
              <div v-else>
                <br />
                <h1 class="title is-3">Choose a doctor:</h1>
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" v-model="doctorSearchBar" placeholder="Search..." />
                  </div>
                </div>
              </div>
              <div v-if="specializationClicked">
                <div v-if="Object.keys(doctorSearch).length !== 0">
                  <div class="card-content" v-for="doctors in doctorSearch" :key="doctors._id">
                    <div class="media">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img
                            :src="`http://res.cloudinary.com/leindfraust/image/upload/v1/assets/doctors/${doctors.alias}.jpg`" />
                        </p>
                      </figure>
                      <div class="media-content">
                        <p class="title is-4">{{ doctors.name }}</p>
                        <p class="subtitle is-6">{{ pickedSpecialist }}</p>
                        <button class="button" @click="pickDoctor(doctors)">Appoint</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="doctorList != ''" class="notification is-info">No such doctor is available right now.</div>
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
      hospitalDetails: this.$store.state.hospitalDetails,
      patientDetails: null,
      doctorList: null,
      specialistList: this.$store.state.hospitalDetails.specializations.sort(),
      pickedSpecialist: null,
      specializationClicked: false,
      doctorSearchBar: '',
      isDoctorLoading: false
    };
  },
  async mounted() {
    await axios
      .get("/session/patient")
      .then(response => this.patientDetails = response.data);
  },
  computed: {
    doctorSearch() {
      if (this.doctorList) {
        return this.doctorList.filter(x => x.name.toLowerCase().includes(this.doctorSearchBar.toLowerCase()))
      } else {
        return false
      }
    }
  },
  methods: {
    async getDoctors(specialization) {
      this.doctorSearchBar = ''
      this.isDoctorLoading = true
      this.specializationClicked = true
      this.pickedSpecialist = specialization;
      await axios.post("/api/checkDoctorAvailability", {
        hospital: this.hospitalDetails.hospital,
        specialist: specialization
      }).then(response => response ? this.doctorList = response.data.filter(x => x.schedule.find(x => new Date(x.date).getTime() > new Date().getTime())) : this.doctorList = '').catch(err => console.log(err))
      this.isDoctorLoading = false
    },
    viewSpecializations() {
      this.specializationClicked = false
    },
    async pickDoctor(details) {
      store.commit("doctorDetails", details);
      store.commit("statusAvailability", true);
      store.commit("hospitalName", this.hospitalDetails.hospital);
      await this.$router.push(`/user/${this.patientDetails.username}/registration`);
    },
  },
};
</script>

<style scoped>
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

.loader {
  border: 7px solid #f3f3f3;
  border-radius: 50%;
  border-top: 7px solid gray;
  border-bottom: 7px solid gray;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 991.98px) {
  #notification {
    width: 100% !important;
  }

  #hospital {
    margin-bottom: 15% !important;
  }
}
</style>