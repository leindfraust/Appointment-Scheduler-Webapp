<template>
  <NavigationTab />
  <div class="modal" :class="{ 'is-active': isDoctorLoading }">
    <div class="modal-background"></div>
    <div class="modal-content" style="overflow: hidden">
      <div class="loader" style="margin: auto;"></div>
    </div>
  </div>
  <section class="section" v-if="hospitalDetails.length !== 0">
    <CatchError :err-msg="errMsg" />
    <div class="columns">
      <div class="column" id="hospital-overview" style="border-right: 3px solid whitesmoke;">
        <div class="container is-fluid">
          <h1 class="title">{{ hospitalDetails.hospital }}</h1>
          <p class="subtitle">{{ hospitalDetails.barangayORStreet }}, {{ hospitalDetails.city }}, {{
              hospitalDetails.province
          }}</p>
          <p class="subtitle is-6">{{ hospitalDetails.details[0].description }}</p>
          <div class="content">
            <b>Type of Facility:</b> {{ hospitalDetails.type }}
            <span v-if="typeof hospitalDetails.details[0].contacts !== 'undefined'">
              <p class="subtitle is-6"><b>Contacts:</b> <span
                  v-for="(contacts, index) in hospitalDetails.details[0].contacts" :key="index">
                  {{ contacts.contact + ' ' }}</span></p>
            </span>
          </div>
          <br />
          <figure class="image is-16by9">
            <iframe class="has-ratio"
              :src="`https://maps.google.com/maps?q=${hospitalDetails.location.coordinates[1]},${hospitalDetails.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"></iframe>
          </figure>
        </div>
      </div>
      <div class="column">
        <div class="container">
          <div class="block">
            <div class="block" v-if="!specializationClicked">
              <h1 class="title">Pick a specialist.</h1>
              <p class="subtitle">
                Having trouble picking a specialist? Get appointed to a
                <a class="has-text-link" @click="getDoctors('General Practitioner')">General Practitioner</a>.
              </p>
            </div>
            <div class="columns is-multiline is-mobile" v-if="!specializationClicked">
              <div class="column is-6-mobile is-4-desktop" v-for="(specialist, index) in specialistList" :key="index">
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
              <a class="subtitle has-text-link" @click="specializationClicked = false" v-if="!typeClinic"><i
                  class="fa-solid fa-arrow-left"></i>
                Back</a>
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
              <br />
              <div v-if="specializationClicked">
                <div v-if="Object.keys(doctorSearch).length !== 0">
                  <div class="columns" v-for="doctors in doctorSearch" :key="doctors._id">
                    <div class="column">
                      <figure class="image is-square">
                        <img
                          :src="`http://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/doctors/${doctors.alias}.jpg`" />
                      </figure>
                    </div>
                    <div class="column is-5">
                      <div class="content">
                        <h5>{{ doctors.name }}</h5>
                        <p><span class="has-text-weight-semibold" v-if="pickedSpecialist">{{
                            pickedSpecialist
                        }}</span>
                          <span class="has-text-weight-semibold" v-else><span v-for="specialist in doctors.specialist"
                              :key="specialist">{{ specialist }} <br /></span></span>
                          <br />
                        </p>
                      </div>
                    </div>
                    <div class="column" style="margin-top: auto;">
                      <button class="button is-info is-rounded" @click="pickDoctor(doctors, pickedSpecialist)"
                        v-if="$store.state.patientID !== null">Book an
                        Appointment</button>
                    </div>
                  </div>
                  <div class="notification" v-if="$store.state.patientID == null">
                    <router-link :to="'/user/login'" class="has-text-weight-bold">Login</router-link> or <router-link
                      :to="'/user/signup'" class="has-text-weight-bold">create an
                      account</router-link> to make an appointment.
                  </div>
                  <hr>
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
import CatchError from "../../components/CatchError.vue";

export default {
  name: "DoctorList",
  components: {
    NavigationTab,
    CatchError
  },
  data() {
    return {
      errMsg: '',
      hospitalDetails: [],
      patientDetails: null,
      doctorList: null,
      specialistList: [],
      pickedSpecialist: null,
      specializationClicked: false,
      doctorSearchBar: '',
      isDoctorLoading: false,
      typeClinic: false
    };
  },
  async mounted() {
    if (this.$store.state.patientID !== null) {
      await axios
        .get("/session/patient")
        .then(response => this.patientDetails = response.data);
    }
    await axios.post(`/api/manager/${this.$route.params.hospital}`).then(response => {
      this.hospitalDetails = response.data
      this.specialistList = response.data.specializations.sort()
    });
    if (this.hospitalDetails.type == 'Clinic') {
      this.typeClinic = true
      this.getDoctors(undefined)
    }
    if (await this.$store.state.patientFilters.filterSpecialist) {
      await this.getDoctors('Allergists')
    }
  },
  computed: {
    doctorSearch() {
      if (this.doctorList) {
        return this.doctorList.filter(x => x.name.toLowerCase().includes(this.doctorSearchBar.toLowerCase())).slice().sort((a, b) => a.visits - b.visits).sort((a, b) => this.$store.state.patientFilters.filterDate ? new Date(a.schedule[0].date).getTime() - new Date(this.$store.state.patientFilters.filterDate).getTime() : a - b)
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
      }).then(response => response ? this.doctorList = response.data : this.doctorList = []).catch(err => this.errMsg = err)
      this.isDoctorLoading = false

      this.$store.commit("patientFilters", {}) // clear filters
    },
    async pickDoctor(details, specialization) {
      store.commit("pickedSpecialization", specialization)
      store.commit("doctorDetails", details);
      store.commit("statusAvailability", true);
      store.commit("hospitalName", this.hospitalDetails.hospital);
      if (this.$store.state.patientID !== null) {
        await this.$router.push(`/user/${this.patientDetails.username}/registration`);
      } else {
        await this.$router.push('/user/signup')
      }
    },
  },
};
</script>

<style scoped>
.section {
  background-color: white;
}

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

  #hospital-overview {
    padding: 0px !important;
  }
}
</style>