<template>
  <div class="columns" >
    <div class="column is-1">
      <AdminMenu />
    </div>
    <div class="column has-text-centered is-2" style="margin: auto; ">
      <div class="select is-multiple box">
        <p class="subtitle">
          <b>Patients</b>
        </p>
        <select multiple size="8">
          <option
            v-for="(patient, index) in patients.patients"
            :key="patient._id"
            :value="patient"
          >{{ patient.patientName }}</option>
        </select>
      </div>
    </div>
    <div class="column" >
      <section class="section" style="background-color: whitesmoke;">
        <div class="container is-widescreen is-fullhd" style="padding: 15">
          <h1 class="title has-text-centered">APPOINTMENT HISTORY</h1>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                style="width: 50% !important"
                v-model="searchBar"
                placeholder="Search..."
              />
            </div>
          </div>
          <div class="box" v-for="(appointmentList, index) in appointmentSchedules" :key="index">
            <h1 class="subtitle has-text-black">Schedule: {{ new Date(index).toDateString() }}</h1>
            <div class="table-container">
              <table class="table is-striped is-narrow is-fullwidth is-bordered">
                <thead>
                  <tr>
                    <th class="has-text-black-ter">Controls</th>
                    <th class="has-text-black-ter">Priority No.</th>
                    <th class="has-text-black-ter">First Name</th>
                    <th class="has-text-black-ter">Last Name</th>
                    <th class="has-text-black-ter">Contact Number</th>
                    <th class="has-text-black-ter">Birthday</th>
                    <th class="has-text-black-ter">Symptoms/Comments</th>
                  </tr>
                </thead>
                <tbody v-for="appointments in appointmentList" :key="appointments._id">
                  <tr>
                    <button
                      class="dropdown-item button has-text-danger"
                      type="button"
                      @click="deleteData(appointments._id)"
                    >Delete</button>
                    <br />
                    <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                    <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                    <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                    <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                    <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                    <td class="has-text-black-ter">{{ appointments.comments }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Designed and Developed</strong> by <strong>Ronan and Timay</strong>.
    </p>
  </div>
</footer>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import AdminMenu from "../../components/AdminMenu.vue"

export default {
  name: "PatientLogs",
  components: {
    AdminMenu
  },
  async mounted() {
    await axios
      .get("/api/appointmentList")
      .then(
        (response) =>
        (this.appointmentSched = response.data.filter(
          (x) => x.doctor === this.$store.state.userID
        ))
      );
    await axios.get('/api/admin').then(response => this.patients = response.data.find(x => x.alias == this.alias))
    console.log(await this.patients.patients)
  },
  data() {
    return {
      searchBar: "",
      appointmentSched: [],
      alias: this.$store.state.alias,
      patients: []
    }
  },
  computed: {
    appointmentSchedules() {
      return _.groupBy(
        this.appointmentSched.filter((x) => {
          return (
            x.firstName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
            x.lastName.toLowerCase().includes(this.searchBar.toLowerCase())
          );
        }).sort((a, b) => {
          return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
        }).filter(x => { return new Date(x.schedule[0].date).getTime() < new Date().getTime() })
        ,
        "schedule[0].date"
      );
    },
  },
  methods: {
    async deleteData(_id) {
      await axios.delete(`/api/appointmentList/${_id}`);
      await axios
        .get("/api/appointmentList")
        .then(
          (response) =>
          (this.appointmentSched = response.data.filter(
            (x) => x.doctor === store.state.userID
          ))
        );
    },
  }
}
</script>
<style>
</style>