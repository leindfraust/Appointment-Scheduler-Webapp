<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <form class="field customField animate__animated animate__fadeInLeft">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="username"
              placeholder="username"
              required
            />
          </div>
          <div class="control" style="margin-top: 2%">
            <input
              class="input"
              type="password"
              v-model="password"
              placeholder="password"
              required
            />
          </div>
          <h1
            v-if="incorrectUserPass"
            class="subtitle has-text-danger"
            style="margin-top: 5%"
          >
            {{ validateMessage }}
          </h1>
          <h1
            v-else-if="incorrectUserPass == false"
            class="subtitle has-text-danger"
            style="margin-top: 5%"
          >
            {{ validateMessage }}
          </h1>
          <button type="button" class="button is-primary" @click="login">
            Login
          </button>
          <a class="signup button is-danger"
            >Sign Up</a
          >
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import store from '../../store'

export default {
  username: "UserLogin",
  data() {
    return {
      username: null,
      password: null,
      userPatient: null,
      validateMessage: null,
      incorrectUserPass: Boolean
    }
  },
  async mounted() {
    await axios
      .get("/session/patient")
      .then(
        (response) =>
          (this.userPatient = response.data)
      );
      if(await this.userPatient.username){
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
          store.commit("patientUsername", this.userPatient.username)
          store.commit("patientID", this.userPatient._id)
          await this.$router.push(`/user/${this.userPatient.username}`);
          await axios.post("/session/patient", {
            _id: this.userPatient._id,
            fullname: this.userPatient.name,
            username: this.username,
            password: this.password,
            province: this.userPatient.province,
            city: this.userPatient.city
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