<template>
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
            <v-date-picker v-model="date" mode="time" :timezone="timezone" />
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
        <br>
        <div class="block">
          <button class="button" @click="uploadSched" type="button">Update schedules</button>
        </div>

        <h1 class="title">Schedule List</h1>
        <div class="block card" v-for="(schedules, index) in days" :key="schedules.id">
          <div class="card-content">
            <div class="content">
              <p class="subtitle has-text-black"> {{ index + 1 }}</p>
              <p class="sbuttile"> {{ schedules.date }} </p>
              <p class="subtitle has-text-black"> {{ schedules.time }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Scheduler",
  data() {
    return {
      userID: '',
      date: new Date(),
      timezone: "",
      days: [],
      checkServer: null,
      isActive: false,
    };
  },
  async mounted(){
    await axios.get('/session/user')
    .then(response => this.days = response.data.schedule)
    await axios.get('/session/user')
    .then(response => this.userID = response.data._id)
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
        time: this.date.toLocaleTimeString()
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
        schedule: this.days
      });
      await axios.put('/session/user', {
        schedule: this.days
      })
      location.reload();
    }
  },
};
</script>
<style scoped>
.textAvail {
  margin-top: 3%;
}
</style>