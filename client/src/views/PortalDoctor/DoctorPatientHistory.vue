<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column">
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
                      <input class="input" type="text" :value="selectedPatient" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">Attach an image(optional):</label>
                  <input class="input" type="file" @change="handleFile($event)" />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">Subject: </label>
                  <input class="input" type="text" placeholder="Subject" v-model="titleMsg" />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">Message:</label>
                  <textarea class="textarea" placeholder="Message" v-model="noticeMsg">default value</textarea>
                </div>
              </div>
              <div class="field">
                <div class="control has-text-right">
                  <button class="button is-primary" :class="{ 'is-loading': loadingButton }" @click="sendNotif"
                    :disabled="selectedPatient == '' || noticeMsg == ''">Send</button>
                </div>
              </div>
              <p v-if="notificationSent" class="has-text-success">
                A message has been sent to
                <b>{{ messageSuccessSelectedPatient }}</b>.
              </p>
              <a class="button is-size-6 has-text-danger is-pulled-right" @click="clearMsgPrompt = true">Clear message
                history</a>
              <p class="subtitle">Messaging History</p>
              <div class="container" v-if="clearMsgPrompt">
                <p class="subtitle is-size-6 has-text-right">Are you sure you want to delete all messages?</p>
                <div class="buttons is-right">
                  <button class="button" @click="clearNotif">Yes</button>
                  <button class="button" @click="clearMsgPrompt = false">No</button>
                </div>
              </div>
              <div v-if="Object.keys(messageHistory).length !== 0">
                <div class="container" v-for="(message, index) in messageHistory" :key="index">
                  <div class="notification" style="margin: 5%">
                    <div class="content">
                      <p>To: {{ message.to }}</p>
                      <p>Subject: {{ message.subject }}</p>
                      <p>Message: {{ message.message }}</p>
                      <div v-if="message.id">
                        <figure class="image is-square">
                          <img loading="lazy"
                            :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/doctorCopy/${$store.state.doctorID + message.id}.jpg`" />
                        </figure>
                        <div class="has-text-centered">
                          <a :href="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/doctorCopy/${$store.state.doctorID + message.id}.jpg`"
                            class="button" download>Download File</a>
                        </div>
                      </div>
                      <br />
                      <p>Date: {{ new Date(message.date).toLocaleString() }}</p>
                    </div>
                    <button class="delete" @click="deleteNotif(message)"></button>
                  </div>
                </div>
              </div>
              <div v-else>
                <p>No past messages yet.</p>
              </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="sendNotifInactive"></button>
        </div>
        <section class="section">
          <CatchError :err-msg="errMsg" />
          <div class="container is-widescreen is-fullhd" style="padding: 15">
            <h1 class="title">
              APPOINTMENT HISTORY
            </h1>
            <div class="field" v-if="appointmentSched.length !== 0">
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
                  <table class="table is-fullwidth">
                    <thead>
                      <tr>
                        <th class="has-text-black-ter">Controls</th>
                        <th class="has-text-black-ter">Reference ID</th>
                        <th class="has-text-black-ter">Priority No.</th>
                        <th class="has-text-black-ter">Hospital Appointed</th>
                        <th class="has-text-black-ter">First Name</th>
                        <th class="has-text-black-ter">Last Name</th>
                        <th class="has-text-black-ter">Contact Number</th>
                        <th class="has-text-black-ter">Birthday</th>
                        <th class="has-text-black-ter">Symptoms/Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="appointments in appointmentList" :key="appointments._id">
                        <button class="button is-info is-light"
                          @click="sendNotifActive(appointments.patientID, appointments.firstName, appointments.lastName)">Send
                          a notification</button>
                        <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
                        <th class="has-text-black-ter">{{ appointments.priorityNum }}</th>
                        <th class="has-text-black-ter">{{ appointments.hospital }}</th>
                        <td class="has-text-black-ter">{{ appointments.firstName }}</td>
                        <td class="has-text-black-ter">{{ appointments.lastName }}</td>
                        <td class="has-text-black-ter">{{ appointments.contactNum }}</td>
                        <td class="has-text-black-ter">{{ appointments.birthDay }}</td>
                        <td class="has-text-black-ter" style="white-space: pre-wrap;">{{ appointments.comments }}</td>
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
import groupBy from 'lodash/groupBy'
import CatchError from '../../components/CatchError.vue'
import DoctorMenu from "../../components/DoctorMenu.vue"
import socket from '../../socket'

