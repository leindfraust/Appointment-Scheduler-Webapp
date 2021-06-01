<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">{{ title }}</h1>
        <v-date-picker
          v-model="date"
          mode="date"
          :min-date="new Date()"
          :disabled-dates="{ weekdays: [1] }"
        />
        <br />
        <button class="button is-danger" @click="getDate">
          Check Availability
        </button>
        <br />
        <div v-if="displayAvailability">
          <h1 class="title textAvail animate__animated animate__fadeInDown">
            {{ textAvailability }}
          </h1>
          <button
            @click="regForm"
            class="button is-info animate__animated animate__fadeInUp animate__delay-1s"
          >
            Sign Up Now
          </button>
        </div>
        <div v-else>
          <h1 class="title textAvail">
            {{ textAvailability }}
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "Calendar",
  props: {
    title: String,
  },
  data() {
    return {
      date: new Date(),
      year: "",
      month: "",
      day: "",
      hour: "",
      startHr: "",
      closeHr: "",
      displayAvailability: false,
      textAvailability: "",
      checkServer: null,
    };
  },
  created() {
    // get user system current year, month, day and hr
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.hour = this.date.getHours();

    // get startHr and closeHr of admin
    //example only for now, use 24hr format
    this.startHr = 8; //8 AM
    this.closeHr = 17; // 5 PM
  },
  methods: {
    regForm() {
      store.commit("statusTrue");
      this.$router.push("/registration");
    },
    async getDate() {
      const sunday = 0;
      const currYear = this.date.getFullYear();
      const currMonth = this.date.getMonth();
      const currDay = this.date.getDate();
      const currHour = this.date.getHours();

      const stringMonth = this.date.toLocaleString("default", {
        month: "long",
      });
      const stringDay = this.date.toLocaleString("default", {
        weekday: "long",
      });
      if (
        //check current system time
        currYear == this.year &&
        currMonth == this.month &&
        currDay == this.day &&
        currHour == this.hour
      ) {
        if (
          // check system hour and if it is not sunday
          currHour >= this.startHr ||
          currHour <= this.closeHr &&
          sunday != this.date.getDay()
        ) {
          // pass today system hour to registere
          this.displayAvailability = true;
          this.textAvailability = "Available";

          store.commit("month", stringMonth);
          store.commit("day", stringDay);
          store.commit("stateHr", currHour);
          store.commit("expireHr", currHour + 3);
        } else {
          this.displayAvailability = false;
          this.textAvailability = "Already closed today";
        }
      } else {
        await axios
          .get("api/appointmentList") // get month,day,statedHr and expiry hr and compare to the targeted date(still in works)
          .then((response) => (this.checkServer = response.data));
        if (
          await this.checkServer.find(
            (item) =>
              item.month == currMonth &&
              item.day == currDay &&
              item.statedHr <= currHour
          )
        ) {
          this.displayAvailability = false;
          this.textAvailability = "Unavailable";
        } else {
          if (currHour >= this.startHr || currHour <= this.closeHr) {
            this.displayAvailability = false;
            this.textAvailability = "Unavailable";
          } else {
            this.displayAvailability = true;
            this.textAvailability = "Available";
            store.commit("month", stringMonth);
            store.commit("day", stringDay);
            store.commit("dateNum", currDay);
            store.commit("stateHr", currHour + 1);
            store.commit("expireHr", currHour + 3);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.textAvail {
  margin-top: 3%;
}
</style>