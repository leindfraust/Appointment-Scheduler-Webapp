<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="container has-text-centered animate__animated animate__fadeInLeft">
          <div class="box" style="width: 35%; margin: auto">
            <div class="notification is-success" v-if="newAccount">Your account has been successfully created.</div>
            <!--<div class="notification is-info has-text-left">
              Are you one of our doctors? Click
              <a href="/doctor/login">here</a>.
            </div> -->
            <br />
            <h1 class="title has-text-info has-text-centered">MEDIC SEARCH</h1>
            <div class="field">
              <div class="control">
                <input class="input is-rounded" type="text" v-model="username" placeholder="username"
                  @keyup.enter="login" required />
              </div>
              <div class="control" style="margin-top: 2%">
                <input class="input is-rounded" type="password" v-model="password" placeholder="password"
                  @keyup.enter="login" required />
              </div>
              <h1 v-if="incorrectUserPass" class="subtitle has-text-danger">{{ validateMessage }}</h1>
              <h1 v-else-if="incorrectUserPass == false" class="subtitle has-text-danger">{{ validateMessage }}</h1>
              <button type="button" class="button is-info is-rounded" @click="login">Login</button>
              <br />
              <br />
              <a href="/user/signup">Create an account</a>
            </div>
            <ForgotPassword :userType="'patient'" :forgotPasswordPromptCount="forgotPasswordCount" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import store from '../../store'
import ForgotPassword from '../../components/ForgotPassword.vue'

export default {
  username: "UserLogin",
  components: {
    ForgotPassword
  },
  data() {
    return {
      username: null,
      password: null,
      userPatient: null,
      validateMessage: null,
      incorrectUserPass: Boolean,
      newAccount: false,
      forgotPasswordCount: 0
    }
  },
  async mounted() {
    if (this.$store.state.accountCreated == true) {
      this.newAccount = true
      await this.$store.commit('accountCreated', false)
    }
  },
  async beforeCreate() {
    await axios.get("/session/patient").then(async response => {
      if (typeof response.data.username !== 'undefined') {
        this.$store.commit("patientUsername", response.data.username)
        this.$store.commit("patientID", response.data._id)
        await this.$router.push(`/user/${this.$store.state.patientUsername}`);
      }
    })
  },
  methods: {
    async login() {
      if (this.username == null || this.password == null) {
        this.incorrectUserPass = false;
        this.validateMessage = "empty username or password";
        this.username = null
        this.password = null
      } else {
        await axios
          .post("/api/auth/patient", {
            username: this.username,
            password: this.password
          })
          .then(
            async (response) => {
              this.userPatient = await response.data
              // if username and password matched to a user
              if (await this.userPatient) {
                await axios.post("/session/patient", {
                  _id: this.userPatient._id,
                  name: this.userPatient.name,
                  email: this.userPatient.gmail,
                  username: this.username,
                  province: this.userPatient.province,
                  city: this.userPatient.city,
                  currentAddress: this.userPatient.currentAddress
                });
                store.commit("patientUsername", this.userPatient.username)
                store.commit("patientID", this.userPatient._id)
                await this.$router.push(`/user/${this.userPatient.username}`);
              } else {
                this.forgotPasswordCount = this.forgotPasswordCount + 1
                this.validateMessage = "Incorrect username or password";
                this.incorrectUserPass = true;
                this.username = null;
                this.password = null;
              }
            }
          );
      }
    },
  }
}
</script>
<style scoped>
.hero {
  background: no-repeat center url('../../assets/images/background-login.png');
  background-size: cover;
}

@media (max-width: 991.98px) {
  .box {
    width: 100% !important;
  }
}
</style>