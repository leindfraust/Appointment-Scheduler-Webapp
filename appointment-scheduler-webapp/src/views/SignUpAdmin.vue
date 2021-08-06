<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <!-- I know it sucks, having a form action for only image upload while separating a post with axios for the document, but shit works so I guess it's okay.-->
        <form
          id="formUpload"
          action="/api/imgUpload"
          method="post"
          enctype="multipart/form-data"
          class="field customField animate__animated animate__fadeInLeft"
        >
          <label class="label">Alias</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="alias"
              placeholder="alias"
              name="alias"
              required
            />
          </div>
          <p class="subtitle has-text-danger">{{ aliasEvaluate }}</p>
          <label class="label">Full Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="name"
              placeholder="Last name, First name, Extension name, Middle name"
              required
            />
          </div>
          <label class="label">Picture</label>
          <input class="input" type="file" name="imgFile" required />
          <label class="label">Specialization</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="specialist"
              placeholder="Allergist, Dermatologist, etc."
              required
            />
          </div>
          <label class="label">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="username"
              placeholder="username"
              required
            />
          </div>
          <p class="subtitle has-text-danger">{{ usernameEvaluate }}</p>
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="password"
              placeholder="password"
              required
            />
          </div>
          <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
          <label class="label">Repeat Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="passwordRepeat"
              placeholder="repeat password"
              required
            />
          </div>
          <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
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
  },
  data() {
    return {
      passwordMatch: null,
      aliasConfirm: null,
      usernameConfirm: null,
      aliasEvaluate: null,
      usernameEvaluate: null,
      evaluateData: null,
    };
  },
  async mounted() {
    await axios
      .get("/api/admin")
      .then((response) => (this.evaluateData = response.data));
  },
  methods: {
    async create(e) {
      this.aliasConfirm = this.evaluateData.find((x) => x.alias === this.alias);
      this.usernameConfirm = this.evaluateData.find(
        (x) => x.username === this.username
      );
      if (
        this.password === this.passwordRepeat &&
        this.aliasEvaluate == null &&
        this.usernameEvaluate == null
      ) {
        await axios.post("/api/admin", {
          alias: this.alias,
          name: this.name,
          specialist: this.specialist,
          username: this.username,
          password: this.password,
        });
        await this.$router.push("/login");
        window.stop();
      } else {
        if ((await this.password) !== this.passwordRepeat) {
          this.passwordMatch = "password do not match";
          await e.preventDefault();
        } else {
          this.passwordMatch = null;
        }
        if (await this.alias) {
          if (typeof this.aliasConfirm == "undefined") {
            this.aliasEvaluate = null;
          } else if ((await this.aliasConfirm.alias) === this.alias) {
            this.aliasEvaluate = "alias already taken";
            await e.preventDefault();
          }
        }
        if (await this.username) {
          if (typeof this.usernameConfirm == "undefined") {
            this.usernameEvaluate = null;
          } else if ((await this.usernameConfirm.username) === this.username) {
            this.usernameEvaluate = "username already taken";
            await e.preventDefault();
          }
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