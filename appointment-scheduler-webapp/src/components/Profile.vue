<template>
  <div class="columns">
    <div class="column is-1">
      <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <figure class="media block">
          <p class="image is-64x64">
            <img :src="require(`../assets/doctors/${alias}` + '.jpg')" />
          </p>
        </figure>
        <button @click="logout" class="button is-danger" type="button">
          Logout
        </button>
        <ul class="menu-list">
          <li><a @click="routeHome">Home</a></li>
          <li><a @click="profile">Profile</a></li>
          <li><a @click="openSchedule">Schedule</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <div class="container is-fluid">
        <img
          id="profile-img"
          :src="require(`../assets/doctors/${alias}` + '.jpg')"
        />
        <form
        id="formUpload"
          action="/api/imgUpload"
          method="post"
          enctype="multipart/form-data"
          style="margin: auto; width: 30%"
        >
          <input type="hidden" name="alias" :value="(alias)">
          <div class="columns">
            <div class="column is-8">
              <input class="input" type="file" name="imgFile" required />
            </div>
            <div class="column is-1">
              <button type="submit" @click="onSubmit" class="button is-primary">Change profile picture</button>
            </div>
          </div>
        </form>
        <br>
        <form>
          <label class="label"> <h1 class="subtitle"><b>Full Name:</b> </h1> </label>
          <input class="input" size="5" type="text" v-model="fullname" style="width: 33%">
          <br>
          <br>
          <button class="button is-danger" type="button" @click="updateFullName"> Save changes </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "userProfile",
  data() {
    return {
      alias: store.state.alias,
      fullname: null,
      id: null
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
    async onSubmit(e) {
      if(e )
      setTimeout(() => location.reload(), 1000)
    },
    async updateFullName() {
      await axios.put(`/api/admin/${this.id}`, {
        name: this.fullname
      })
      await axios.put("/session/user", {
        fullname: this.fullname
      })
      location.reload();
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
  width: 30%;
  padding: 40px;
}
</style>