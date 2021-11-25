<template>
  <div class="columns">
    <div class="column is-1">
      <AdminMenu/>
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
            </form>
            <form>
              <h1
                v-if="infoValidate"
                class="subtitle has-text-success"
                style="margin-top: 5%"
              >{{ infoValidateMessage }}</h1>
              <hr />
              <label class="label">
                <h1 class="subtitle">
                  <b>Current password:</b>
                </h1>
              </label>
              <input
                class="input"
                size="5"
                type="password"
                id="passwordCurrent"
                v-model="currentPasswordRepeat"
                style="width: 50%"
                required
              />
              <br />
              <label class="checkbox">
                <input type="checkbox" @click="showPassCurrent" />
                Show password
              </label>
              <h1
                v-if="incorrectPasswordValidate"
                class="subtitle has-text-danger"
                style="margin-top: 5%"
              >{{ currentPasswordValidateMessage }}</h1>
              <br />
              <br />
              <label class="label">
                <h1 class="subtitle">
                  <b>Create new password:</b>
                </h1>
              </label>
              <input
                class="input"
                size="5"
                type="password"
                id="passwordOne"
                v-model="password"
                style="width: 50%"
                required
              />
              <br />
              <label class="checkbox">
                <input type="checkbox" @click="showPassOne" />
                Show password
              </label>
              <h1
                v-if="passwordValidate"
                class="subtitle has-text-danger"
                style="margin-top: 5%"
              >{{ passwordValidateMessage }}</h1>
              <br />
              <br />
              <label class="label">
                <h1 class="subtitle">
                  <b>Repeat new password:</b>
                </h1>
              </label>
              <input
                class="input"
                size="5"
                type="password"
                id="passwordTwo"
                v-model="passwordRepeat"
                style="width: 50%"
                required
              />
              <br />
              <label class="checkbox">
                <input type="checkbox" @click="showPassTwo" />
                Show password
              </label>
              <h1
                v-if="passwordValidate"
                class="subtitle has-text-danger"
                style="margin-top: 5%"
              >{{ passwordValidateMessage }}</h1>
              <br />
              <br />
              <button class="button is-danger" type="submit" @click="updatePassword">Save changes</button>
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
import store from "../../store";
import axios from "axios";
import cld from '../../cloudinary'
import AdminMenu from "../../components/AdminMenu.vue";

export default {
  name: "AdminProfile",
  data() {
    return {
      alias: store.state.alias,
      fullname: null,
      password: null,
      passwordRepeat: null,
      currentPassword: null,
      currentPasswordRepeat: null,
      incorrectPasswordValidate: null,
      currentPasswordValidateMessage: null,
      passwordValidateMessage: null,
      passwordValidate: null,
      infoValidate: null,
      infoValidateMessage: null,
      id: null,
      profileImg: store.state.profileImg
    };
  },
  components: {
    AdminMenu
  },
  async mounted() {
    await axios
      .get("/session/admin")
      .then((response) => (this.fullname = response.data.fullname));
    await axios
      .get("/session/admin")
      .then((response) => (this.id = response.data._id));
    await axios
      .get("/session/admin")
      .then((response) => (this.currentPassword = response.data.password));
  },
  methods: {
    async updateInfo() {
      await axios.put(`/api/admin/${this.id}`, {
        name: this.fullname,
      })
      await axios.put("/session/admin", {
        fullname: this.fullname,
      })
      await axios
        .get("/session/admin")
        .then((response) => (this.fullname = response.data.fullname));
      await axios
        .get("/session/admin")
        .then((response) => (this.id = response.data._id));

      this.infoValidate = true
      this.infoValidateMessage = "changes saved successfully"
    },
    async updatePassword(e) {
      if (this.currentPassword == this.currentPasswordRepeat && this.password != null && this.passwordRepeat != null && this.password === this.passwordRepeat) {
        await axios.put(`/api/admin/${this.id}`, {
          password: this.password
        })
        await axios.put("/session/admin", {
          password: this.password
        })
        e.preventDefault();
        this.passwordValidate = false
        this.passwordValidateMessage = "password changed successfully"
        this.currentPasswordRepeat = null
        this.password = null
        this.passwordRepeat = null
      } else {
        if (this.currentPassword !== this.currentPasswordRepeat) {
          this.incorrectPasswordValidate = true;
          this.currentPasswordValidateMessage = "empty or incorrect password"
          this.currentPasswordRepeat = null
          this.password = null
          this.passwordRepeat = null
        } else if (this.currentPassword === this.currentPasswordRepeat) {
          this.incorrectPasswordValidate = false;
          if (this.password !== this.passwordRepeat) {
            e.preventDefault();
            this.passwordValidate = true;
            this.passwordValidateMessage = "password do not match"
            this.currentPasswordRepeat = null
            this.password = null
            this.passwordRepeat = null
          }
        }
      }
    },
    imgSuccess() {
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
    showPassCurrent() {
      let passwordToggle = document.getElementById("passwordCurrent");
      if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
      } else {
        passwordToggle.type = "password";
      }
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