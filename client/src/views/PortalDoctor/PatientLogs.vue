<template>
  <div style="overflow-x: hidden; height: 100vh; background-color: whitesmoke;">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column" style="background-color: whitesmoke;">
        <div class="modal" :class="{ 'is-active': isActiveModal }">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="section box">
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <label class="label">From:</label>
                      <input class="input" type="text" :value="'Dr. ' + doctorName" disabled />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <div class="label">To(Patient):</div>
                      <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
                        <div class="dropdown-trigger">
                          <button class="button" @click="openPatients">
                            <span v-if="selectedPatient == ''">Select</span>
                            <span v-else>{{ selectedPatient }}</span>
                          </button>
                        </div>
                        <div class="dropdown-menu">
                          <div class="dropdown-content" v-for="patient in patients.patients" :key="patient._id">
                            <a class="dropdown-item" @click="selectPatient(patient.patient, patient.patientName)">{{
                                patient.patientName
                            }}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">Message:</label>
                  <textarea class="textarea" placeholder="Message" v-model="noticeMsg"></textarea>
                </div>
              </div>
              <div class="field">
                <div class="control has-text-right">
                  <button class="button is-primary" @click="sendNotif"
                    :disabled="selectedPatient == '' || noticeMsg == ''">Send</button>
                </div>
              </div>
              <p v-if="notificationSent" class="has-text-success">
                A message has been sent to
                <b>{{ messageSuccessSelectedPatient }}</b>.
              </p>
              <p class="subtitle">Messaging History</p>
              <div v-if="Object.keys(messageHistory).length !== 0">
                <div class="container" v-for="(message, index) in messageHistory" :key="index">
                  <div class="notification" style="margin: 5%">
                    <div class="content">
                      <p>To: {{ message.to }}</p>
                      <p>Message: {{ message.message }}</p>
                      <p>Date: {{ new Date(message.date).toString() }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p>No past messages yet.</p>
              </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="modalInactive"></button>
        </div>
        <section class="section" style="background-color: whitesmoke;">
          <div class="container is-widescreen is-fullhd" style="padding: 15">
            <h1 class="title">
              APPOINTMENT HISTORY
              <button class="button is-info" @click="modalActive">Send a message to a patient</button>
            </h1>
            <div class="field">
              <div class="control">
                <input class="input" type="text" style="width: 50% !important" v-model="searchBar"
                  placeholder="Search..." />
              </div>
            </div>
            <div class="container" v-if="Object.keys(appointmentSchedules).length !== 0">
              <div class="box" v-for="(appointmentList, index) in appointmentSchedules" :key="index"
                :class="{ 'is-hidden': new Date(index).toDateString() == new Date().toDateString() }">
                <h1 class="subtitle has-text-black">Schedule: {{ new Date(index).toDateString() }}</h1>
                <div class="table-container">
                  <table class="table is-striped is-narrow is-fullwidth is-bordered">
                    <thead>
                      <tr>
                        <th class="has-text-black-ter">Controls</th>
                        <th class="has-text-black-ter">Priority No.</th>
                        <th class="has-text-black-ter">Hospital Appointed</th>
                        <th class="has-text-black-ter">First Name</th>
                        <th class="has-text-black-ter">Last Name</th>
                        <th class="has-text-black-ter">Contact Number</th>
                        <th class="has-text-black-ter">Birthday</th>
                        <th class="has-text-black-ter">Symptoms/Comments</th>
                      </tr>
                    </thead>
                    <tbody v-for="appointments in appointmentList" :key="appointments._id">
                      <tr>
                        <button class="dropdown-item button has-text-danger" type="button"
                          @click="deleteData(appointments._id)">Delete</button>
                        <br />
                        <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                        <th class="has-text-black-ter">{{ appointments.hospital }}</th>
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
            <div class="notification is-info" v-else>No previous appointments.</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import DoctorMenu from "../../components/DoctorMenu.vue"
import socket from '../../socket'

export default {
  name: "PatientLogs",
  components: {
    DoctorMenu
  },
  async mounted() {
    await axios
      .get("/api/appointmentList")
      .then(
        (response) =>
        (this.appointmentSched = response.data.filter(
          (x) => x.doctorID === this.$store.state.doctorID
        ))
      );
    await axios.get('/api/doctor').then(response => this.patients = response.data.find(x => x.alias == this.alias))
    await axios.get('/session/doctor').then(response => this.doctorName = response.data.fullname)
    await axios.get('/session/doctor').then(response => this.messageHistory = response.data.messageHistory.reverse())
  },
  data() {
    return {
      searchBar: "",
      appointmentSched: [],
      alias: this.$store.state.alias,
      patients: [],
      isActiveDropdown: false,
      isActiveModal: false,
      selectedPatient: '',
      messageSuccessSelectedPatient: '',
      doctorName: '',
      noticeMsg: '',
      notificationSent: false,
      messageHistory: []
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
          return new Date(b.schedule[0].date).getTime() - new Date(a.schedule[0].date).getTime()
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
            (x) => x.doctor === this.$store.state.doctorID
          ))
        );
    },
    selectPatient(id, name) {
      this.selectedPatient = name
      this.isActiveDropdown = false
      socket.emit('join room', id)
    },
    openPatients() {
      this.isActiveDropdown = !this.isActiveDropdown
      this.notificationSent = false
    },
    modalActive() {
      this.isActiveModal = true
      socket.connect()
    },
    modalInactive() {
      this.isActiveModal = false
      this.selectedPatient = ''
      socket.disconnect()
    },
    async sendNotif() {
      console.log(this.$store.state.doctorID)
      this.messageSuccessSelectedPatient = this.selectedPatient
      socket.emit('message', this.noticeMsg, this.doctorName, new Date())
      await axios.post('/api/pushMsg', {
        id: this.$store.state.doctorID,
        message: {
          to: this.selectedPatient,
          message: this.noticeMsg,
          date: new Date(),
        }
      }).then(response => this.messageHistory = response.data.reverse()).catch(err => { console.log(err) })
      await axios.put('/session/doctor', {
        messageHistory: {
          to: this.selectedPatient,
          message: this.noticeMsg,
          date: new Date(),
        }
      })
      this.noticeMsg = ''
      this.selectedPatient = ''
      this.notificationSent = true
    }
  }
}
</script>
<style>
</style>