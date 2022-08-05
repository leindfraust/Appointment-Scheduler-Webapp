<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column">
        <section class="section">
          <h1 class="title">APPOINTMENTS</h1>
          <div class="container is-widescreen is-fullhd" v-if="Object.keys(appointmentSchedules).length !== 0">
            <div class="field">
              <div class="control">
                <input class="input" type="text" style="width: 50% !important" v-model="searchBar"
                  placeholder="Search..." />
              </div>
            </div>
            <div class="box" v-for="(appointmentList, index) in appointmentSchedules" :key="index"
              :style="new Date(index).toDateString() == new Date().toDateString() ? 'box-shadow: rgb(10 10 10 / 10%) 0px 0.5em 1em -0.125em, #485fc7 0px 0px 0px 1px !important;' : ''">
              <h1 class="subtitle" v-if="new Date(index).toDateString() == new Date().toDateString()">
                <b>TODAY</b>
              </h1>
              <h1 class="subtitle has-text-black">Schedule: {{ new Date(index).toDateString() }}</h1>
              <div class="table-container">
                <table class="table is-striped is-narrow is-fullwidth is-bordered">
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
                  <tbody v-for="appointments in appointmentList" :key="appointments._id">
                    <tr>
                      <button class="button has-text-success" type="button" @click="
                        toggleConfirmModal(
                          appointments.referenceID,
                          appointments.doctorName,
                          appointments.patientID,
                          appointments.firstName,
                          appointments.lastName,
                          appointments.contactNum,
                          appointments.birthDay,
                          appointments._id
                        )
                      " v-if="new Date(index).toDateString() == new Date().toDateString()">Confirm Visitation</button>
                      <button class="button has-text-danger" type="button" @click="toggleCancelModal(appointments)"
                        v-else>Cancel Visitation</button>
                      <br />

                      <!--Modal Confirm-->
                      <div class="modal" :class="{ 'is-active': isActiveModalConfirm }">
                        <div class="modal-background"></div>
                        <div class="modal-content animate__animated animate__fadeInLeft">
                          <div class="field customField has-text-centered">
                            <h1 class="title is-4">Confirm Patient Details</h1>
                            <label class="label">First Name</label>
                            <div class="control">
                              <input class="input" type="text" v-model="firstName" placeholder="First Name" required />
                            </div>
                            <label class="label">Last Name</label>
                            <div class="control">
                              <input class="input" type="text" v-model="lastName" placeholder="Last Name" required />
                            </div>
                            <label class="label">Contact Number</label>
                            <div class="control">
                              <input class="input" type="number" v-model="contactNum" placeholder="Contact Number"
                                required />
                            </div>
                            <label class="label">Birthday</label>
                            <div class="control">
                              <input class="input" type="text" v-model="birthDay" placeholder="Birthday" required />
                            </div>
                            <div class="field">
                              <label class="label">Upload a prescription(optional)</label>
                              <div class="control">
                                <input @change="handleFile($event)" class="input" type="file" />
                              </div>
                              <button class="is-hidden" type="submit" value="submit">Submit</button>
                            </div>
                            <button class="button is-info" :class="{ 'is-loading': confirmLoadingButton }"
                              @click="confirmVisitation()">Submit</button>
                          </div>
                        </div>
                        <button class="modal-close is-large" aria-label="close" @click="cancelModalConfirm"></button>
                      </div>

                      <!--Modal Cancel-->
                      <div class="modal" :class="{ 'is-active': isActiveModalCancel }">
                        <div class="modal-background"></div>
                        <div class="modal-content animate__animated animate__fadeInLeft">
                          <p class="subtitle is-4 has-text-centered">Do you wish to cancel the appointment? </p>
                          <p class="subtitle is-6 has-text-centered">The user will be notified of the cancellation via
                            email and notifications if you wish to proceed.</p>
                          <p class="help">NOTE: This action cannot be undone.</p>
                          <div class="buttons is-centered">
                            <button class="button has-text-success" @click="cancelAppointment">YES</button>
                            <button class="button has-text-danger" @click="cancelModalCancel">NO</button>
                          </div>
                        </div>
                        <button class="modal-close is-large" aria-label="close" @click="cancelModalCancel"></button>
                      </div>

                      <th class="has-text-black-ter">{{ appointments.referenceID }}</th>
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
          <section class="section" v-else>
            <div class="notification is-info">
              <h1 class="title is-5">No upcoming appointments.</h1>
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store";
import _ from 'lodash'
import DoctorMenu from "../../components/DoctorMenu.vue";
import socket from '../../socket'

