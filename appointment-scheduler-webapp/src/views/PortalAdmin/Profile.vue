<template>
  <div class="columns" style="height: 100vh; background-color: whitesmoke">
    <div class="column is-2" style="background-color: whitesmoke;">
      <AdminMenu />
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
                  <button v-if="!verified"
                    class="button is-link"
                    type="button"
                    @click="updateInfo"
                  >Save changes</button>
                  <div v-if="infoValidate" class="notification is-success is-light">{{ infoValidateMessage }}</div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">
                    <b>Managed Hospitals:</b>
                  </label>
                  <button
                    class="button"
                    v-for="hospitals in hospitalOrigin"
                    style="pointer-events: none;"
                  >{{ hospitals.hospital }}</button>&nbsp;
                  <button class="button">+</button>
                  <!-- Need to be discussed if the doctor has to request before pushing his/her name in the doctor list of the hospital/manager-->
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
                  <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                    <div class="dropdown-trigger">
                      <button @click="dropdown" class="button">+</button>
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
      </section>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
import cld from '../../cloudinary'
import AdminMenu from "../../components/AdminMenu.vue";

export default {
  name: "AdminProfile",
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
      gmail: null,
      specializationList: this.$store.getters.getSpecializationList,
      isActiveDropdown: false,
      licenseNo: null,
      verified: null
    };
  },
  components: {
    AdminMenu
  },
  async mounted() {
    await axios.get("/session/admin").then(response => this.doctorDetails = response.data)
    console.log(await this.doctorDetails)
    this.verified = await this.doctorDetails.verified
    this.licenseNo = await this.doctorDetails.licenseNo
    this.fullname = await this.doctorDetails.fullname
    this.id = await this.doctorDetails._id
    this.specialist = await this.doctorDetails.specialist
    this.gmail = await this.doctorDetails.gmail
    this.hospitalOrigin = await this.doctorDetails.hospitalOrigin
  },
  methods: {
    async updateInfo() {
      if (!this.verified) {
        await axios.put(`/api/admin/${this.id}`, {
          licenseNo: this.licenseNo,
          name: this.fullname,
          gmail: this.gmail
        })
        await axios.put("/session/admin", {
          licenseNo: this.licenseNo,
          name: this.fullname,
          gmail: this.gmail
        })
        await axios
          .get("/session/admin")
          .then((response) => (this.fullname = response.data.fullname));

        this.infoValidate = true
        this.infoValidateMessage = "changes saved successfully"
      }
    },
    imgSuccess() {
      store.state.imgSuccess = true
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
    dropdown() {
      this.isActiveDropdown = !this.isActiveDropdown
    },
    async addSpecialization(specialist) {
      if (!this.specialist.find(x => x === specialist)) {
        this.specialist.push(specialist)
        this.isActiveDropdown = false
        await axios.put(`/api/admin/${this.id}`, {
          specialist: this.specialist
        });
        await axios.put('/session/admin', {
          specialist: this.specialist
        });
        await axios.get('/session/admin').then(response => this.specialist = response.data.specialist)
      }
    },
    async pullSpecialization(specialization) {
      this.specialist = this.specialist.filter(x => x !== specialization)
      await axios.put(`/api/admin/${this.id}`, {
        specialist: this.specialist
      });
      await axios.put('/session/admin', {
        specialist: this.specialist
      });
      await axios.get('/session/admin').then(response => this.specialist = response.data.specialist)
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