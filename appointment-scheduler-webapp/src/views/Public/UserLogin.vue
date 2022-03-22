<template>
  <NavigationTabVue />
  <section class="section is-medium">
    <div
      class="container has-text-centered animate__animated animate__fadeInLeft"
    >
      <div class="box" style="width: 40%; margin: auto">
        <p
          class="notification is-success"
          v-if="newAccount"
        >Your account has been successfully created.</p>
        <br />
        <p class="subtitle has-text-info has-text-left">Login to make an appointment.</p>
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="username" placeholder="username" required />
          </div>
          <div class="control" style="margin-top: 2%">
            <input class="input" type="password" v-model="password" placeholder="password" required />
          </div>
          <h1 v-if="incorrectUserPass" class="subtitle has-text-danger">{{ validateMessage }}</h1>
          <h1
            v-else-if="incorrectUserPass == false"
            class="subtitle has-text-danger"
          >{{ validateMessage }}</h1>
          <button type="button" class="button is-primary" @click="login">Login</button>
          <br />
          <br />
          <h1 class="subtitle">OR</h1>
          <a href="/user/signup">Create an account</a>
        </div>
        <p class="notification is-info">
          Are you one of our doctors? Click
          <a href="/admin/login">here</a>
        </p>
        <ForgotPassword :userType="'user'"/>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import store from '../../store'
import NavigationTabVue from '../../components/NavigationTab.vue'
import ForgotPassword from '../../components/ForgotPassword.vue'
import socket from '../../socket'

export default {
  username: "UserLogin",
  components: {
    NavigationTabVue,
    ForgotPassword
  },
  data() {
    return {
      username: null,
      password: null,
      userPatient: null,
      validateMessage: null,
      incorrectUserPass: Boolean,
      newAccount: false
    }
  },
  async mounted() {
    if (this.$store.state.accountCreated == true) {
      this.newAccount = true
      await this.$store.commit('accountCreated', false)
    }
    await axios
      .get("/session/patient")
      .then(
        (response) =>
          (this.userPatient = response.data)
      );
    if (await this.userPatient.username) {
      socket.connect()
      this.$store.commit("patientUsername", this.userPatient.username)
      this.$store.commit("patientID", this.userPatient._id)
      await this.$router.push(`/user/${this.userPatient.username}`);
    }
  },
  methods: {
    async login() {
      if (this.username == null && this.password == null) {
        this.incorrectUserPass = false;
        this.validateMessage = "empty username or password";
      } else {
        await axios
          .get("/api/user")
          .then(
            (response) =>
            (this.userPatient = response.data.find(
              (item) =>
                item.username == this.username &&
                item.password == this.password
            ))
          );
        // if username and password matched to a user
        if (await this.userPatient) {
          socket.connect();
          store.commit("patientUsername", this.userPatient.username)
          store.commit("patientID", this.userPatient._id)
          await this.$router.push(`/user/${this.userPatient.username}`);
          await axios.post("/session/patient", {
            _id: this.userPatient._id,
            name: this.userPatient.name,
            email: this.userPatient.gmail,
            username: this.username,
            province: this.userPatient.province,
            city: this.userPatient.city,
            currentAddress: this.userPatient.currentAddress
          });
        } else {
          this.validateMessage = "Incorrect username or password";
          this.incorrectUserPass = true;
          this.username = null;
          this.password = null;
        }
      }
    },
  }
}
</script>
<style scoped>
.section {
  background-color: whitesmoke;
}
@media (max-width: 991.98px) {
  .box {
    width: 100% !important;
  }
}
</style>