<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Registration Form</h1>
        <form class="field customField animate__animated animate__fadeInLeft">
          <label class="label">First Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <label class="label">Last Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <label class="label">Contact Number:</label>
          <div class="block control">
            <input
              class="input"
              type="number"
              v-model="contactNum"
              placeholder="Contact Number"
              required
            />
          </div>
          <label class="label">Additional comments</label>
          <textarea
            class="textarea"
            v-model="comments"
            placeholder="Optional"
          ></textarea>
          <label class="label">Birthday</label>
          <div class="control">
            <v-date-picker class="block" v-model="birthDay">
              <template v-slot="{ inputValue, togglePopover }">
                <div class="is-block">
                  <button
                    type="button"
                    class="button is-primary"
                    style="margin: auto"
                    @click="togglePopover()"
                  >
                    Select date
                  </button>
                  <input
                    :value="inputValue"
                    class="input"
                    style="width: 10%"
                    readonly
                  />
                </div>
              </template>
            </v-date-picker>
          </div>
          <br />
          <h1 class="subtitle has-text-black has-text-weight-bold">
            Pick your prefered schedule
          </h1>
          <div
            class="block card"
            v-for="schedules in doctorSched"
            :key="schedules.id"
          >
            <div class="control">
              <label class="radio">
                <input
                  type="radio"
                  name="schedule"
                  @click="pickSched(schedules)"
                />
                <div class="content">
                  <p class="sbuttile">{{ schedules.date }}</p>
                  <p class="subtitle has-text-black">
                    {{ schedules.timeStart }} - {{ schedules.timeEnd }}
                  </p>
                </div></label
              >
            </div>
          </div>
          <button type="button" class="button is-primary" @click="appoint">
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "../../store";

export default {
  name: "RegForm",
  data() {
    return {
      doctorSched: store.state.doctorSched,
      doctor: store.state.userID,
      firstName: null,
      lastName: null,
      birthDay: new Date(),
      comments: null,
      contactNum: null,
      schedule: null,
      priorityNum: null,
      doctorDetails: null,
    };
  },
  mounted() {
    axios
      .get("/api/admin")
      .then(
        (response) =>
          (this.doctorDetails = response.data.find(
            (x) => x._id === this.doctor
          ))
      );
  },
  methods: {
    async appoint() {
      await axios
        .get("/api/appointmentList")
        .then(
          (response) =>
            (this.priorityNum =
              response.data.filter(
                (e) =>
                  e.schedule[0].date === this.schedule.date &&
                  e.doctor === this.doctor
              ).length + 1)
        );
      if (
        this.firstName != null &&
        this.lastName != null &&
        this.contactNum != null
      ) {
        await axios.post("/api/appointmentList", {
          doctor: this.doctor,
          firstName: this.firstName,
          lastName: this.lastName,
          contactNum: this.contactNum,
          birthDay: this.birthDay.toLocaleDateString(),
          comments: this.comments,
          schedule: this.schedule,
          priorityNum: this.priorityNum,
        });
        let patientDetails = {
          doctor: this.doctorDetails.name,
          firstName: this.firstName,
          lastName: this.lastName,
          contactNum: this.contactNum,
          birthDay: this.birthDay.toLocaleDateString(),
          comments: this.comments,
          schedule: this.schedule,
          priorityNum: this.priorityNum,
        };
        store.commit("patientDetails", patientDetails);
        await this.$router.push("/success");
      }
    },
    pickSched(sched) {
      this.schedule = sched;
    },
  },
};
</script>

<style scoped>
.customField {
  width: 100%;
  margin: auto;
  padding: 100px;
  background-color: whitesmoke;
  border-radius: 15px;
}
input,
textarea,
.card {
  width: 35%;
}
.card {
  padding: 50px;
}
button {
  margin-top: 15px;
  margin-right: 60%;
}
@media (max-width: 991.98px) {
  .customField {
    width: 100% !important;
    padding: 50px;
  }
  input,
  textarea,
  .card,
  .is-block,
  button {
    width: 100% !important;
  }
}
</style>