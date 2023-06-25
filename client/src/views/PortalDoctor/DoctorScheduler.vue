<script setup>
import axios from "axios";
import DoctorMenu from "../../components/DoctorMenu.vue"
import CatchError from "../../components/CatchError.vue";
import { ref, onBeforeMount, computed } from 'vue'


const errMsg = ref('')
const userID = ref("")
const date = ref(new Date())
const timeStart = ref('')
const timeEnd = ref('')
const timezone = ref("Asia/Hong_Kong")
const prefix = ref('')
const days = ref([])
const day = ref('')
const appointmentLimits = ref(10)
const toggleModalSchedule = ref(false)
const uploadSchedSuccess = ref(false)
const loading = ref(false)
const hospitalList = ref([])
const selectedHospital = ref('')
const updateSchedule = ref(false)
const appointmentCategory = ref('')
const appointmentCategories = ref([])
const selectedAppointmentCategories = ref([])
const paymentAmount = ref(500)

onBeforeMount(async () => {
  await axios.get("/session/doctor").then((response) => (days.value = response.data.schedule));
  await axios.get("/session/doctor").then(response => appointmentCategories.value = response.data.appointmentCategories)
  await axios.get("/session/doctor").then((response) => (userID.value = response.data._id));
  await axios.get("/session/doctor").then(response => hospitalList.value = response.data.hospitalOrigin)
  selectedHospital.value = await hospitalList.value[0].hospital
})

const attributes = computed(() => {
  return days.value.map((day) => ({
    highlight: true,
    dates: new Date(day.date).toDateString(),
    popover: {
      label: `${day.hospital}, ${day.timeStart} - ${day.timeEnd}`
    }
  }));
})
const daysIndexed = computed(() => {
  if (days.value !== '') {
    return sortDate()
  } else {
    return false
  }
})

function sortDate() {
  return days.value.filter(x => { return new Date(x.id) > new Date() }).sort((a, b) =>
    new Date(a.date).valueOf() - new Date(b.date).valueOf())
}
function timeStringConvert(timeString, dateObject) {
  dateObject.setHours(timeString.substr(0, timeString.indexOf(":")))
  dateObject.setMinutes(timeString.substr(3, timeString.indexOf(":")))
  dateObject.setSeconds(timeString.substr(6, timeString.indexOf(":")))
  return dateObject
}
async function uploadSched() {
  loading.value = true
  if (updateSchedule.value) {
    try {
      await axios.put(`/api/doctor/schedule_update/${userID.value}`, {
        schedule: {
          dayDetail: day.value,
          id: day.value.id,
          date: day.value.date,
          timeStart: timeStart.value.toLocaleTimeString(),
          timeEnd: timeEnd.value.toLocaleTimeString(),
          appointmentLimit: appointmentLimits.value,
          prefix: prefix.value,
          hospital: selectedHospital.value,
          appointmentCategories: selectedAppointmentCategories.value,
          paymentAmount: paymentAmount.value
        }
      }).then(async response => {
        await axios.put('/session/doctor', {
          schedule: response.data.schedule
        });
        days.value = [...response.data.schedule]
      });
    } catch (err) {
      errMsg.value = err
    }
  } else {
    days.value.push({
      dayDetail: day.value,
      id: day.value.id,
      date: day.value.date,
      timeStart: timeStart.value.toLocaleTimeString(),
      timeEnd: timeEnd.value.toLocaleTimeString(),
      appointmentLimit: appointmentLimits.value,
      prefix: prefix.value,
      hospital: selectedHospital.value,
      appointmentCategories: selectedAppointmentCategories.value,
      paymentAmount: paymentAmount.value
    });
    try {
      await axios.put(`/api/doctor/${userID.value}`, {
        schedule: days.value,
      });
      await axios.put("/session/doctor", {
        schedule: days.value,
      }).then(() => {
        setTimeout(async () => {
          await axios
            .get("/session/doctor")
            .then((response) => (days.value = [...response.data.schedule]));
        }, 500)
      });
    }
    catch (err) {
      errMsg.value = err
    }
  }
  toggleModalSchedule.value = false
  updateSchedule.value = false
  uploadSchedSuccess.value = true
  loading.value = false
}
async function modalSchedDelete(dayParam) {
  if (!dayParam?.isDisabled) {
    toggleModalSchedule.value = true;
    const idx = days.value.findIndex((d) => d.id === dayParam.id);
    if (idx >= 0) {
      loading.value = true
      days.value.splice(idx, 1);
      toggleModalSchedule.value = false;
      try {
        await axios.put(`/api/doctor/${userID.value}`, {
          schedule: days.value,
        });
        await axios.put("/session/doctor", {
          schedule: days.value,
        }).then(() => {
          setTimeout(async () => {
            await axios
              .get("/session/doctor")
              .then((response) => (days.value = [...response.data.schedule]));
          }, 500)
        });
      } catch (err) {
        errMsg.value = err
      }
      uploadSchedSuccess.value = true
      loading.value = false
    }
  }
}
async function modalSchedPrompt(dayParam) {
  const schedule = days.value.find(x => x.id == dayParam.id)
  if (!dayParam.isDisabled && !schedule) { //checks if its disabled and it has no schedule in that day
    toggleModalSchedule.value = true;
    day.value = dayParam;
    timeStart.value = dayParam.date;
    timeEnd.value = dayParam.date;
  } else {
    if (!dayParam.isDisabled) { //if there was a schedule on that day, it checks again if it is disabled
      modalSchedEdit(schedule)
    }
  }
}

