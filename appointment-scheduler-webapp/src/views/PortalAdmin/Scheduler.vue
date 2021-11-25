<template>
  <div class="columns">
    <div class="column is-1">
      <AdminMenu />
    </div>
    <div class="column">
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <v-calendar
              is-expanded
              v-model="date"
              :attributes="attributes"
              @dayclick="modalUp"
              :timezone="timezone"
            />
            <br />
            <div class="modal" :class="{ 'is-active': isActive }">
              <div class="modal-background"></div>
              <div class="modal-content">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <label class="label">Time start:</label>
                      <v-date-picker v-model="timeStart" mode="time" :timezone="timezone" />
                      <br />
                      <label class="label">Time end:</label>
                      <v-date-picker v-model="timeEnd" mode="time" :timezone="timezone" />
                      <div class="controls">
                        <label class="label">Appointment limit</label>
                        <input class="input" type="number" v-model="appointmentLimits" style="width: 33%;" />
                      </div>
                      <div class="block">
                        <button class="button is-primary" type="button" @click="addSched">Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
            </div>
            <br />
            <div class="block">
              <button class="button" @click="uploadSched" type="button">Update schedules</button>
              <br />
              <br />
              <p v-if="uploadSchedSuccess" class="title has-text-warning">Schedules Updated!</p>
            </div>

            <h1 class="title">Schedule List</h1>
            <div class="columns is-gapless is-multiline">
              <div class="column" v-for="(schedules, index) in days" :key="schedules.id">
                <div class="block card">
              <div class="card-content">
                <div class="content">
                  <p class="subtitle has-text-black has-text-left">Schedule No. {{ index + 1 }}</p>
                  <p class="is-size-3 has-text-black">{{schedules.id }}</p>
                  <p class="is-size-3 has-text-black">{{ new Date(schedules.date).toDateString() }}</p>
                  <p
                    class="title is-size-3 has-text-black"
                  >{{ schedules.timeStart }} - {{ schedules.timeEnd }}</p>
                  <p class="subtitle has-text-black">Appointment limit: {{schedules.appointmentLimit}}</p>
                </div>
              </div>
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
import store from "../../store";
import AdminMenu from "../../components/AdminMenu.vue"

export default {
  name: "Scheduler",
  components: {
    AdminMenu
  },
  data() {
    return {
      alias: store.state.alias,
      profileImg: store.state.profileImg,
      userID: "",
      date: new Date(),
      timeStart: new Date(),
      timeEnd: new Date(),
      timezone: "",
      days: [],
      appointmentLimits: 10,
      checkServer: null,
      isActive: false,
      uploadSchedSuccess: false
    };
  },
  async mounted() {
    await axios
      .get("/session/admin")
      .then((response) => (this.days = response.data.schedule));
    await axios
      .get("/session/admin")
      .then((response) => (this.userID = response.data._id));
  },
  computed: {
    dates() {
      return this.days.map((day) => new Date(day.date).toDateString());
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
        date: day.date,
        timeStart: this.timeStart.toLocaleTimeString(),
        timeEnd: this.timeEnd.toLocaleTimeString(),
        appointmentLimit: this.appointmentLimits,
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
      await axios.put("/session/admin", {
        schedule: this.days,
      });
      await axios
        .get("/session/admin")
        .then((response) => (this.days = response.data.schedule));

      this.uploadSchedSuccess = true
    },
  },
};
</script>
<style scoped>
.hero {
  background-color: whitesmoke;
}
</style>