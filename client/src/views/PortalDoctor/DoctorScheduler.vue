<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column">
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
                      <input class="input" type="text" v-model="prefix" style="width: 33%;"
                        placeholder="e.g. ROOM305" />
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

<script>
import axios from "axios";
import store from "../../store";
import DoctorMenu from "../../components/DoctorMenu.vue"
import CatchError from "../../components/CatchError.vue";

export default {
  name: "SchedulerPage",
  components: {
    DoctorMenu,
    CatchError
  },
  data() {
    return {
      errMsg: '',
      alias: store.state.alias,
      profileImg: store.state.profileImg,
      userID: "",
      date: new Date(),
      timeStart: '',
      timeEnd: '',
      timezone: "Asia/Hong_Kong",
      prefix: '',
      days: [],
      day: '',
      appointmentLimits: 10,
      checkServer: null,
      toggleModalSchedule: false,
      uploadSchedSuccess: false,
      loading: false,
      hospitalList: [],
      selectedHospital: '',
      updateSchedule: false,
      appointmentCategory: '',
      appointmentCategories: [],
      selectedAppointmentCategories: [],
      paymentAmount: 500
    };
  },
  async mounted() {
    await axios.get("/session/doctor").then((response) => (this.days = response.data.schedule));
    await axios.get("/session/doctor").then(response => this.appointmentCategories = response.data.appointmentCategories)
    await axios.get("/session/doctor").then((response) => (this.userID = response.data._id));
    await axios.get("/session/doctor").then(response => this.hospitalList = response.data.hospitalOrigin)
    this.selectedHospital = await this.hospitalList[0].hospital
  },
  computed: {
    attributes() {
      return this.days.map((day) => ({
        highlight: true,
        dates: new Date(day.date).toDateString(),
        popover: {
          label: `${day.hospital}, ${day.timeStart} - ${day.timeEnd}`
        }
      }));
    },
    daysIndexed() {
      if (this.days !== '') {
        return this.sortDate()
      } else {
        return false
      }

    }
  },
  methods: {
    sortDate() {
      return this.days.filter(x => { return new Date(x.id) > new Date() }).sort((a, b) =>
        new Date(a.date).valueOf() - new Date(b.date).valueOf())
    },
    timeStringConvert(timeString, dateObject) {
      dateObject.setHours(timeString.substr(0, timeString.indexOf(":")))
      dateObject.setMinutes(timeString.substr(3, timeString.indexOf(":")))
      dateObject.setSeconds(timeString.substr(6, timeString.indexOf(":")))
      return dateObject
    },
    async uploadSched() {
      this.loading = true
      if (this.updateSchedule) {
        try {
          await axios.put(`/api/doctor/schedule_update/${this.userID}`, {
            schedule: {
              dayDetail: this.day,
              id: this.day.id,
              date: this.day.date,
              timeStart: this.timeStart.toLocaleTimeString(),
              timeEnd: this.timeEnd.toLocaleTimeString(),
              appointmentLimit: this.appointmentLimits,
              prefix: this.prefix,
              hospital: this.selectedHospital,
              appointmentCategories: this.selectedAppointmentCategories,
              paymentAmount: this.paymentAmount
            }
          }).then(async response => {
            await axios.put('/session/doctor', {
              schedule: response.data.schedule
            });
            this.days = [...response.data.schedule]
          });
        } catch (err) {
          this.errMsg = err
        }
      } else {
        this.days.push({
          dayDetail: this.day,
          id: this.day.id,
          date: this.day.date,
          timeStart: this.timeStart.toLocaleTimeString(),
          timeEnd: this.timeEnd.toLocaleTimeString(),
          appointmentLimit: this.appointmentLimits,
          prefix: this.prefix,
          hospital: this.selectedHospital,
          appointmentCategories: this.selectedAppointmentCategories,
          paymentAmount: this.paymentAmount
        });
        try {
          await axios.put(`/api/doctor/${this.userID}`, {
            schedule: this.days,
          });
          await axios.put("/session/doctor", {
            schedule: this.days,
          }).then(() => {
            setTimeout(async () => {
              await axios
                .get("/session/doctor")
                .then((response) => (this.days = [...response.data.schedule]));
            }, 500)
          });
        }
        catch (err) {
          this.errMsg = err
        }
      }
      this.toggleModalSchedule = false
      this.updateSchedule = false
      this.uploadSchedSuccess = true
      this.loading = false
    },
    async modalSchedDelete(day) {
      if (!day?.isDisabled) {
        this.toggleModalSchedule = true;
        const idx = this.days.findIndex((d) => d.id === day.id);
        if (idx >= 0) {
          this.loading = true
          this.days.splice(idx, 1);
          this.toggleModalSchedule = false;
          try {
            await axios.put(`/api/doctor/${this.userID}`, {
              schedule: this.days,
            });
            await axios.put("/session/doctor", {
              schedule: this.days,
            }).then(() => {
              setTimeout(async () => {
                await axios
                  .get("/session/doctor")
                  .then((response) => (this.days = [...response.data.schedule]));
              }, 500)
            });
          } catch (err) {
            this.errMsg = err
          }
          this.uploadSchedSuccess = true
          this.loading = false
        }
      }
    },
    async modalSchedPrompt(day) {
      if (!day?.isDisabled && day.attributes.length == 0) {
        this.toggleModalSchedule = true;
        this.day = day;
        this.timeStart = day.date;
        this.timeEnd = day.date;
      } else {
        const schedule = this.days.find(x => x.id == day.id)
        this.modalSchedEdit(schedule)
      }
    },
    async modalSchedEdit(schedule) {
      if (!schedule.dayDetail?.isDisabled) {
        this.updateSchedule = true
        this.toggleModalSchedule = true;
        this.prefix = schedule.prefix
        this.day = schedule.dayDetail;
        this.timeStart = this.timeStringConvert(schedule.timeStart, new Date(schedule.dayDetail.date))
        this.timeEnd = this.timeStringConvert(schedule.timeEnd, new Date(schedule.dayDetail.date))
        this.appointmentLimits = schedule.appointmentLimit
        this.selectedHospital = schedule.hospital
        this.selectedAppointmentCategories = [...schedule.appointmentCategories]
        this.paymentAmount = schedule.paymentAmount
      }
    },
    modalClose() {
      this.toggleModalSchedule = !this.toggleModalSchedule;
      this.updateSchedule = false
      this.prefix = ''
      this.day = ''
      this.timeStart = ''
      this.timeEnd = ''
      this.appointmentLimits = 10
      this.selectedAppointmentCategories = []
      this.appointmentCategory = ''
    },
    async addAppointmentCategory() {
      if (!this.appointmentCategories.find(x => x === this.appointmentCategory)) {
        this.appointmentCategories.push(this.appointmentCategory)
      }
      try {
        await axios.put(`/api/doctor/${this.userID}`, {
          appointmentCategories: this.appointmentCategories
        })
        await axios.put('/session/doctor', {
          appointmentCategories: this.appointmentCategories
        })
      } catch (err) {
        this.errMsg = err
      }
      this.appointmentCategory = ''
    },
    async deleteAppointmentCategory(category) {
      this.appointmentCategories = this.appointmentCategories.filter(x => x !== category)
      try {
        await axios.put(`/api/doctor/${this.userID}`, {
          appointmentCategories: this.appointmentCategories
        })
        await axios.put('/session/doctor', {
          appointmentCategories: this.appointmentCategories
        })
        this.undoAppointmentCategory(category)
      } catch (err) {
        this.errMsg = err
      }
    },
    selectAppointmentCategory(category) {
      if (!this.selectedAppointmentCategories.find(x => x === category)) {
        this.selectedAppointmentCategories.push(category)
      }
    },
    undoAppointmentCategory(category) {
      this.selectedAppointmentCategories = this.selectedAppointmentCategories.filter(x => x !== category)
    }
  },
};
</script>
<style scoped>

</style>