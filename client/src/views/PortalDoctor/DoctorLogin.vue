<template>
  <section class="hero is-fullheight">
    <div class="hero-body animate__animated animate__fadeInLeft">
      <div class="box has-text-centered" style="margin: auto">
        <div class="container is-fluid" style="width: 100%; margin: auto">
          <form style="margin-top: 5%">
            <div class="field">
              <h1 class="title has-text-link has-text-left">Nice to see you Doc.</h1>
              <div class="control">
                <input class="input is-rounded" type="text" v-model="username" placeholder="username"
                  @keyup.enter="login" required />
              </div>
            </div>
            <div class="field">
              <div class="control" style="margin-top: 2%">
                <input class="input is-rounded" type="password" v-model="password" placeholder="password"
                  @keyup.enter="login" required />
              </div>
            </div>
            <p v-if="incorrectUserPass" class="has-text-danger" style="margin-top: 5%">{{ validateMessage }}</p>
            <p v-else-if="incorrectUserPass == false" class="has-text-danger" style="margin-top: 5%">{{ validateMessage
            }}</p>
            <button type="button" class="button is-rounded is-link" @click="login">Login</button>
            <hr />
            <a @click="signup" class="is-danger">Create an account</a>
          </form>
        </div>
        <ForgotPassword :userType="'doctor'" :forgotPasswordPromptCount="forgotPasswordCount" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ForgotPassword from "../../components/ForgotPassword.vue";
export default {
  name: "LoginDoctor",
  component: ForgotPassword,
  data() {
    return {
      username: null,
      password: null,
      userDoctor: null,
      incorrectUserPass: Boolean,
      validateMessage: "",
      specializations: null,
      forgotPasswordCount: 0
    };
  },
  async beforeCreate() {
    await axios.get("/session/doctor").then(async response => {
      if (typeof response.data.alias !== 'undefined') {
        this.$store.commit("alias", response.data.alias);
        this.$store.commit("doctorID", response.data._id);
        this.$store.commit("doctorName", response.data.fullname);
        await this.$router.push(`/doctor/${this.$store.state.alias}/appointments`);
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
          .post("/api/auth/doctor", {
            username: this.username,
            password: this.password
          })
          .then(
            async (response) => {
              this.userDoctor = await response.data
              // if username and password matched to a user
              if (await this.userDoctor) {
                await axios.post("/session/doctor", {
                  verified: this.userDoctor.verified,
                  _id: this.userDoctor._id,
                  licenseNo: this.userDoctor.licenseNo,
                  alias: this.userDoctor.alias,
                  fullname: this.userDoctor.name,
                  specialist: this.userDoctor.specialist,
                  gmail: this.userDoctor.gmail,
                  hospitalOrigin: this.userDoctor.hospitalOrigin,
                  schedule: this.userDoctor.schedule,
                  username: this.userDoctor.username,
                  messageHistory: this.userDoctor.messageHistory,
                  appointmentCategories: this.userDoctor.appointmentCategories,
                  paymentMethods: this.userDoctor.paymentMethods
                });
                this.$store.commit("alias", this.userDoctor.alias);
                this.$store.commit("doctorID", this.userDoctor._id);
                this.$store.commit("doctorName", this.userDoctor.name);
                await this.$router.push(`/doctor/${this.userDoctor.alias}/appointments`);
              }
              else {
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
    async signup() {
      await this.$router.push("/doctor/signup");
    },
  },
  components: { ForgotPassword }
};
</script>

<style scoped>
.hero {
  background: linear-gradient(105.07deg, #FFFFFF 0%, #DAE6FE 51.43%, #FFFFFF 99.75%);
}

@media (max-width: 991.98px) {
  .customField {
    width: 100% !important;
  }

  .card {
    width: 100% !important;
  }
}
</style>