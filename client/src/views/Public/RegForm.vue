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
          <div class="notification is-info">You have an existing appointment with the same schedule, do you want to
            continue with your appointment?</div>
          <div class="buttons is-centered">
            <button class="button" @click="reloadPage">No</button>
            <button class="button is-info" @click="appoint">Yes</button>
          </div>
        </section>
      </div>
    </div>
    <!-- New -->
    <div class="columns registration-form" style="width: 75%; margin: auto">
      <div class="column">
        <form>
          <div class="block">To book your appointment, we have to verify a few details.</div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">First name</label>
                <div class="control">
                  <input class="input" type="text" v-model="firstName" placeholder="First Name" required />
                </div>
              </div>
              <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="lastName" placeholder="Last Name" required />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">Contact Number:</label>
                <div class="control">
                  <input class="input" type="number" v-model="contactNum" placeholder="Contact Number" required />
                </div>
              </div>
              <div class="field">
                <label class="label">Birthdate</label>
                <div class="control">
                  <v-date-picker class="block" v-model="birthDay">
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="is-block">
                        <a style="margin: auto" @click="togglePopover()">
                          <input style="cursor: pointer;" :value="inputValue" class="input" readonly />
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
              <input class="input" type="text" :value="currentAddress" />
            </div>
          </div>
          <div class="field">
            <label class="label">Reason for your visit:</label>
            <textarea class="textarea" style="white-space: pre-wrap;" v-model="comments"
              placeholder="Your symptoms, general well being etc..." required></textarea>
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
                  @click="pickSched(index, schedules, schedules.prefix, schedules.appointmentCategories, schedules.paymentFirst, schedules.paymentAmount)" />
                <span class="subtitle is-6 has-text-weight-semibold">&nbsp;{{ new Date(schedules.date).toDateString()
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
            @click="checkAppointmentDuplication">Submit
            appointment</button>
        </div>
      </div>
    </div>
    <!-- New -->
  </section>
</template>

<script>
import axios from "axios";
import store from "../../store";
import NavigationTab from "../../components/NavigationTab.vue";
import CatchError from "../../components/CatchError.vue";
import PaymongoClient from 'paymongo.js'

export default {
  name: "RegForm",
  components: {
    NavigationTab,
    CatchError
  },
  data() {
    return {
      checkPatientRecord: null,
      patient: null,
      doctorSched: store.state.doctorDetails.schedule,
      firstName: null,
      lastName: null,
      birthDay: null,
      comments: null,
      contactNum: null,
      schedule: null,
      currentAddress: null,
      priorityNum: null,
      patientsAppointed: null,
      doctorDetails: store.state.doctorDetails,
      pickedSpecialization: store.state.pickedSpecialization,
      isLoading: false,
      schedAvailability: false,
      radioIndex: null,
      prefix: null,
      hospital: store.state.hospitalName,
      refID: null,
      errMsg: '',
      initialScheduleCheck: true,
      appointmentCategory: '',
      appointmentCategories: [],
      client: PaymongoClient(process.env.VUE_APP_PayMongoSK),
      checkoutUrl: '',
      paymentFirstToggle: false,
      paymentFirst: false,
      paymentAmount: '',
      paymentFailed: false,
      paymentStatus: store.state.paymentStatus,
      paymentSuccesPatientDetails: store.state.patientDetails,
      paymentWindowWaiting: false,
      doubleAppointmentID: false,
      multipleAppointment: false
    };
  },
  async created() {
    if (this.paymentStatus !== 'pending') {
      if (this.paymentStatus == 'failed') {
        this.paymentFailed = true
        store.commit("paymentStatus", 'pending')
      }
    }
  },
  async mounted() {
    this.doctorSched = this.doctorSched.filter(x => new Date(x.date).getTime() > new Date().getTime() && x.hospital === this.hospital).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    await axios.get('/session/patient').then(response => this.patient = response.data)
    this.firstName = await this.patient.name[0]
    this.lastName = await this.patient.name[1]
    this.checkPatientRecord = await this.doctorDetails.patients.find(x => x.patient === this.patient._id)
    this.currentAddress = await this.patient.currentAddress

    for await (const [index, schedules] of this.doctorSched.entries()) {
      await this.pickSched(index, schedules, schedules.prefix, schedules.appointmentCategories, schedules.paymentFirst, schedules.paymentAmount)
    }
    this.initialScheduleCheck = false

  },
  methods: {
    async checkAppointmentDuplication() {
      try {
        await axios.post('/api/appointmentList/check-double-appointment', {
          firstName: this.firstName,
          lastName: this.lastName,
          schedule: this.schedule,
          patientID: this.patient._id,
          doctorID: this.doctorDetails._id
        }).then(response => response.data ? this.doubleAppointmentID = response.data : this.doubleAppointmentID = false)
        if (!this.doubleAppointmentID) {
          await axios.post('/api/appointmentList/check-multiple-appointment', {
            schedule: this.schedule,
            patientID: this.patient._id,
            doctorID: this.doctorDetails._id
          }).then(response => response.data ? this.multipleAppointment = true : this.multipleAppointment = false)
        }
      } catch (err) {
        this.errMsg = err
      }
      if (!this.doubleAppointmentID && !this.multipleAppointment) {
        await this.appoint()
      }
    },
    async reAppointment() {
      await axios.delete(`/api/appointmentList/${this.doubleAppointmentID}`).catch(err => this.errMsg = err)
      this.doubleAppointmentID = false
      await this.appoint()
    },
    async appoint() {
      this.isLoading = true
      let radio = document.getElementsByClassName('radioSched');
      let statusSched = document.getElementsByClassName('statusSched')
      //check appointed patients in the selected date
      await axios
        .post("/api/appointmentList/doctors/checkPriority", {
          doctorID: this.doctorDetails._id,
          schedule: this.schedule.date
        }).then(response => this.patientsAppointed = response.data);
      //check how many appointed patients in regards to the appointment limit set by the doctor
      if (await this.patientsAppointed < this.schedule.appointmentLimit) {
        //if appointed patients is less then the appointment limit
        await axios
          .post("/api/appointmentList/doctors/checkPriority", {
            doctorID: this.doctorDetails._id,
            schedule: this.schedule.date
          }).then(response => this.priorityNum = response.data + 1);
        try {
          //if patient is new to the doctor, patient will be recorded as list of patients in doctor's profile
          if (typeof this.checkPatientRecord === 'undefined' || !this.checkPatientRecord) {
            await axios.post('/api/patientUpdate', {
              doctorID: this.doctorDetails._id,
              patientID: this.patient._id,
              patientFullName: this.firstName + " " + this.lastName
            });
          }
          this.generateRefID()

          await axios.put(`/api/manager/${store.state.hospitalDetails._id}`, {
            engagements: store.state.hospitalDetails.engagements + 5
          }); //added egagement just for hitting submit button

          await axios.post("/api/appointmentList", {
            referenceID: this.refID,
            hospital: this.hospital,
            doctorID: this.doctorDetails._id,
            doctorName: this.doctorDetails.name,
            doctorSpecialization: this.pickedSpecialization,
            patientID: this.patient._id,
            firstName: this.firstName,
            lastName: this.lastName,
            contactNum: this.contactNum,
            birthDay: this.birthDay.toDateString(),
            comments: this.comments,
            schedule: this.schedule,
            priorityNum: this.prefix ? this.prefix + "-" + this.priorityNum : this.priorityNum,
            appointmentCategory: this.appointmentCategory
          }).then(async response => {
            if (!this.paymentFirst) {
              store.commit("patientDetails", response.data);
              store.commit("appointed", true)
              await this.$router.push("/success");
            } else {
              store.commit("patientDetails", response.data);
              await this.createSource();
            }
          })
        } catch (err) { this.errMsg = err }
        //if not, it fails and disables the radio
      } else {
        this.schedAvailability = false
        this.schedule = null
        radio[this.radioIndex].checked = false
        radio[this.radioIndex].disabled = true
        statusSched[this.radioIndex].style.display = 'block'
      }
      this.isLoading = false
    },
    async pickSched(e, sched, prefix, category, paymentFirst, paymentAmount) {
      this.appointmentCategory = category[0]
      if (!this.initialScheduleCheck) {
        this.appointmentCategories = category
      }
      this.radioIndex = e
      this.isLoading = true
      let radio = document.getElementsByClassName('radioSched');
      let statusSched = document.getElementsByClassName('statusSched')
      for (let i = 0; i < statusSched.length; i++) {
        statusSched[i].style.display = 'none'
      }
      this.schedule = await sched;
      await axios.post("/api/appointmentList/doctors/checkPriority", {
        doctorID: this.doctorDetails._id,
        schedule: this.schedule.date
      }).then(response => this.patientsAppointed = response.data);
      //check how many appointed patients in regards to the appointment limit set by the doctor
      //if available
      if (await this.patientsAppointed < this.schedule.appointmentLimit) {
        this.isLoading = false
        if (!this.initialScheduleCheck) {
          this.schedAvailability = true
          this.prefix = prefix
          statusSched[e].style.display = 'block'
        }
        if (paymentFirst && !this.initialScheduleCheck) {
          this.paymentFirst = true
          this.paymentFirstToggle = true
          this.paymentAmount = paymentAmount
        }
        // if not available
      } else {
        this.isLoading = false
        this.schedAvailability = false
        this.schedule = null
        radio[e].checked = false
        statusSched[e].style.display = 'block'
        this.paymentFirst = false
        this.paymentAmount = ''
        if (this.initialScheduleCheck) {
          this.doctorSched = this.doctorSched.filter(schedule => schedule != sched)
        }
      }
      if (this.initialScheduleCheck) {
        this.schedule = null
      }
    },
    generateRefID() {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      this.refID = result.toUpperCase()
    },
    async createSource() {
      const route = location.origin
      try {
        await this.client.source.create({
          type: "gcash", // gcash | grab_pay
          currency: "PHP",
          amount: parseInt(`${this.paymentAmount}00`),
          redirect: {
            success: `${route}/payment-status`,
            failed: `${route}/payment-status`,
          },
        }).then(response => {
          this.checkoutUrl = response.data.attributes.redirect.checkout_url
          store.commit("paymentID", response.data.id)
        });
        if (this.checkoutUrl) {
          window.location.replace(this.checkoutUrl);
        }
      } catch (err) {
        this.isLoading = false
        this.errMsg = err
      }
    },
    reloadPage() {
      location.reload()
    }
  },
};
</script>

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