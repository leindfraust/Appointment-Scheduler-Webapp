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
          <h1 v-else-if="incorrectUserPass == false" class="subtitle has-text-danger" style="margin-top: 5%">
            {{ validateMessage }}
          </h1>
          <button type="button" class="button is-primary" @click="login">
            Login
          </button>
          <router-link to="/register" class="signup button is-danger"
            >Sign Up</router-link
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      userAdmin: null,
      incorrectUserPass: Boolean,
      validateMessage: "",
    };
  },
  methods: {
    async login() {
      if (this.username == null && this.password == null) {
        this.incorrectUserPass = false;
        this.validateMessage = "empty username or password";
      } else {
        await axios
          .get("api/admin")
          .then(
            (response) =>
              (this.userAdmin = response.data.find(
                (item) =>
                  item.username == this.username &&
                  item.password == this.password
              ))
          );
        if (await this.userAdmin) {
          store.commit("alias", this.userAdmin.alias);
          store.commit("userTrue");
          await this.$router.push(`/admin/user/${this.userAdmin.alias}`);
        } else {
          this.validateMessage = "Incorrect username or password";
          this.incorrectUserPass = true;
          this.username = null
          this.password = null
        }
      }
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