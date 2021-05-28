<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <form class="field customField animate__animated animate__fadeInLeft">
          <label class="label">Alias</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="alias"
              placeholder="alias"
            />
          </div>
          <label class="label">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="username"
              placeholder="username"
            />
          </div>
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="password"
              placeholder="password"
            />
          </div>
          <button type="button" class="button is-primary" @click="create">
            Create account
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "SignUp",
  props: {
    alias: String,
    username: String,
    password: String,
  },
  methods: {
    async create() {
      await axios.post("/api/admin", {
        alias: this.alias,
        username: this.username,
        password: this.password,
      });
      this.$router.push('/login');
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
  margin-right: 50.5%;
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