<template>
  <NavigationTab />
  <section class="section">
    <CatchError :err-msg="errMsg" />
    <div class="modal" :class="{ 'is-active': isLoading }">
      <div class="modal-background"></div>
      <div class="modal-content" style="overflow: hidden">
        <div class="loader" style="margin: auto;"></div>
      </div>
    </div>
    <!-- New -->
    <div class="columns" style="width: 75%; margin: auto">
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
                <label class="label">Birthday</label>
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
          <div
            v-for="(schedules, index) in doctorSched.filter(x => new Date(x.date).getTime() > new Date().getTime() && x.hospital === hospital).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())"
            :key="schedules.id" style="width: 75%; margin:auto">
            <div class="block"></div>
            <div class="controls">
              <label class="radio">
                <input type="radio" class="radioSched" name="schedule"
                  @click="pickSched(index, schedules, schedules.prefix)" />
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
        <div class="block has-text-centered">
          <button type="button" class="button is-info"
            :disabled="comments == null || schedule == null || firstName == '' || lastName == '' || birthDay == null || contactNum == '' || comments == '' || currentAddress == ''"
            @click="appoint">Submit
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
      errMsg: ''
    };
  },
  async mounted() {
    await axios.get('/session/patient').then(response => this.patient = response.data)
    this.firstName = await this.patient.name[0]
    this.lastName = await this.patient.name[1]
    this.checkPatientRecord = await this.doctorDetails.patients.find(x => x.patient === this.patient._id)
    this.currentAddress = await this.patient.currentAddress
  },
  methods: {
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
        //if success
        await axios
          .post("/api/appointmentList/doctors/checkPriority", {
            doctorID: this.doctorDetails._id,
            schedule: this.schedule.date
          }).then(response => this.priorityNum = response.data + 1);
        //if patient is new to the doctor, patient will be recorded as list of patients in doctor's profile
        if (typeof this.checkPatientRecord === 'undefined' || !this.checkPatientRecord) {
          try {
            this.generateRefID()

            await axios.post('/api/patientUpdate', {
              doctorID: this.doctorDetails._id,
              patientID: this.patient._id,
              patientFullName: this.firstName + " " + this.lastName
            });
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
            });
            await axios.put(`/api/manager/${store.state.hospitalDetails._id}`, {
              ratings: store.state.hospitalDetails.ratings + 5
            });
            let patientDetails = {
              referenceID: this.refID,
              hospital: this.hospital,
              doctor: this.doctorDetails.name,
              specialization: this.pickedSpecialization,
              firstName: this.firstName,
              lastName: this.lastName,
              contactNum: this.contactNum,
              birthDay: this.birthDay.toDateString(),
              comments: this.comments,
              schedule: this.schedule,
              priorityNum: this.prefix ? this.prefix + "-" + this.priorityNum : this.priorityNum,
            };
            store.commit("patientDetails", patientDetails);
            store.commit("appointed", true)
            await this.$router.push("/success");
          } catch (err) { this.errMsg = err }
        } else {
          try {
            this.generateRefID()

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
            });
            await axios.put(`/api/manager/${store.state.hospitalDetails._id}`, {
              ratings: store.state.hospitalDetails.ratings + 5
            });
            let patientDetails = {
              referenceID: this.refID,
              hospital: this.hospital,
              doctor: this.doctorDetails.name,
              specialization: this.pickedSpecialization,
              firstName: this.firstName,
              lastName: this.lastName,
              contactNum: this.contactNum,
              birthDay: this.birthDay.toDateString(),
              comments: this.comments,
              schedule: this.schedule,
              priorityNum: this.prefix ? this.prefix + "-" + this.priorityNum : this.priorityNum,
            };
            store.commit("patientDetails", patientDetails);
            store.commit("appointed", true)
            await this.$router.push("/success");
          } catch (err) {
            this.errMsg = err
          }
        }
        //if not
      } else {
        this.schedAvailability = false
        this.schedule = null
        radio[this.radioIndex].checked = false
        radio[this.radioIndex].disabled = true
        statusSched[this.radioIndex].style.display = 'block'
      }
      this.isLoading = false
    },
    async pickSched(e, sched, prefix) {
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
        this.schedAvailability = true
        this.prefix = prefix
        statusSched[e].style.display = 'block'
        // if not available
      } else {
        this.isLoading = false
        this.schedAvailability = false
        this.schedule = null
        radio[e].checked = false
        radio[e].disabled = true
        statusSched[e].style.display = 'block'
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
    }
  },
};
</script>

<style scoped>
.statusSched {
  display: none;
}
</style>