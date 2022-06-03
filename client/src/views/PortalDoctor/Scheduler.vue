<template>
  <div style="overflow-x: hidden; height: 100vh; background-color: whitesmoke;">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column" style="background-color: whitesmoke;">
        <section class="section">
          <h1 class="title">SETUP SCHEDULES</h1>
          <!--modal date input-->
          <div class="modal" :class="{ 'is-active': isActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-centered">
                    <div class="control block">
                      <label class="label">Prefix:</label>
                      <input class="input" type="text" v-model="prefix" style="width: 33%;"
                        placeholder="e.g. ROOM305" />
                    </div>
                    <label class="label">Time start:</label>
                    <v-date-picker v-model="timeStart" mode="time" :timezone="timezone" class="block" />
                    <br />
                    <label class="label">Time end:</label>
                    <v-date-picker v-model="timeEnd" mode="time" :timezone="timezone" class="block" />
                    <div class="control block">
                      <label class="label">Appointment limit:</label>
                      <input class="input" type="number" v-model="appointmentLimits" style="width: 33%;" />
                    </div>
                    <div class="block">
                      <button class="button is-primary" type="button" @click="addSched"
                        :disabled="prefix == ''">Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
          </div>
          <!--modal loader-->
          <div class="modal" :class="{ 'is-active': loading }">
            <div class="modal-background"></div>
            <div class="modal-content loader"></div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="notification is-success has-text-centered" v-if="uploadSchedSuccess">Schedules Added/Updated!
              </div>
              <v-calendar :columns="$screens({ default: 1, lg: 2 })" :rows="$screens({ default: 1, lg: 2 })"
                :is-expanded="$screens({ default: true, lg: false })" v-model="date" :min-date="new Date()"
                :disabled-dates="[{ start: new Date(), end: new Date() }]" :attributes="attributes" @dayclick="modalUp"
                :timezone="timezone" />
            </div>
            <div class="column">
              <div class="container">
                <h1 class="subtitle">Ongoing Schedules:</h1>
                <div class="columns is-multiline" style="overflow: scroll; max-height: 30em"
                  v-if="Object.keys(daysIndexed).length !== 0">
                  <div class="column is-6" v-for="schedules in daysIndexed" :key="schedules.id">
                    <div class="block card">
                      <div class="card-content">
                        <div class="content">
                          <p class="title is-5 has-text-black has-text-left">{{ new Date(schedules.date).toDateString()
                          }} &nbsp;<span class="icon-text">
                              <span class="icon">
                                <a class="has-text-black-ter" @click="modalUp(schedules.dayDetail)"><i
                                    class="fa-solid fa-trash-can"></i></a>
                              </span>
                            </span></p>
                          <p class="has-text-black">Prefix: {{ schedules.prefix }}</p>
                          <p class="has-text-black">{{ schedules.timeStart }} - {{ schedules.timeEnd }}</p>
                          <p class="has-text-black">Appointment limit: {{ schedules.appointmentLimit }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="notification is-warning" v-else>
                  <h1 class="title is-5">No ongoing schedules.</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store";
import DoctorMenu from "../../components/DoctorMenu.vue"

export default {
  name: "SchedulerPage",
  components: {
    DoctorMenu
  },
  data() {
    return {
      alias: store.state.alias,
      profileImg: store.state.profileImg,
      userID: "",
      date: new Date(),
      timeStart: '',
      timeEnd: '',
      timezone: "Asia/Hong_Kong",
      prefix: '',
      days: [],
      appointmentLimits: 10,
      checkServer: null,
      isActive: false,
      uploadSchedSuccess: false,
      loading: false
    };
  },
  async mounted() {
    await axios
      .get("/session/doctor")
      .then((response) => (this.days = response.data.schedule));
    await axios
      .get("/session/doctor")
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
    daysIndexed() {
      if (this.days !== '') {
        return this.sortDate()
      } else {
        return false
      }

    }
  },
  methods: {
    sortDate() {
      return this.days.sort((a, b) => {
        new Date(a.date).getTime() - new Date(b.date).getTime()
      }).filter(x => { return new Date(x.date).getTime() > new Date().getTime() })
    },
    async onDayClick(day) {
      this.loading = true
      this.days.push({
        dayDetail: day,
        id: day.id,
        date: day.date,
        timeStart: this.timeStart.toLocaleTimeString(),
        timeEnd: this.timeEnd.toLocaleTimeString(),
        appointmentLimit: this.appointmentLimits,
        prefix: this.prefix
      });

      await axios.put(`/api/doctor/${this.userID}`, {
        schedule: this.days,
      });
      await axios.put("/session/doctor", {
        schedule: this.days,
      });
      await axios
        .get("/session/doctor")
        .then((response) => (this.days = response.data.schedule));

      this.uploadSchedSuccess = true
      this.loading = false
    },
    async modalUp(day) {
      if (!day?.isDisabled) {
        this.isActive = true;
        const idx = this.days.findIndex((d) => d.id === day.id);
        if (idx >= 0) {
          this.loading = true
          this.days.splice(idx, 1);
          this.isActive = false;
          await axios.put(`/api/doctor/${this.userID}`, {
            schedule: this.days,
          });
          await axios.put("/session/doctor", {
            schedule: this.days,
          });
          await axios
            .get("/session/doctor")
            .then((response) => (this.days = response.data.schedule));

          this.uploadSchedSuccess = true
          this.loading = false
        }
        this.day = day;
        this.timeStart = day.date;
        this.timeEnd = day.date;
      }
    },
    addSched(day) {
      day = this.day;
      this.onDayClick(day);
      this.isActive = !this.isActive;
    },
    modalClose() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style scoped>
.hero {
  background-color: whitesmoke;
}
</style>