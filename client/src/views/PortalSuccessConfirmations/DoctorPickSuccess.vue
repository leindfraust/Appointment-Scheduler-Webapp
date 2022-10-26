<template>
  <NavigationTab />
  <section class="section is-large" id="background">
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
      <br />
      <h1 class="title">Patient Details </h1><br>
      <h1 class="subtitle"><b>First Name:</b> {{ patient.firstName }}</h1>
      <h1 class="subtitle"><b>Last Name:</b> {{ patient.lastName }}</h1>
      <h1 class="subtitle"><b>Contact Number:</b> {{ patient.contactNum }}</h1>
      <h1 class="subtitle"><b>Birthday:</b> {{ patient.birthDay }}</h1>
      <h1 class="subtitle"><b>Symptoms/Comments:</b> {{ patient.comments }}</h1>
    </div>

    <div :class="{ 'is-hidden': pdfHide }">
      <section class="section" id="digitalConfirmation">
        <div class="block">&nbsp;</div>
        <div class="columns is-mobile is-vcentered">
          <div class="column is-1">
            <figure class="image">
              <img src="../../assets/images/logos/medic-search-logo.png" />
            </figure>
          </div>
          <div class="column">
            <h1 class="title has-text-info has-text-weight-bold">Medic Search Inc.</h1>
            <p class="subtitle">Find and make an appointment on hospitals or clinics near your area.</p>
          </div>
        </div>
        <div class="block">&nbsp;</div>
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
        <br />
        <h1 class="title">Patient Details </h1><br>
        <h1 class="subtitle"><b>First Name:</b> {{ patient.firstName }}</h1>
        <h1 class="subtitle"><b>Last Name:</b> {{ patient.lastName }}</h1>
        <h1 class="subtitle"><b>Contact Number:</b> {{ patient.contactNum }}</h1>
        <h1 class="subtitle"><b>Birthday:</b> {{ patient.birthDay }}</h1>
        <h1 class="subtitle"><b>Symptoms/Comments:</b> {{ patient.comments }}</h1>
        <div class="is-pulled-right" style="padding-top: 10%">
          <figure class="image is-128x128">
            <img src="../../assets/images/logos/medi-search-horizontal.png" />
            <p class="subtitle is-6 has-text-info has-text-right">bit.ly/MedSearch</p>
          </figure>
        </div>
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
        margin: 0,
        filename: `${this.patient.referenceID}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      this.pdfHide = true
    }
  }
};
</script>

<style scoped>
#background {
  background: no-repeat center url('../../assets/images/background-login.png');
  background-size: cover;
}
</style>