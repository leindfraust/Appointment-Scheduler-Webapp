<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from "axios";
import { useStore } from "vuex";
import groupBy from 'lodash/groupBy'
import DoctorMenu from "../../components/DoctorMenu.vue";
import socket from '../../socket'
import CatchError from "../../components/CatchError.vue";

const store = useStore()

const errMsg = ref('')
const isActiveModalConfirm = ref(false)
const isActiveModalCancel = ref(false)
const id = ref(null)
const refID = ref(null)
const refIDPatient = ref(null)
const firstName = ref(null)
const lastName = ref(null)
const birthDay = ref(null)
const contactNum = ref(null)
const doctorName = ref(null)
const searchBar = ref('')
const appointmentSched = ref([])
const file = ref(null)
const confirmLoadingButton = ref(false)

const appointmentSchedules = computed(() => {
  if (appointmentSched.value) {
    return groupBy(
      appointmentSched.value.filter((x) => {
        return (
          x.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
          x.lastName.toLowerCase().includes(searchBar.value.toLowerCase()) ||
          x.referenceID.toLowerCase().includes(searchBar.value.toLowerCase())
        );
      }).sort((a, b) => {
        return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
      })
      ,
      "schedule[0].date"
    );
  } else {
    return false
  }
})
onMounted(async () => {
  await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID, ongoing: true }).then(response => appointmentSched.value = response.data).catch(err => errMsg.value = err);
})
async function confirmVisitation() {
  confirmLoadingButton.value = true
  generateRefID()

  let titleMsg = 'Appointment visitation confirmed'
  let noticeMsg = `Your appointment visitation has been confirmed by your doctor Ms/Mr. ${doctorName.value}, reference ID: ${refIDPatient.value}, a digital prescription will be displayed below if your doctor has uploaded one. We hope you well!`
  socket.emit('message', file.value ? refID.value : null, titleMsg, noticeMsg, "Medic Search", new Date())

  if (file.value) {
    const formData = new FormData()
    formData.append('id', refID.value)
    formData.append('imgFile', file.value)

    await axios.post("/api/imgUploadVisitation", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).catch(err => errMsg.value = err);
  }

  try {
    await axios.put(`/api/appointmentList/${id.value}`, {
      firstName: firstName.value,
      lastName: lastName.value,
      contactNum: contactNum.value,
      birthDay: birthDay.value,
      ifPatientVisited: true
    });
    await axios.put(`/api/doctor/${store.state.doctorID}`, {
      visits: appointmentSched.value.filter(x => x.ifPatientVisited == true).length + 1
    });
    await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID, ongoing: true }).then(response => appointmentSched.value = response.data).catch(err => errMsg.value = err);
  } catch (err) {
    errMsg.value = err
  }
  confirmLoadingButton.value = false
  isActiveModalConfirm.value = false
}

async function cancelAppointment() {

  let titleMsg = 'Your appointment has been cancelled!'
  let noticeMsg = `Your appointment visitation has been cancelled by your doctor Ms/Mr. ${doctorName.value}, reference ID: ${refIDPatient.value}, this is due to some emergencies or problems in their side. We hope you understand.`
  socket.emit('message', null, titleMsg, noticeMsg, "Medic Search", new Date())

  await axios.put(`/api/appointmentList/${id.value}`, {
    ifPatientCancelled: true
  }).catch(err => errMsg.value = err)
  await axios.post('/api/appointmentList/doctors', { id: store.state.doctorID, ongoing: true }).then(response => appointmentSched.value = response.data);
  isActiveModalCancel.value = false
}
async function toggleConfirmModal(
  refID,
  doctorNameParam,
  patientIDParam,
  firstNameParam,
  lastNameParam,
  contactNumParam,
  birthDayParam,
  _id
) {
  isActiveModalConfirm.value = true
  refIDPatient.value = refID
  doctorName.value = doctorNameParam
  firstName.value = firstNameParam;
  lastName.value = lastNameParam;
  contactNum.value = contactNumParam;
  birthDay.value = birthDayParam;
  id.value = _id;
  socket.connect()
  socket.emit('join room', patientIDParam)
}

function cancelModalConfirm() {
  isActiveModalConfirm.value = false
  socket.disconnect()
}

async function toggleCancelModal(appointment) {
  isActiveModalCancel.value = true
  refIDPatient.value = appointment.referenceID
  doctorName.value = appointment.doctorName
  id.value = appointment._id
  socket.connect()
  socket.emit('join room', appointment.patientID)
}
function cancelModalCancel() {
  isActiveModalCancel.value = false
  socket.disconnect()
}
function generateRefID() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  refID.value = result;
}
function handleFile(e) {
  file.value = e.target.files[0];
}

</script>
<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column main-doctor-content">
        <section class="section">
          <CatchError :err-msg="errMsg" />
          <h1 class="title">APPOINTMENTS</h1>
          <div class="field" v-if="appointmentSched.length !== 0">
            <div class="control">
              <input class="input" type="text" style="width: 50% !important" v-model="searchBar"
                placeholder="Search..." />
            </div>
          </div>
          <div class="container is-widescreen is-fullhd" v-if="Object.keys(appointmentSchedules).length !== 0">
            <div class="box" v-for="(appointmentList, index) in appointmentSchedules" :key="index"
              :style="new Date(index).toDateString() == new Date().toDateString() ? 'box-shadow: rgb(10 10 10 / 10%) 0px 0.5em 1em -0.125em, #485fc7 0px 0px 0px 1px !important;' : ''">
              <h1 class="subtitle" v-if="new Date(index).toDateString() == new Date().toDateString()">
                <b>TODAY</b>
              </h1>
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
                        " v-if="(new Date(index).getTime() == new Date(new Date().toDateString()).getTime())">Confirm
                        Visitation</button>
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
                          <div class="buttons is-centered">
                            <button class="button has-text-success" @click="cancelAppointment">YES</button>
                            <button class="button has-text-danger" @click="cancelModalCancel">NO</button>
                          </div>
                          <p class="help">NOTE: This action cannot be undone.</p>
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
                      <td class="has-text-black-ter" style="white-space: pre-wrap;">{{ appointments.comments }}</td>
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