async function modalSchedEdit(scheduleParam) {
  updateSchedule.value = true
  toggleModalSchedule.value = true;
  prefix.value = scheduleParam.prefix
  day.value = scheduleParam.dayDetail;
  timeStart.value = timeStringConvert(scheduleParam.timeStart, new Date(scheduleParam.dayDetail.date))
  timeEnd.value = timeStringConvert(scheduleParam.timeEnd, new Date(scheduleParam.dayDetail.date))
  appointmentLimits.value = scheduleParam.appointmentLimit
  selectedHospital.value = scheduleParam.hospital
  selectedAppointmentCategories.value = [...scheduleParam.appointmentCategories]
  paymentAmount.value = scheduleParam.paymentAmount
}
function modalClose() {
  toggleModalSchedule.value = !toggleModalSchedule.value;
  updateSchedule.value = false
  prefix.value = ''
  day.value = ''
  timeStart.value = ''
  timeEnd.value = ''
  appointmentLimits.value = 10
  selectedAppointmentCategories.value = []
  appointmentCategory.value = ''
}
async function addAppointmentCategory() {
  if (!appointmentCategories.value.find(x => x === appointmentCategory.value)) {
    appointmentCategories.value.push(appointmentCategory.value)
  }
  try {
    await axios.put(`/api/doctor/${userID.value}`, {
      appointmentCategories: appointmentCategories.value
    })
    await axios.put('/session/doctor', {
      appointmentCategories: appointmentCategories.value
    })
  } catch (err) {
    errMsg.value = err
  }
  appointmentCategory.value = ''
}
async function deleteAppointmentCategory(category) {
  appointmentCategories.value = appointmentCategories.value.filter(x => x !== category)
  try {
    await axios.put(`/api/doctor/${userID.value}`, {
      appointmentCategories: appointmentCategories.value
    })
    await axios.put('/session/doctor', {
      appointmentCategories: appointmentCategories.value
    })
    this.undoAppointmentCategory(category)
  } catch (err) {
    errMsg.value = err
  }
}
function selectAppointmentCategory(category) {
  if (!selectedAppointmentCategories.value.find(x => x === category)) {
    selectedAppointmentCategories.value.push(category)
  }
}
function undoAppointmentCategory(category) {
  selectedAppointmentCategories.value = selectedAppointmentCategories.value.filter(x => x !== category)
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
          <h1 class="title">SET SCHEDULES</h1>
          <!--modal date input-->
          <div class="modal" :class="{ 'is-active': toggleModalSchedule }">
            <div class="modal-background"></div>
            <div class="modal-content">
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-centered">
                    <div class="control block">
                      <label class="label">Prefix(OPTIONAL):</label>
                      <input class="input" type="text" v-model="prefix" style="width: 33%;" placeholder="e.g. ROOM305" />
                    </div>
                    <div class="select block">
                      <select v-model="selectedHospital">
                        <option v-for="hospital in hospitalList" :key="hospital" :value="hospital.hospital">{{
                          hospital.hospital
                        }}</option>
                      </select>
                    </div>
                    <label class="label">Time start:</label>
                    <v-date-picker v-model="timeStart" mode="time" :timezone="timezone" class="block" />
                    <br />
                    <label class="label">Time end:</label>
                    <v-date-picker v-model="timeEnd" mode="time" :timezone="timezone" class="block" />
                    <div class="control block">
                      <label class="label">Appointment limit:</label>
                      <input class="input" type="number" v-model="appointmentLimits" style="width: 33%;" />
                    </div>
                    <div class="columns" style="margin: auto">
                      <div class="column">
                        <p class="label">
                          Appointment Categories(select all that applies)
                        </p>
                        <nav class="panel">
                          <div style="max-height: 20em; overflow: auto">
                            <div class="panel-block" v-for="(category, index) in appointmentCategories" :key="index"
                              :value="category">
                              <a @click="selectAppointmentCategory(category)">{{ category }}&nbsp;
                              </a><a class="has-text-danger" @click="deleteAppointmentCategory(category)"
                                v-if="category != 'Consultation'">DELETE</a>
                            </div>
                            <div class="panel-block">
                              <div class="has-text-centered">
                                <div class="field has-addons">
                                  <div class="control">
                                    <input class="input" type="text" v-model="appointmentCategory" />
                                  </div>
                                  <div class="control">
                                    <button class="button is-info" @click="addAppointmentCategory"
                                      :disabled="appointmentCategory == ''">Add</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div class="column">
                        <label class="label">Selected</label>
                        <div class="columns is-multiline">
                          <div class="column" id="selectedSpecializations">
                            <button v-for="(category, index) in selectedAppointmentCategories" :key="index"
                              class="button is-light" style="margin: 5px">
                              {{ category }}&nbsp;
                              <span class="has-text-danger" @click="undoAppointmentCategory(category)">X</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="field">
                      <div class="block"></div>
                      <div class="field">
                        <label class="label">Payment Amount: </label>
                        <div class="control">
                          <input type="number" class="input" placeholder="amount" v-model="paymentAmount"
                            style="width: 33%;" />
                        </div>
                      </div>
                      <p class="help">Make sure you have successfully <b>activated your account</b>
                        and had
                        already setup your <b>Payment methods</b> under
                        <b>Verification and Information</b>. Failing to setup your payment methods might delay your
                        payout every week.
                      </p>
                    </div>
                    <br />
                    <div class="block">
                      <button class="button" :class="{ 'is-primary': !updateSchedule, 'is-info': updateSchedule }"
                        type="button" @click="uploadSched"
                        :disabled="selectedAppointmentCategories.length == 0 || !paymentAmount">{{
                          updateSchedule ? 'Update Schedule'
                          :
                          'Add Schedule'
                        }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
          </div>
          <!--modal loader-->
          <div class="modal" :class="{ 'is-active': loading }">
            <div class="modal-background"></div>
            <div class="modal-content loader"></div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="notification is-success has-text-centered" v-if="uploadSchedSuccess">Schedules Added/Updated!
              </div>
              <v-calendar :columns="$screens({ default: 1, lg: 2 })" :rows="$screens({ default: 1, lg: 2 })"
                :is-expanded="$screens({ default: true, lg: false })" v-model="date" :min-date="new Date()"
                :disabled-dates="[{ start: new Date(), end: new Date() }]" :attributes="attributes"
                @dayclick="modalSchedPrompt" :timezone="timezone" />
            </div>
            <div class="column">
              <div class="container">
                <h1 class="subtitle has-text-weight-bold">Ongoing Schedules:</h1>
                <div class="columns is-multiline is-vcentered" style="overflow: scroll; max-height: 30em"
                  v-if="Object.keys(daysIndexed).length !== 0">
                  <div class="column is-6" v-for="schedules in daysIndexed" :key="schedules.id">
                    <div class="block card">
                      <div class="card-content">
                        <div class="buttons is-right">
                          <button class="button" @click="modalSchedEdit(schedules)"><i
                              class="fa-solid fa-pen-to-square"></i></button>
                          <button class="button" @click="modalSchedDelete(schedules.dayDetail)"><i
                              class="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div class="content">
                          <p class="title is-5 has-text-black has-text-left">{{ new Date(schedules.date).toDateString()
                          }}</p>
                          <p class="has-text-black">Prefix: {{ schedules.prefix }}</p>
                          <p class="has-text-black">Hospital: {{ schedules.hospital }}</p>
                          <p class="has-text-black">{{ schedules.timeStart }} - {{ schedules.timeEnd }}</p>
                          <p class="has-text-black">Appointment limit: {{ schedules.appointmentLimit }}</p>
                          <p class="has-text-black">Payment Amount:
                            {{ schedules.paymentAmount }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="notification is-warning" v-else>
                  <h1 class="title is-5">No ongoing schedules.</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>