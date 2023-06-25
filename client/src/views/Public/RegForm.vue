<script setup>
import axios from "axios";
import NavigationTab from "../../components/NavigationTab.vue";
import CatchError from "../../components/CatchError.vue";
import PaymongoClient from 'paymongo.js'
import { useStore } from "vuex";
import { ref, onBeforeMount } from 'vue'

const store = useStore()

const checkPatientRecord = ref(null)
const patient = ref(null)
const doctorSched = ref(store.state.doctorDetails.schedule)
const firstName = ref(null)
const lastName = ref(null)
const birthDay = ref(null)
const comments = ref(null)
const contactNum = ref(null)
const schedule = ref(null)
const currentAddress = ref(null)
const priorityNum = ref(null)
const patientsAppointed = ref(null)
const doctorDetails = ref(store.state.doctorDetails)
const pickedSpecialization = ref(store.state.pickedSpecialization)
const isLoading = ref(false)
const schedAvailability = ref(false)
const radioIndex = ref(null)
const prefix = ref(null)
const hospital = ref(store.state.hospitalName)
const refID = ref(null)
const errMsg = ref('')
const initialScheduleCheck = ref(true)
const appointmentCategory = ref('')
const appointmentCategories = ref([])
const client = ref(PaymongoClient(process.env.VUE_APP_PayMongoSK))
const checkoutUrl = ref('')
const paymentFirstToggle = ref(false)
const paymentAmount = ref('')
const paymentFailed = ref(false)
const paymentStatus = ref(store.state.paymentStatus)
const doubleAppointmentID = ref(false)
const multipleAppointment = ref(false)
const confirmDetails = ref(false)

onBeforeMount(async () => {
  if (paymentStatus.value !== 'pending') {
    if (paymentStatus.value == 'failed') {
      paymentFailed.value = true
      store.commit("paymentStatus", 'pending')
    }
  }

  doctorSched.value = doctorSched.value.filter(x => new Date(x.date).getTime() > new Date().getTime() && x.hospital === hospital.value).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  await axios.get('/session/patient').then(response => patient.value = response.data)
  firstName.value = await patient.value.name[0]
  lastName.value = await patient.value.name[1]
  checkPatientRecord.value = await doctorDetails.value.patients.find(x => x.patient === patient.value._id)
  currentAddress.value = await patient.value.currentAddress

  for await (const [index, schedules] of doctorSched.value.entries()) {
    await pickSched(index, schedules, schedules.prefix, schedules.appointmentCategories, schedules.paymentAmount)
  }
  initialScheduleCheck.value = false
})

