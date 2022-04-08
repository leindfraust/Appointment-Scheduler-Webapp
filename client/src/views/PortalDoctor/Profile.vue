<template>
  <div style="overflow-x: hidden; height: 100vh; background-color: whitesmoke;">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column" style="background-color: whitesmoke;">
        <section class="section" style="background-color: whitesmoke;">
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
            <div class="columns is-gapless">
              <div class="column is-6">
                <span id="profile-img" v-html="profileImg"></span>
                <form
                  id="formUpload"
                  action="/api/imgUpload"
                  method="post"
                  enctype="multipart/form-data"
                  style="margin: auto; width: 50%"
                  class="field"
                >
                  <div class="control">
                    <input type="hidden" name="alias" :value="(alias)" />
                    <input class="input" type="file" name="imgFile" @click="imgSuccess" required />
                    <div class="has-text-centered">
                      <button
                        type="submit"
                        value="Upload"
                        class="button is-primary"
                      >Change profile picture</button>
                    </div>
                  </div>
                </form>
              </div>
              <br />
              <div class="column">
                <div class="field">
                  <div class="control">
                    <label class="label">
                      <b>License No.</b>
                    </label>
                    <input
                      class="input"
                      type="text"
                      v-model="licenseNo"
                      style="width: 33%"
                      :disabled="verified == true"
                    />
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <label class="label">
                          <b>Full Name:</b>
                        </label>
                        <input
                          class="input"
                          size="5"
                          type="text"
                          v-model="fullname"
                          :disabled="verified == true"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <label class="label">
                          <b>Gmail:</b>
                        </label>
                        <input
                          class="input"
                          size="5"
                          type="text"
                          v-model="gmail"
                          :disabled="verified == true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button
                      v-if="!verified"
                      class="button is-link"
                      type="button"
                      @click="updateInfo"
                    >Save changes</button>
                    <div
                      v-if="infoValidate"
                      class="notification is-success is-light"
                    >{{ infoValidateMessage }}</div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <label class="label">
                      <b>Managed Hospitals:</b>
                    </label>
                    <button class="button" v-for="hospitals in hospitalOrigin">
                      {{ hospitals.hospital }}&nbsp;
                      <span
                        class="has-text-danger"
                        @click="pullHospital(hospitals.hospital)"
                      >x</span>
                    </button>&nbsp;
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdownHospital }">
                      <div class="dropdown-trigger">
                        <button @click="dropdownHospital" class="button">+</button>
                      </div>
                      <div class="dropdown-menu">
                        <div
                          class="dropdown-content"
                          v-for="(hospitals, index) in hospitalList"
                          :key="index"
                        >
                          <a
                            class="dropdown-item"
                            @click="promptVerificationHospital(hospitals.hospital)"
                          >{{ hospitals.hospital }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <label class="label">
                      <b>Specializations:</b>
                    </label>
                    <button
                      class="button"
                      style="margin: 5px"
                      v-for="(specializations, index) in specialist"
                      :key="index"
                    >
                      {{ specializations }}&nbsp;
                      <span
                        class="has-text-danger"
                        @click="pullSpecialization(specializations)"
                      >x</span>
                    </button>&nbsp;
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdownSpecialist }">
                      <div class="dropdown-trigger">
                        <button @click="dropdownSpecialist" class="button">+</button>
                      </div>
                      <div class="dropdown-menu">
                        <div
                          class="dropdown-content"
                          v-for="(specialist, index) in specializationList"
                          :key="index"
                        >
                          <a
                            class="dropdown-item"
                            @click="addSpecialization(specialist)"
                          >{{ specialist }}</a>
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
              <div class="field box" v-if="!codeSent">
                <label class="label">Please check your email for the verification code.</label>
                <div class="control">
                  <input class="input" v-model="verificationCode" type="text" placeholder="code" />
                </div>
                <br />
                <div class="has-text-centered">
                  <button
                    class="button is-primary"
                    @click="addHospital"
                    :disabled="verificationCode == ''"
                  >Confirm</button>
                </div>
                <div
                  v-if="errorCode"
                  class="notification is-danger"
                >Invalid login code, please check your email thoroughly.</div>
              </div>
              <div
                class="notification is-danger"
                v-else
              >You can only request a verification code once, please try again in 10 minutes.</div>
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
import cld from '../../cloudinary'
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
      isActiveDropdownHospital: false,
      licenseNo: null,
      verified: null,
      codes: [],
      modalActive: false,
      verificationCode: '',
      errorCode: false,
      codeSent: false,
      selectedHospital: ''
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
    imgSuccess() {
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
    dropdownHospital() {
      this.isActiveDropdownHospital = !this.isActiveDropdownHospital
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
    async promptVerificationHospital(hospital) {
      if (!this.hospitalOrigin.find(x => x.hospital === hospital)) {
        this.selectedHospital = hospital
        this.modalActive = true
        let randomCode = Math.floor(1000 + Math.random() * 9000);
        await axios.get('/api/code').then(response => this.codes = response.data)
        let confirmCode = await this.codes.find(x => x.code === randomCode)
        let confirmEmail = await this.codes.filter(x => x.email === this.gmail)
        console.log(await this.codes)
        if (await this.codes.length === 0) {
          await axios.post("/api/code", {
            email: this.gmail,
            code: randomCode
          });
          await axios.post('/api/OTPMail', {
            email: this.gmail,
            code: randomCode
          });
        } else if (typeof confirmCode === 'undefined' && Object.keys(confirmEmail).length === 0) {
          await axios.post("/api/code", {
            email: this.gmail,
            code: randomCode
          });
          await axios.post('/api/OTPMail', {
            email: this.gmail,
            code: randomCode
          });
        } else {
          this.codeSent = true
        }
      }
    },
    async addHospital() {
      await axios.get('/api/code').then(response => this.codes = response.data)
      console.log(await this.codes)
      let confirmCode = await this.codes.find(x => x.code == this.verificationCode && x.email == this.gmail)
      if (!this.errorCode) {
        if (await confirmCode) {
          this.hospitalOrigin.push({
            hospital: this.selectedHospital
          });
          await axios.put(`/api/doctor/${this.id}`, {
            hospitalOrigin: this.hospitalOrigin
          });
          await axios.put('/session/doctor', {
            hospitalOrigin: this.hospitalOrigin
          });
          await axios.get('/session/doctor').then(response => this.hospitalOrigin = response.data.hospitalOrigin)
          this.selectedHospital = ''
          this.modalActive = false
        } else {
          this.errorCode = true
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
#profile-img {
  display: block;
  margin: auto;
  width: 50%;
}
.dropdown-menu {
  max-height: 12em;
  overflow: auto;
}
@media (max-width: 991.98px) {
  #profile-image {
    width: 100% !important;
  }
  form {
    width: 100% !important;
  }
  .input {
    width: 100% !important;
  }
}
</style>