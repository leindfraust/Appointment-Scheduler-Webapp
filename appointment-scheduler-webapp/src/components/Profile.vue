<template>
  <div class="columns">
    <div class="column is-1">
      <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <figure class="media block">
          <span class="image is-128x128" v-html="profileImg"></span>
        </figure>
        <button @click="logout" class="button is-danger" type="button">Logout</button>
        <ul class="menu-list">
          <li>
            <a @click="routeHome">Home</a>
          </li>
          <li>
            <a @click="profile">Profile</a>
          </li>
          <li>
            <a @click="openSchedule">Schedule</a>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column" style="margin-top: 6%">
      <div class="container is-fluid">
        <div class="columns is-gapless">
          <div class="column is-6">
            <span id="profile-img" v-html="profileImg"></span>
            <form
              id="formUpload"
              action="/api/imgUpload"
              method="post"
              enctype="multipart/form-data"
              style="margin: auto; width: 50%"
            >
              <input type="hidden" name="alias" :value="(alias)" />
              <div class="columns">
                <div class="column is-8">
                  <input class="input" type="file" name="imgFile" @click="imgSuccess" required />
                </div>
                <div class="column is-1">
                  <button
                    type="submit"
                    value="Upload"
                    class="button is-primary"
                  >Change profile picture</button>
                </div>
              </div>
            </form>
          </div>
          <br />
          <div class="column" style="margin-top: 2%">
            <form>
              <label class="label">
                <h1 class="subtitle">
                  <b>Full Name:</b>
                </h1>
              </label>
              <input class="input" size="5" type="text" v-model="fullname" style="width: 50%" />
              <br />
              <br />
              <button class="button is-danger" type="button" @click="updateInfo">Save changes</button>
              <h1
                v-if="infoValidate"
                class="subtitle has-text-success"
                style="margin-top: 5%"
              >{{ infoValidateMessage }}</h1>
              <hr />
              <label class="label">
                <h1 class="subtitle">
                  <b>Create new password:</b>
                </h1>
              </label>
              <h1
                v-if="passwordValidate"
                class="subtitle has-text-danger"
                style="margin-top: 5%"
              >{{ passwordValidateMessage }}</h1>
              <input
                class="input"
                size="5"
                type="password"
                id="passwordOne"
                v-model="password"
                style="width: 50%"
              />
              <br />
              <label class="checkbox">
                <input type="checkbox" @click="showPassOne" />
                Show password
              </label>
              <br />
              <br />
              <label class="label">
                <h1 class="subtitle">
                  <b>Repeat Password:</b>
                </h1>
              </label>
              <h1
                v-if="passwordValidate"
                class="subtitle has-text-danger"
                style="margin-top: 5%"
              >{{ passwordValidateMessage }}</h1>
              <input
                class="input"
                size="5"
                type="password"
                id="passwordTwo"
                v-model="passwordRepeat"
                style="width: 50%"
              />
              <br />
              <label class="checkbox">
                <input type="checkbox" @click="showPassTwo" />
                Show password
              </label>
              <br />
              <br />
              <button class="button is-danger" type="button" @click="updatePassword">Save changes</button>
              <h1
                v-if="!passwordValidate"
                class="subtitle has-text-success"
                style="margin-top: 5%"
              >{{ passwordValidateMessage }}</h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import cld from '../cloudinary'

export default {
  name: "userProfile",
  data() {
    return {
      alias: store.state.alias,
      fullname: null,
      password: null,
      passwordRepeat: null,
      passwordValidateMessage: null,
      passwordValidate: null,
      infoValidate: null,
      infoValidateMessage: null,
      id: null,
      profileImg: store.state.profileImg
    };
  },
  async mounted() {
    await axios
      .get("/session/user")
      .then((response) => (this.fullname = response.data.fullname));
    await axios
      .get("/session/user")
      .then((response) => (this.id = response.data._id));
  },
  methods: {
    async updateInfo() {
      await axios.put(`/api/admin/${this.id}`, {
        name: this.fullname,
      })
      await axios.put("/session/user", {
        fullname: this.fullname,
      })
      await axios
        .get("/session/user")
        .then((response) => (this.fullname = response.data.fullname));
      await axios
        .get("/session/user")
        .then((response) => (this.id = response.data._id));

      this.infoValidate = true
      this.infoValidateMessage = "changes saved successfully"
    },
    async updatePassword() {
      if (this.password != null && this.passwordRepeat != null && this.password === this.passwordRepeat) {
        await axios.put(`/api/admin/${this.id}`, {
          password: this.password
        })
        await axios.put("/session/user", {
          password: this.password
        })
        this.passwordValidate = false
        this.passwordValidateMessage = "password changed successfully"
      } else {
        if (this.password == null && this.passwordRepeat == null) {
          this.passwordValidate = true;
          this.passwordValidateMessage = "empty password"
          this.password = null
          this.passwordRepeat = null
        } else {
          this.passwordValidate = true;
          this.passwordValidateMessage = "password do not match"
          this.password = null
          this.passwordRepeat = null
        }
      }
    },
    imgSuccess(){
      store.state.imgSuccess = true
    },
    showPassOne() {
      let passwordToggle = document.getElementById("passwordOne");
      if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
      } else {
        passwordToggle.type = "password";
      }
    },
    showPassTwo() {
      let passwordToggle = document.getElementById("passwordTwo");
      if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
      } else {
        passwordToggle.type = "password";
      }
    },
    async logout() {
      store.commit("alias", null);
      await axios.delete("/session/user");
      await this.$router.push("/login");
    },
    async routeHome() {
      await this.$router.push(`/admin/user/${this.alias}`);
    },
    async profile() {
      await this.$router.push(`/admin/user/${this.alias}/profile`);
    },
    async openSchedule() {
      await this.$router.push(`/admin/user/${this.alias}/schedule`);
    },
  },
};
</script>

<style>
#profile-img {
  display: block;
  margin: auto;
  width: 70%;
  padding: 40px;
}
</style>