async function checkAppointmentDuplication() {
  confirmDetails.value = false
  try {
    await axios.post('/api/appointmentList/check-double-appointment', {
      firstName: firstName.value,
      lastName: lastName.value,
      schedule: schedule.value,
      patientID: patient.value._id,
      doctorID: doctorDetails.value._id
    }).then(response => response.data ? doubleAppointmentID.value = response.data : doubleAppointmentID.value = false)
    if (!doubleAppointmentID.value) {
      await axios.post('/api/appointmentList/check-multiple-appointment', {
        schedule: schedule.value,
        patientID: patient.value._id,
        doctorID: doctorDetails.value._id
      }).then(response => response.data ? multipleAppointment.value = true : multipleAppointment.value = false)
    }
  } catch (err) {
    errMsg.value = err
  }
  if (!doubleAppointmentID.value && !multipleAppointment.value) {
    await appoint()
  }
}
async function reAppointment() {
  await axios.delete(`/api/appointmentList/${doubleAppointmentID.value}`).catch(err => errMsg.value = err)
  doubleAppointmentID.value = false
  await appoint()
}
async function appoint() {
  isLoading.value = true
  let radio = document.getElementsByClassName('radioSched');
  let statusSched = document.getElementsByClassName('statusSched')
  //check appointed patients in the selected date
  await axios
    .post("/api/appointmentList/doctors/checkPriority", {
      doctorID: doctorDetails.value._id,
      schedule: schedule.value.date
    }).then(response => patientsAppointed.value = response.data);
  //check how many appointed patients in regards to the appointment limit set by the doctor
  if (await patientsAppointed.value < schedule.value.appointmentLimit) {
    //if appointed patients is less then the appointment limit
    await axios
      .post("/api/appointmentList/doctors/checkPriority", {
        doctorID: doctorDetails.value._id,
        schedule: schedule.value.date
      }).then(response => priorityNum.value = response.data + 1);
    try {
      //if patient is new to the doctor, patient will be recorded as list of patients in doctor's profile
      if (typeof checkPatientRecord.value === 'undefined' || !checkPatientRecord.value) {
        await axios.post('/api/patientUpdate', {
          doctorID: doctorDetails.value._id,
          patientID: patient.value._id,
          patientFullName: firstName.value + " " + lastName.value
        });
      }
      generateRefID()

      await axios.put(`/api/manager/${store.state.hospitalDetails._id}`, {
        engagements: store.state.hospitalDetails.engagements + 5
      }); //added egagement just for hitting submit button

      await axios.post("/api/appointmentList", {
        referenceID: refID.value,
        hospital: hospital.value,
        doctorID: doctorDetails.value._id,
        doctorName: doctorDetails.value.name,
        doctorSpecialization: pickedSpecialization.value,
        patientID: patient.value._id,
        firstName: firstName.value,
        lastName: lastName.value,
        contactNum: contactNum.value,
        birthDay: birthDay.value.toDateString(),
        comments: comments.value,
        schedule: schedule.value,
        priorityNum: prefix.value ? prefix.value + "-" + priorityNum.value : priorityNum.value,
        appointmentCategory: appointmentCategory.value
      }).then(async response => {
        store.commit("patientDetails", response.data);
        await createSource();
      })
    } catch (err) { errMsg.value = err }
    //if not, it fails and disables the radio
  } else {
    schedAvailability.value = false
    schedule.value = null
    radio[radioIndex.value].checked = false
    radio[radioIndex.value].disabled = true
    statusSched[radioIndex.value].style.display = 'block'
  }
  isLoading.value = false
}
async function pickSched(e, sched, prefixParam, category, paymentAmountParam) {
  appointmentCategory.value = category[0]
  if (!initialScheduleCheck.value) {
    appointmentCategories.value = category
  }
  radioIndex.value = e
  isLoading.value = true
  let radio = document.getElementsByClassName('radioSched');
  let statusSched = document.getElementsByClassName('statusSched')
  for (let i = 0; i < statusSched.length; i++) {
    statusSched[i].style.display = 'none'
  }
  schedule.value = await sched;
  await axios.post("/api/appointmentList/doctors/checkPriority", {
    doctorID: doctorDetails.value._id,
    schedule: schedule.value.date
  }).then(response => patientsAppointed.value = response.data);
  //check how many appointed patients in regards to the appointment limit set by the doctor
  //if available
  if (await patientsAppointed.value < schedule.value.appointmentLimit) {
    isLoading.value = false
    if (!initialScheduleCheck.value) {
      schedAvailability.value = true
      prefix.value = prefixParam
      statusSched[e].style.display = 'block'
      paymentFirstToggle.value = true
      paymentAmount.value = paymentAmountParam
    }
    // if not available
  } else {
    isLoading.value = false
    schedAvailability.value = false
    schedule.value = null
    radio[e].checked = false
    statusSched[e].style.display = 'block'
    paymentAmount.value = ''
    if (initialScheduleCheck.value) {
      doctorSched.value = doctorSched.value.filter(schedule => schedule != sched)
    }
  }
  if (initialScheduleCheck.value) {
    schedule.value = null
  }
}
function generateRefID() {
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 9);
  }
  refID.value = result.toUpperCase()
}
async function createSource() {
  const route = location.origin
  try {
    await client.value.source.create({
      type: "gcash", // gcash | grab_pay
      currency: "PHP",
      amount: parseInt(`${paymentAmount.value}00`),
      redirect: {
        success: `${route}/payment-status`,
        failed: `${route}/payment-status`,
      },
    }).then(response => {
      checkoutUrl.value = response.data.attributes.redirect.checkout_url
      store.commit("paymentID", response.data.id)
    });
    if (checkoutUrl.value) {
      window.location.replace(checkoutUrl.value);
    }
  } catch (err) {
    isLoading.value = false
    errMsg.value = err
  }
}
function reloadPage() {
  location.reload()
}

