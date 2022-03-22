<template>
  <section class="hero is-fullheight">
    <div class="hero-body animate__animated animate__fadeInLeft">
      <div class="box has-text-centered " style="margin: auto">
        <div class="container is-fluid" style="width: 100%; margin: auto">
          <form class="field" style="margin-top: 5%">
            <h1 class="title has-text-link has-text-left">Nice to see you Doc.</h1>
            <div class="control">
              <input class="input" type="text" v-model="username" placeholder="username" required />
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
            <p
              v-if="incorrectUserPass"
              class="has-text-danger"
              style="margin-top: 5%"
            >{{ validateMessage }}</p>
            <p
              v-else-if="incorrectUserPass == false"
              class="has-text-danger"
              style="margin-top: 5%"
            >{{ validateMessage }}</p>
            <button type="button" class="button is-primary" @click="login">Login</button>
            <hr />
            <h1 class="title">Or</h1>
            <a @click="signup" class="is-danger">Create an account</a>
          </form>
        </div>
        <ForgotPassword :userType="'doctor'"/>
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
  name: "Login",
  component: ForgotPassword,
  data() {
    return {
      username: null,
      password: null,
      userAdmin: null,
      incorrectUserPass: Boolean,
      validateMessage: "",
      specializations: null,
      profileImg: null
    };
  },
  async mounted() {
    await axios
      .get("/session/admin")
      .then((response) => (this.userAdmin = response.data));
    if (await this.userAdmin.alias) {
      store.commit("alias", this.userAdmin.alias);
      store.commit("userID", this.userAdmin._id);
      store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userAdmin.alias}.jpg`).toHtml());
      await this.$router.push(`/admin/user/${this.userAdmin.alias}`);
    }
  },
  methods: {
    async login() {
      if (this.username == null && this.password == null) {
        this.incorrectUserPass = false;
        this.validateMessage = "empty username or password";
      }
      else {
        await axios
          .get("/api/admin")
          .then((response) => (this.userAdmin = response.data.find((item) => item.username == this.username &&
            item.password == this.password)));
        // if username and password matched to a user
        if (await this.userAdmin) {
          store.commit("alias", this.userAdmin.alias);
          store.commit("userID", this.userAdmin._id);
          await axios.post("/session/admin", {
            verified: this.userAdmin.verified,
            _id: this.userAdmin._id,
            licenseNo: this.userAdmin.licenseNo,
            alias: this.userAdmin.alias,
            fullname: this.userAdmin.name,
            specialist: this.userAdmin.specialist,
            gmail: this.userAdmin.gmail,
            hospitalOrigin: this.userAdmin.hospitalOrigin,
            schedule: this.userAdmin.schedule,
            username: this.userAdmin.username
          });
          store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userAdmin.alias}.jpg`).toHtml());
          await this.$router.push(`/admin/user/${this.userAdmin.alias}`);
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
      await this.$router.push("/admin/signup");
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