<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column">
        <section class="section">
          <h1 class="title">PROFILE</h1>
          <div class="container box is-fluid">
            <article class="message is-danger" v-if="!verified">
              <div class="message-header">
                <p>YOU ARE NOT VERIFIED ❌</p>
              </div>
              <div class="message-body">
                To get started, please visit
                <b>Security</b> tab under
                <b>VERIFICATION AND INFORMATION.</b>
              </div>
            </article>
            <article class="message is-success" v-if="verified">
              <div class="message-header">
                <p>YOU ARE VERIFIED ✓</p>
              </div>
              <div class="message-body">
                Your basic information is
                <b>locked</b>. To edit, please go to the
                <b>Security</b> tab.
              </div>
            </article>
            <div class="columns">
              <div class="column is-4">
                <form id="formUpload" action="/api/imgUpload" method="post" enctype="multipart/form-data">
                  <figure class="image image-outer is-square">
                    <img class="is-rounded image-inner" v-if="imgPreviewFile" :src="imgPreviewFile" />
                    <img class="is-rounded image-inner" v-else
                      :src="`http://res.cloudinary.com/leindfraust/image/upload/v1/assets/doctors/${alias}.jpg`">
                    <div class="buttons is-hidden-mobile" style="bottom: 5%; right: 10%; position: absolute">
                      <label for="file-input" style="cursor: pointer"><a class="button is-medium is-responsive"><i
                            class="fa-solid fa-camera"></i>
                        </a></label>
                    </div>
                    <div class="buttons is-hidden-desktop" style="bottom: 15%; left:75%; position: absolute">
                      <label for="file-input" style="cursor: pointer"><a class="button is-medium is-responsive"><i
                            class="fa-solid fa-camera"></i>
                        </a></label>
                    </div>
                  </figure>
                  <div class="control">
                    <input type="hidden" name="alias" :value="(alias)" />
                    <input class="input is-hidden" id="file-input" type="file" name="imgFile"
                      @change="handleFile($event)" required />
                  </div>
                  <div class="buttons is-centered" v-if="fileReady">
                    <button type="button" class="button"
                      @click="fileReady = false, imgPreviewFile = null">Cancel</button>
                    <button type="submit" value="Upload" class="button is-info">Upload Picture</button>
                  </div>
                </form>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">
                    <b>License No.</b>
                  </label>
                  <div class="control">
                    <input class="input" type="text" v-model="licenseNo" style="width: 33%"
                      :disabled="verified == true" />
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <label class="label">
                        <b>Full Name:</b>
                      </label>
                      <div class="control">
                        <input class="input" size="5" type="text" v-model="fullname" :disabled="verified == true" />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">
                        <b>Gmail:</b>
                      </label>
                      <div class="control">
                        <input class="input" size="5" type="text" v-model="gmail" :disabled="verified == true" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button v-if="!verified" class="button is-link" type="button" @click="updateInfo">Save
                      changes</button>
                    <div v-if="infoValidate" class="notification is-success is-light">{{ infoValidateMessage }}</div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">
                    <b>Managed Hospitals:</b>
                  </label>
                  <div class="control">
                    <div class="buttons">
                      <button class="button" v-for="hospitals in hospitalOrigin" :key="hospitals.hospital">
                        {{ hospitals.hospital }}&nbsp;
                        <span class="has-text-danger" @click="pullHospital(hospitals.hospital)">x</span>
                      </button>&nbsp;
                      <button @click="modalActive = !modalActive" class="button">+</button>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">
                    <b>Specializations:</b>
                  </label>
                  <div class="control">
                    <button class="button" style="margin: 5px" v-for="(specializations, index) in specialist"
                      :key="index">
                      {{ specializations }}&nbsp;
                      <span class="has-text-danger" @click="pullSpecialization(specializations)">x</span>
                    </button>&nbsp;
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdownSpecialist }">
                      <div class="dropdown-trigger">
                        <button @click="dropdownSpecialist" class="button">+</button>
                      </div>
                      <div class="dropdown-menu">
                        <div class="dropdown-content" v-for="(specialist, index) in specializationList" :key="index">
                          <a class="dropdown-item" @click="addSpecialization(specialist)">{{ specialist }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal" :class="{ 'is-active': modalActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
              <section class="section box">
                <div v-if="errorCode" class="notification is-danger">Invalid registration code.</div>
                <div v-if="duplicateHospital" class="notification is-warning">Hospital has already been registered</div>
                <div class="field">
                  <label class="label">Input the hospital's registration code.</label>
                  <div class="control">
                    <input class="input" v-model="registrationCode" type="text" placeholder="registration code" />
                  </div>
                  <br />
                  <div class="has-text-centered">
                    <button class="button is-info" @click="addHospital"
                      :disabled="registrationCode == ''">Confirm</button>
                  </div>
                </div>
              </section>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
import DoctorMenu from "../../components/DoctorMenu.vue";

export default {
  name: "DoctorProfile",
  data() {
    return {
      alias: store.state.alias,
      fullname: null,
      password: null,
      passwordRepeat: null,
      infoValidate: null,
      infoValidateMessage: null,
      doctorDetails: null,
      id: null,
      profileImg: store.state.profileImg,
      hospitalOrigin: null,
      specialist: null,
      hospital: null,
      gmail: null,
      specializationList: this.$store.getters.getSpecializationList,
      hospitalList: [],
      isActiveDropdownSpecialist: false,
      licenseNo: null,
      verified: null,
      modalActive: false,
      registrationCode: '',
      errorCode: false,
      duplicateHospital: false,
      codeSent: false,
      selectedHospital: '',
      fileReady: false,
      imgPreviewFile: null
    };
  },
  components: {
    DoctorMenu
  },
  async mounted() {
    await axios.get("/session/doctor").then(response => this.doctorDetails = response.data)
    this.verified = await this.doctorDetails.verified
    this.licenseNo = await this.doctorDetails.licenseNo
    this.fullname = await this.doctorDetails.fullname
    this.id = await this.doctorDetails._id
    this.specialist = await this.doctorDetails.specialist
    this.gmail = await this.doctorDetails.gmail
    this.hospitalOrigin = await this.doctorDetails.hospitalOrigin
    await axios.get('/api/manager').then(response => this.hospitalList = response.data)
  },
  methods: {
    async updateInfo() {
      if (!this.verified) {
        await axios.put(`/api/doctor/${this.id}`, {
          licenseNo: this.licenseNo,
          name: this.fullname,
          gmail: this.gmail
        })
        await axios.put("/session/doctor", {
          licenseNo: this.licenseNo,
          name: this.fullname,
          gmail: this.gmail
        })
        await axios
          .get("/session/doctor")
          .then((response) => (this.fullname = response.data.fullname));

        this.infoValidate = true
        this.infoValidateMessage = "changes saved successfully"
      }
    },
    handleFile(e) {
      this.imgPreviewFile = URL.createObjectURL(e.target.files[0])
      this.fileReady = true
      store.commit('imgSuccess', true)
    },
    showPass() {
      let passwordToggle = document.getElementsByClassName("password");
      for (let i = 0; i < passwordToggle.length; i++) {
        if (passwordToggle[i].type === "password") {
          passwordToggle[i].type = "text";
        } else {
          passwordToggle[i].type = "password";
        }
      }
    },
    dropdownSpecialist() {
      this.isActiveDropdownSpecialist = !this.isActiveDropdownSpecialist
    },
    async addSpecialization(specialist) {
      if (!this.specialist.find(x => x === specialist)) {
        this.specialist.push(specialist)
        this.isActiveDropdownSpecialist = false
        await axios.put(`/api/doctor/${this.id}`, {
          specialist: this.specialist
        });
        await axios.put('/session/doctor', {
          specialist: this.specialist
        });
        await axios.get('/session/doctor').then(response => this.specialist = response.data.specialist)
      }
    },
    async addHospital() {
      this.errorCode = false
      this.duplicateHospital = false
      await axios.post('/api/doctor/check_registrationCode', {
        registrationCode: this.registrationCode
      }).then(response => this.hospital = response.data)
      if (this.hospital) {
        if (this.hospitalOrigin.find(x => x.hospital == this.hospital.hospital)) {
          this.duplicateHospital = true
        } else {
          this.hospitalOrigin.push({ hospital: this.hospital.hospital })
          await axios.put(`/api/doctor/${this.id}`, {
            hospitalOrigin: this.hospitalOrigin
          });
          await axios.put('/session/doctor', {
            hospitalOrigin: this.hospitalOrigin
          });
          await axios.get('/session/doctor').then(response => this.hospitalOrigin = response.data.hospitalOrigin)
          this.modalActive = false
        }
      } else {
        this.errorCode = true
      }
    },
    async pullSpecialization(specialization) {
      this.specialist = this.specialist.filter(x => x !== specialization)
      await axios.put(`/api/doctor/${this.id}`, {
        specialist: this.specialist
      });
      await axios.put('/session/doctor', {
        specialist: this.specialist
      });
      await axios.get('/session/doctor').then(response => this.specialist = response.data.specialist)
    },
    async pullHospital(hospital) {
      this.hospitalOrigin = this.hospitalOrigin.filter(x => x.hospital !== hospital)
      await axios.put(`/api/doctor/${this.id}`, {
        hospitalOrigin: this.hospitalOrigin
      });
      await axios.put('/session/doctor', {
        hospitalOrigin: this.hospitalOrigin
      });
      await axios.get('/session/doctor').then(response => this.hospitalOrigin = response.data.hospitalOrigin)
    },
    modalClose() {
      this.modalActive = false
    }
  },
};
</script>

<style scoped>
.dropdown-menu {
  max-height: 12em;
  overflow: auto;
}
</style>