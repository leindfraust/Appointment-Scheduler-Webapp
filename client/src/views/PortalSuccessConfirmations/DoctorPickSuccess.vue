<template>
  <NavigationTab />
  <section class="section is-medium">
    <div class="has-text-centered">
    </div>
    <div class="container">
      <h1 class="subtitle has-text-centered">
        You have been successfuly appointed to <b>{{ patient.doctor }}, {{ patient.specialization }}</b> at
        <b>{{ new Date(patient.schedule.date).toDateString() }}</b>, <b>{{ patient.schedule.timeStart }}</b> -
        <b>{{ patient.schedule.timeEnd }}</b> in <b>{{ patient.hospital }}</b>.
      </h1>
      <h1 class="subtitle has-text-centered">Your <b>priority number</b> is
        <b>{{ patient.priorityNum }}</b>
      </h1>
      <br />
      <p class="subtitle is-6 has-text-centered has-text-weight-bold">Reference ID: {{ patient.referenceID }}</p>
      <div class="has-text-centered">
        <button class="button is-rounded is-link" @click="exportPDF">Download a copy</button>
      </div>
      <hr />
      <h1 class="title">Patient Details </h1><br>
      <h1 class="subtitle"><b>First Name:</b> {{ patient.firstName }}</h1>
      <h1 class="subtitle"><b>Last Name:</b> {{ patient.lastName }}</h1>
      <h1 class="subtitle"><b>Contact Number:</b> {{ patient.contactNum }}</h1>
      <h1 class="subtitle"><b>Birthday:</b> {{ patient.birthDay }}</h1>
      <h1 class="subtitle"><b>Symptoms/Comments:</b> {{ patient.comments }}</h1>
    </div>

    <div :class="{ 'is-hidden': pdfHide }">
      <section class="section is-small" id="digitalConfirmation">
        <h1 class="subtitle has-text-centered">
          You have been successfuly appointed to <b>{{ patient.doctor }}, {{ patient.specialization }}</b> at
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
    </div>
  </section>
</template>

<script>
import html2pdf from 'html2pdf.js'
import store from "../../store";
import NavigationTab from "../../components/NavigationTab.vue";
export default {
  name: "pickDoctorSuccess",
  data() {
    return {
      patient: store.state.patientDetails,
      pdfHide: true
    };
  },
  mounted() {
    store.commit("statusAvailability", false)
  },
  components: { NavigationTab },
  methods: {
    exportPDF() {
      this.pdfHide = false
      let el = document.getElementById("digitalConfirmation")
      html2pdf(el, {
        margin: 1,
        filename: `${this.patient.referenceID}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      this.pdfHide = true
    }
  }
};
</script>

<style>
</style>