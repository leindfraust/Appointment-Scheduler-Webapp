<template>
  <div class="columns">
    <div class="column is-1">
      <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <figure class="media block">
            <p class="image is-64x64">
              <img
                :src="require(`../assets/doctors/${alias}` + '.jpg')"
              />
            </p>
          </figure>
        <button @click="logout" class="button is-danger" type="button">
          Logout
        </button>
        <ul class="menu-list">
          <li>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="searchBar"
                  placeholder="Search..."
                />
              </div>
            </div>
          </li>
          <li><a @click="routeHome">Home</a></li>
          <li><a>Profile</a></li>
          <li><a @click="openSchedule">Schedule</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <v-calendar
              v-model="date"
              :attributes="attributes"
              @dayclick="modalUp"
              :timezone="timezone"
            />
            <br />
            <div class="modal" :class="{ 'is-active': isActive }">
              <div class="modal-background"></div>
              <div class="modal-content">
                <v-date-picker
                  v-model="timeStart"
                  mode="time"
                  :timezone="timezone"
                /><br>
                <v-date-picker
                  v-model="timeEnd"
                  mode="time"
                  :timezone="timezone"
                />
                <div class="block">
                  <button class="button" type="button" @click="addSched">
                    Confirm
                  </button>
                </div>
              </div>
              <button
                class="modal-close is-large"
                aria-label="close"
                @click="modalClose"
              ></button>
            </div>
            <br />
            <div class="block">
              <button class="button" @click="uploadSched" type="button">
                Update schedules
              </button>
            </div>

            <h1 class="title">Schedule List</h1>
            <div
              class="block card"
              v-for="(schedules, index) in days"
              :key="schedules.id"
            >
              <div class="card-content">
                <div class="content">
                  <p class="subtitle has-text-black has-text-left">Schedule No. {{ index + 1 }}</p>
                  <p class="is-size-3 has-text-black">{{ schedules.date }}</p>
                  <p class="title is-size-3 has-text-black">{{ schedules.timeStart }} - {{ schedules.timeEnd }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "Scheduler",
  data() {
    return {
      alias: store.state.alias,
      userID: "",
      date: new Date(),
      timeStart: new Date(),
      timeEnd: new Date(),
      timezone: "",
      days: [],
      checkServer: null,
      isActive: false,
    };
  },
  async mounted() {
    await axios
      .get("/session/user")
      .then((response) => (this.days = response.data.schedule));
    await axios
      .get("/session/user")
      .then((response) => (this.userID = response.data._id));
  },
  computed: {
    dates() {
      return this.days.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  methods: {
    onDayClick(day) {
      this.days.push({
        id: day.id,
        date: day.date.toLocaleDateString(),
        timeStart: this.timeStart.toLocaleTimeString(),
        timeEnd: this.timeEnd.toLocaleTimeString()
      });
    },
    modalUp(day) {
      this.isActive = true;
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
        this.isActive = false;
      }
      this.day = day;
    },
    addSched(day) {
      day = this.day;
      this.onDayClick(day);
      this.isActive = !this.isActive;
    },
    modalClose() {
      this.isActive = !this.isActive;
    },
    async uploadSched() {
      await axios.put(`/api/admin/${this.userID}`, {
        schedule: this.days,
      });
      await axios.put("/session/user", {
        schedule: this.days,
      });
      location.reload();
    },
    async logout() {
      store.commit("alias", null);
      await axios.delete("/session/user");
      await this.$router.push("/login");
    },
    async routeHome() {
      await this.$router.push(`/admin/user/${this.alias}`)
    },
    async openSchedule(){
      await this.$router.push(`/admin/user/${this.alias}/schedule`)
    },
  },
};
</script>
<style scoped>
.textAvail {
  margin-top: 3%;
}
</style>