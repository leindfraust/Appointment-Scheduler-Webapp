<template>
  <section class="section is-large">
    <h1 class="subtitle has-text-centered">
      You have successfuly appointed to <b>{{ client.doctor }}</b> at
      {{ client.schedule.date }}, your <b>priority number</b> is
      <b>{{ client.priorityNum }}</b>
    </h1>
    <hr />
    <h1 class="title">Patient Details </h1><br>
    <h1 class="subtitle"><b>First Name:</b> {{ client.firstName }}</h1>
    <h1 class="subtitle"><b>Last Name:</b> {{ client.lastName }}</h1>
    <h1 class="subtitle"><b>Contact Number:</b> {{ client.contactNum }}</h1>
    <h1 class="subtitle"><b>Birthday:</b> {{ client.birthDay }}</h1>
    <h1 class="subtitle"><b>Additional comments:</b> {{ client.comments }}</h1>
  </section>
</template>

<script>
import store from "../store";
export default {
  name: "pickDoctorSuccess",
  data() {
    return {
      client: store.state.patientDetails,
    };
  },
};
</script>

<style>
</style>