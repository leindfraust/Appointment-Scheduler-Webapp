<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <!-- I know it sucks, having a form action for only image upload while separating a post with axios for the document, but shit works so I guess it's okay.-->
        <form 
        action='/api/upload'
        method='post'
        enctype="multipart/form-data"
        class="field customField animate__animated animate__fadeInLeft">
          <label class="label">Alias</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="alias"
              placeholder="alias"
              name="alias"
            />
          </div>
          <label class="label">Full Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="name"
              placeholder="Last name, First name, Extension name, Middle name"
            />
          </div>
          <label class="label">Picture</label>
          <input class="input" type="file" name="imgFile">
          <label class="label">Specialization</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="specialist"
              placeholder="Allergist, Dermatologist, etc."
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
          <label class="label">Repeat Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="passwordRepeat"
              placeholder="repeat password"
            />
          </div>
          <button type="submit" class="button is-primary" @click="create">
            Create account
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  props: {
    alias: String,
    name: String,
    specialist: String,
    username: String,
    password: String,
    passwordRepeat: String,
    imgFile: String
  },
  methods: {
    async create() {
      if (this.password == this.passwordRepeat) {
        await axios.post("/api/admin", {
          alias: this.alias,
          name: this.name,
          specialist: this.specialist,
          username: this.username,
          password: this.password,
        });
        this.$router.push("/login");
      } else {
        console.log('repeat pass')
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