export default {
  name: "PatientLogs",
  components: {
    DoctorMenu,
    CatchError
  },
  async mounted() {
    await axios.post('/api/appointmentList/doctors', { id: this.$store.state.doctorID, ongoing: false }).then(response => this.appointmentSched = response.data);
    await axios.get('/session/doctor').then(response => this.doctorName = response.data.fullname)
    await axios.get('/session/doctor').then(response => this.messageHistory = response.data.messageHistory.reverse())
  },
  data() {
    return {
      errMsg: '',
      clearMsgPrompt: false,
      loadingButton: false,
      searchBar: "",
      appointmentSched: [],
      alias: this.$store.state.alias,
      file: null,
      isActiveModal: false,
      selectedPatient: '',
      messageSuccessSelectedPatient: '',
      refID: '',
      doctorName: '',
      titleMsg: '',
      noticeMsg: 'Dear',
      notificationSent: false,
      messageHistory: []
    }
  },
  computed: {
    appointmentSchedules() {
      if (this.appointmentSched) {
        return groupBy(
          this.appointmentSched.filter((x) => {
            return (
              x.firstName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
              x.lastName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
              x.referenceID.toLowerCase().includes(this.searchBar.toLowerCase())
            );
          })
            .sort((a, b) => {
              return new Date(b.schedule[0].date).getTime() - new Date(a.schedule[0].date).getTime()
            })
          ,
          "schedule[0].date"
        );
      } else {
        return false
      }
    },
  },
  methods: {
    sendNotifActive(id, firstName, lastName) {
      this.isActiveModal = true
      this.selectedPatient = firstName + " " + lastName
      this.noticeMsg = `Dear Ms/Mr. ${this.selectedPatient},`
      socket.connect()
      socket.emit('join room', id)
    },
    sendNotifInactive() {
      this.isActiveModal = false
      this.selectedPatient = ''
      socket.disconnect()
    },
    generateRefID() {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      this.refID = result
    },
    async sendNotif() {
      this.loadingButton = true
      if (this.file) {
        this.generateRefID()
        const formData = new FormData()
        formData.append('id', this.refID)
        formData.append('doctorID', this.$store.state.doctorID)
        formData.append('imgFile', this.file)

        await axios.post("/api/imgUploadImgMsg", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        this.refID = null
      }
      let resMsg
      this.messageSuccessSelectedPatient = this.selectedPatient
      socket.emit('message', this.refID, this.titleMsg, this.noticeMsg, this.doctorName, new Date())
      await axios.post('/api/pushMsg', {
        id: this.$store.state.doctorID,
        message: {
          id: this.refID,
          to: this.selectedPatient,
          subject: this.titleMsg,
          message: this.noticeMsg,
          date: new Date(),
        }
      }).then(response => resMsg = response.data).catch(err => this.errMsg = err)
      await axios.put('/session/doctor', {
        messageHistory: resMsg
      });
      this.messageHistory = resMsg.reverse()
      this.noticeMsg = ''
      this.notificationSent = true
      this.loadingButton = false
    },
    async deleteNotif(msg) {
      let resMsg
      try {
        await axios.post('/api/imgUploadImgMsgDeleteDoctor', {
          doctorID: 'assets/patientimgmsg/doctorCopy/' + this.$store.state.doctorID,
          id: msg.id
        });
        await axios.post('/api/pullMsg', {
          id: this.$store.state.doctorID,
          message: msg
        }).then(response => resMsg = response.data).catch(err => { this.errMsg = err })
        await axios.put('/session/doctor', {
          messageHistory: resMsg
        });
      } catch (err) {
        this.errMsg = err
      }
      this.messageHistory = resMsg.reverse()
    },
    async clearNotif() {
      try {
        await axios.post('/api/imgUploadImgMsgClearDoctor', {
          doctorID: this.$store.state.doctorID
        });
        await axios.post('/api/clearMsg', {
          id: this.$store.state.doctorID
        }).then(response => this.messageHistory = response.data).catch(err => this.errMsg = err)
        await axios.put('/session/doctor', {
          messageHistory: this.messageHistory
        });
      } catch (err) {
        this.errMsg = err
      }
      this.clearMsgPrompt = false
    },
    handleFile(e) {
      this.file = e.target.files[0]
    }
  }
}
</script>
<style scoped>

</style>