export default {
  name: "DoctorDashboard",
  components: {
    DoctorMenu
  },
  data() {
    return {
      alias: store.state.alias,
      profileImg: store.state.profileImg,
      isActiveModalConfirm: false,
      isActiveModalCancel: false,
      id: null,
      refID: null,
      refIDPatient: null,
      firstName: null,
      lastName: null,
      birthDay: null,
      contactNum: null,
      doctorName: null,
      searchBar: "",
      schedule: null,
      appointmentSched: [],
      file: null,
      confirmLoadingButton: false
    };
  },
  computed: {
    appointmentSchedules() {
      if (this.appointmentSched) {
        return _.groupBy(
          this.appointmentSched.filter((x) => {
            return (
              x.firstName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
              x.lastName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
              x.referenceID.toLowerCase().includes(this.searchBar.toLowerCase())
            );
          }).sort((a, b) => {
            return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
          }).filter(x => { return new Date(x.schedule[0].date).toLocaleDateString() >= new Date().toLocaleDateString() && x.ifPatientVisited == false })
          ,
          "schedule[0].date"
        );
      } else {
        return false
      }
    },
  },
  async mounted() {
    await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID }).then(response => this.appointmentSched = response.data);
  },
  methods: {
    async confirmVisitation() {
      this.confirmLoadingButton = true
      this.generateRefID()

      let titleMsg = 'Appointment visitation confirmed'
      let noticeMsg = `Your appointment visitation has been confirmed by your doctor Ms/Mr. ${this.doctorName}, reference ID: ${this.refIDPatient}, a digital prescription will be displayed below if your doctor has uploaded one. We hope you well!`
      socket.emit('message', this.file ? this.refID : null, titleMsg, noticeMsg, "Med Search", new Date())

      if (this.file) {
        const formData = new FormData()
        formData.append('id', this.refID)
        formData.append('imgFile', this.file)

        await axios.post("/api/imgUploadVisitation", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).catch(err => console.log(err));
      }

      try {
        await axios.put(`/api/appointmentList/${this.id}`, {
          firstName: this.firstName,
          lastName: this.lastName,
          contactNum: this.contactNum,
          birthDay: this.birthDay,
          ifPatientVisited: true
        });
        await axios.put(`/api/doctor/${store.state.doctorID}`, {
          visits: this.appointmentSched.filter(x => x.ifPatientVisited == true).length + 1
        });
        await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID }).then(response => this.appointmentSched = response.data);
      } catch (err) {
        console.log(err)
      }
      this.confirmLoadingButton = false
      this.isActiveModalConfirm = false
    },
    async cancelAppointment() {

      let titleMsg = 'Your appointment has been cancelled!'
      let noticeMsg = `Your appointment visitation has been cancelled by your doctor Ms/Mr. ${this.doctorName}, reference ID: ${this.refIDPatient}, this is due to some emergencies or problems in their side. We hope you understand.`
      socket.emit('message', null, titleMsg, noticeMsg, "Med Search", new Date())

      await axios.delete(`/api/appointmentList/${this.id}`).catch(err => console.log(err))
      await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID }).then(response => this.appointmentSched = response.data).catch(err => console.log(err));

      this.isActiveModalCancel = false
    },
    async toggleConfirmModal(
      refID,
      doctorName,
      patientID,
      firstName,
      lastName,
      contactNum,
      birthDay,
      _id
    ) {
      this.isActiveModalConfirm = true
      this.refIDPatient = refID
      this.doctorName = doctorName
      this.firstName = firstName;
      this.lastName = lastName;
      this.contactNum = contactNum;
      this.birthDay = birthDay;
      this.id = _id;
      socket.connect()
      socket.emit('join room', patientID)
    },
    cancelModalConfirm() {
      this.isActiveModalConfirm = false
      socket.disconnect()
    },
    async toggleCancelModal(appointment) {
      this.isActiveModalCancel = true
      this.refIDPatient = appointment.referenceID
      this.doctorName = appointment.doctorName
      this.id = appointment._id
      socket.connect()
      socket.emit('join room', appointment.patientID)
    },
    cancelModalCancel() {
      this.isActiveModalCancel = false
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
    handleFile(e) {
      this.file = e.target.files[0]
    }
  },
};
</script>

<style scoped>
.customField {
  padding: 1%;
  border-radius: 15px;
}

th {
  font-weight: bold;
}

.modal input {
  width: 300px !important;
}

.modal-content {
  background-color: whitesmoke;
  padding: 15px;
  border-radius: 10px;
}

@media (max-width: 991.98px) {
  .modal input {
    width: 300px !important;
  }

  #titleBox {
    width: 100% !important;
  }
}
</style>
<style>
.main-doctor::-webkit-scrollbar {
  display: none
}

.main-doctor {
  background: linear-gradient(180deg, #DAE6FE 0%, #FFFFFF 43.56%);
}
</style>