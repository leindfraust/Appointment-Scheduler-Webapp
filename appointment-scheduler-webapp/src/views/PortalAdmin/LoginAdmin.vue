<template>
  <section class="hero is-primary is-fullheight">
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
          <a @click="signup" class="signup button is-danger"
            >Sign Up</a
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../store";
import axios from "axios";
import cld from "../../cloudinary"
export default {
  name: "Login",
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
      .then(
        (response) =>
          (this.userAdmin = response.data)
      );
      if(await this.userAdmin.alias){
        store.commit("alias", this.userAdmin.alias)
        store.commit("userID", this.userAdmin._id)
        store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userAdmin.alias}.jpg`).toHtml())
        await this.$router.push(`/admin/user/${this.userAdmin.alias}`);
      }
  },
  methods: {
    async login() {
      if (this.username == null && this.password == null) {
        this.incorrectUserPass = false;
        this.validateMessage = "empty username or password";
      } else {
        await axios
          .get("/api/admin")
          .then(
            (response) =>
              (this.userAdmin = response.data.find(
                (item) =>
                  item.username == this.username &&
                  item.password == this.password
              ))
          );
        // if username and password matched to a user
        if (await this.userAdmin) {
          store.commit("alias", this.userAdmin.alias)
          store.commit("userID", this.userAdmin._id)
          store.commit("profileImg", cld.imageTag(`assets/doctors/${this.userAdmin.alias}.jpg`).toHtml())
          await this.$router.push(`/admin/user/${this.userAdmin.alias}`);
          await axios.post("/session/admin", {
            _id: this.userAdmin._id,
            alias: this.userAdmin.alias,
            fullname: this.userAdmin.name,
            username: this.username,
            password: this.password,
            schedule: this.userAdmin.schedule
          });
        } else {
          this.validateMessage = "Incorrect username or password";
          this.incorrectUserPass = true;
          this.username = null;
          this.password = null;
        }
      }
    },
    async signup(){
      await axios.get("/api/specialistList")
      .then(response => this.specializations = response.data)
      store.commit("specialistList", this.specializations)
      await this.$router.push("/admin/signup")
    },
  },
};
</script>

<style scoped>
.customField {
  width: 50%;
  margin: auto;
  padding: 50px;
  background-color: whitesmoke;
  border-radius: 15px;
}
input {
  width: 75%;
}
button {
  margin-top: 15px;
  margin-right: 60%;
}
.signup {
  margin-top: -40.2px;
  margin-left: 60%;
}
@media (max-width: 991.98px) {
  .customField {
    width: 100% !important;
  }
  input {
    width: 100% !important;
  }
}
</style>