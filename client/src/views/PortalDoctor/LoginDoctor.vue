<template>
  <section class="hero is-fullheight">
    <div class="hero-body animate__animated animate__fadeInLeft">
      <div class="box has-text-centered" style="margin: auto">
        <div class="container is-fluid" style="width: 100%; margin: auto">
          <form class="field" style="margin-top: 5%">
            <h1 class="title has-text-link has-text-left">Nice to see you Doc.</h1>
            <div class="control">
              <input class="input" type="text" v-model="username" placeholder="username" @keyup.enter="login"
                required />
            </div>
            <div class="control" style="margin-top: 2%">
              <input class="input" type="password" v-model="password" placeholder="password" @keyup.enter="login"
                required />
            </div>
            <p v-if="incorrectUserPass" class="has-text-danger" style="margin-top: 5%">{{ validateMessage }}</p>
            <p v-else-if="incorrectUserPass == false" class="has-text-danger" style="margin-top: 5%">{{ validateMessage
            }}</p>
            <button type="button" class="button is-primary" @click="login">Login</button>
            <hr />
            <h1 class="title">Or</h1>
            <a @click="signup" class="is-danger">Create an account</a>
          </form>
        </div>
        <ForgotPassword :userType="'doctor'" />
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../store";
import axios from "axios";
import cld from "../../cloudinary"
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
      profileImg: null
    };
  },
  async mounted() {
    await axios
      .get("/session/doctor")
      .then((response) => (this.userDoctor = response.data));
    if (await this.userDoctor.alias) {
      store.commit("alias", this.userDoctor.alias);
      store.commit("doctorID", this.userDoctor._id);
      store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userDoctor.alias}.jpg`).toHtml());
      await this.$router.push(`/doctor/user/${this.userDoctor.alias}`);
    }
  },
  methods: {
    async login() {
      if (await this.username == null || this.password == null) {
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
            (response) =>
              (this.userDoctor = response.data)
          );
        // if username and password matched to a user
        if (await this.userDoctor) {
          store.commit("alias", this.userDoctor.alias);
          store.commit("doctorID", this.userDoctor._id);
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
            messageHistory: this.userDoctor.messageHistory
          });
          store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userDoctor.alias}.jpg`).toHtml());
          await this.$router.push(`/doctor/user/${this.userDoctor.alias}`);
        }
        else {
          this.validateMessage = "Incorrect username or password";
          this.incorrectUserPass = true;
          this.username = null;
          this.password = null;
        }
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
  background-color: whitesmoke !important;
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