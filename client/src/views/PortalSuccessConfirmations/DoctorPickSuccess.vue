<template>
  <NavigationTab />
  <section class="section is-medium">
    <h1 class="subtitle has-text-centered">
      You have been successfuly appointed to <b>{{ patient.doctor }}</b> at
      <b>{{ new Date(patient.schedule.date).toDateString() }}</b>, <b>{{ patient.schedule.timeStart }}</b> -
      <b>{{ patient.schedule.timeEnd }}</b> in <b>{{ patient.hospital }}</b>.
    </h1>
    <h1 class="subtitle has-text-centered">Your <b>priority number</b> is
      <b>{{ patient.priorityNum }}</b>
    </h1>
    <br />
    <p class="subtitle is-6 has-text-centered has-text-weight-bold">Reference ID: {{ patient.referenceID }}</p>
    <hr />
    <h1 class="title">Patient Details </h1><br>
    <h1 class="subtitle"><b>First Name:</b> {{ patient.firstName }}</h1>
    <h1 class="subtitle"><b>Last Name:</b> {{ patient.lastName }}</h1>
    <h1 class="subtitle"><b>Contact Number:</b> {{ patient.contactNum }}</h1>
    <h1 class="subtitle"><b>Birthday:</b> {{ patient.birthDay }}</h1>
    <h1 class="subtitle"><b>Symptoms/Comments:</b> {{ patient.comments }}</h1>
  </section>
</template>

<script>
import store from "../../store";
import NavigationTab from "../../components/NavigationTab.vue";
export default {
  name: "pickDoctorSuccess",
  data() {
    return {
      patient: store.state.patientDetails,
    };
  },
  mounted() {
    store.commit("statusAvailability", false)
  },
  components: { NavigationTab }
};
</script>

<style>
</style>