</script>
<template>
  <NavigationTab />
  <section class="section">
    <CatchError :err-msg="errMsg" />
    <div class="notification is-warning" v-if="paymentFailed">Payment transaction failed. Please try again.</div>
    <div class="modal" :class="{ 'is-active': isLoading }">
      <div class="modal-background"></div>
      <div class="modal-content" style="overflow: hidden">
        <div class="loader" style="margin: auto;"></div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': paymentFirstToggle }">
      <div class="modal-background"></div>
      <div class="modal-content box">
        <section class="section">
          <div class="notification is-info">This schedule requires you to pay first before continuing!</div>
          <div class="buttons is-centered">
            <button class="button" @click="reloadPage">Cancel</button>
            <button class="button is-info" @click="paymentFirstToggle = false">Confirm</button>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': doubleAppointmentID }">
      <div class="modal-background"></div>
      <div class="modal-content box">
        <section class="section">
          <div class="notification is-info">You have an existing appointment with the same details, do you want to
            cancel your last appointment and make a new appointment?</div>
          <div class="buttons is-centered">
            <button class="button" @click="reloadPage">No</button>
            <button class="button is-info" @click="reAppointment">Yes</button>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': multipleAppointment }">
      <div class="modal-background"></div>
      <div class="modal-content box">
        <section class="section">
          <div class="notification is-info">You have an existing appointment with the same schedule but different
            details, do you still want to
            continue with your appointment?</div>
          <div class="buttons is-centered">
            <button class="button" @click="reloadPage">No</button>
            <button class="button is-info" @click="appoint">Yes</button>
          </div>
        </section>
      </div>
    </div>
    <div class="columns registration-form" style="width: 75%; margin: auto">
      <div class="column">
        <form>
          <div class="block">Please enter the patient's information.</div>
          <div class="notification is-info" v-if="confirmDetails">Before we continue, please confirm the patient's
            details to ensure they are
            correct as they cannot be changed later on.</div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">First name</label>
                <div class="control">
                  <input class="input" :class="{ 'is-info': confirmDetails }" type="text" v-model="firstName"
                    placeholder="First Name" required />
                </div>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                  <input class="input" :class="{ 'is-info': confirmDetails }" type="text" v-model="lastName"
                    placeholder="Last Name" required />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">Contact Number:</label>
                <div class="control">
                  <input class="input" :class="{ 'is-info': confirmDetails }" type="number" v-model="contactNum"
                    placeholder="Contact Number" required />
                </div>
              </div>
              <div class="field">
                <label class="label">Birthdate</label>
                <div class="control">
                  <v-date-picker class="block" v-model="birthDay" :max-date="new Date()">
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="is-block">
                        <a style="margin: auto" @click="togglePopover()">
                          <input style="cursor: pointer;" :value="inputValue" class="input"
                            :class="{ 'is-info': confirmDetails }" readonly />
                        </a>
                      </div>
                    </template>
                  </v-date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Current Address</label>
              <input class="input" :class="{ 'is-info': confirmDetails }" type="text" :value="currentAddress" />
            </div>
          </div>
          <div class="field">
            <label class="label">Reason for your visit:</label>
            <textarea class="textarea" :class="{ 'is-info': confirmDetails }" style="white-space: pre-wrap;"
              v-model="comments" placeholder="Your symptoms, general well being etc..." required></textarea>
          </div>
        </form>
      </div>
      <div class="column" style="position: relative;">
        <form class="field">
          <h1 class="subtitle is-5 has-text-black has-text-weight-bold">Pick your preferred schedule: </h1>
          <div v-for="(schedules, index) in doctorSched" :key="schedules.id" style="width: 75%; margin:auto">
            <div class="block"></div>
            <div class="controls">
              <label class="radio">
                <input type="radio" class="radioSched" name="schedule"
                  @click="pickSched(index, schedules, schedules.prefix, schedules.appointmentCategories, schedules.paymentAmount)" />
                <span class="subtitle is-6 has-text-weight-semibold">&nbsp;{{
                  new Date(schedules.date).toDateString()
                }}</span>
                <br />
                <span class="has-text-black">{{ schedules.timeStart }} - {{ schedules.timeEnd }}</span>
              </label>
              <a style="pointer-events: none;" class="button statusSched">
                <span v-if="schedAvailability" class="has-text-success">Available</span>
                <span v-else class="has-text-danger">Unavailable</span>
              </a>
            </div>
          </div>
        </form>
        <div class="block has-text-centered" v-if="appointmentCategories.length !== 0">
          <hr>
          <h1 class="subtitle is-5 has-text-black has-text-weight-bold has-text-left">Let the doctor know what are you
            appointing for: </h1>
          <div class="select">
            <select v-model="appointmentCategory">
              <option v-for="category in appointmentCategories" :key="category" :value="category">{{ category }}
              </option>
            </select>
          </div>
        </div>
        <div class="block has-text-centered">
          <button type="button" class="button is-info"
            :disabled="comments == null || schedule == null || firstName == '' || lastName == '' || birthDay == null || contactNum == '' || comments == '' || currentAddress == ''"
            @click="confirmDetails ? checkAppointmentDuplication() : confirmDetails = true">Submit
            appointment</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.statusSched {
  display: none;
}

@media (max-width: 991.98px) {
  .registration-form {
    width: 100% !important;
  }
}
</style>