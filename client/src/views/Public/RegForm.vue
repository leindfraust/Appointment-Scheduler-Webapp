<template>
  <NavigationTab />
  <section class="section" style="background-color: whitesmoke;">
    <div class="modal" :class="{ 'is-active': isLoading }">
      <div class="modal-background"></div>
      <div class="modal-content" style="overflow: hidden">
        <div class="loader" style="margin: auto;"></div>
      </div>
    </div>
    <div class="notification is-danger" v-if="errMsg">Something went wrong, please try again later or <a
        href="/contactus">Contact us</a></div>
    <div class="container">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active': isActiveTabOne }">
            <a style="pointer-events: none;">Basic Details</a>
          </li>
          <li :class="{ 'is-active': isActiveTabTwo }">
            <a style="pointer-events: none;">Schedules</a>
          </li>
        </ul>
      </div>
      <section class="section animate__animated animate__fadeInLeft"
        style="width: 40%; margin: auto; background-color: white; border-radius: 5px; box-shadow: 5px 10px rgb(221, 221, 221);">
        <form class="field">
          <div v-if="!basicDetailsDone">
            <div class="has-text-danger">All fields are required.*</div>
            <label class="label">First name</label>
            <div class="control">
              <input class="input" type="text" :value="firstName" placeholder="First Name" required />
            </div>
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" v-model="lastName" placeholder="Last Name" required />
            </div>
            <label class="label">Contact Number:</label>
            <div class="block control">
              <input class="input" type="number" v-model="contactNum" placeholder="Contact Number" required />
            </div>
            <label class="label">What are you feeling?</label>
            <textarea class="textarea" v-model="comments" placeholder="Your symptoms, general well being etc..."
              required></textarea>
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
            <div class="block control">
              <label class="label">Current Address</label>
              <input class="input" type="text" :value="currentAddress" />
            </div>
            <br />
            <div class="block has-text-centered">
              <button type="button" class="button is-success"
                :disabled="firstName == '' || lastName == '' || birthDay == null || contactNum == '' || comments == '' || currentAddress == ''"
                @click="proceedSched">Proceed</button>
            </div>
          </div>
        </form>
        <br />
        <div v-if="basicDetailsDone">
          <form class="field">
            <h1 class="subtitle has-text-black has-text-weight-bold">Pick your preferred schedule: </h1>
            <div
              v-for="(schedules, index) in doctorSched.filter(x => new Date(x.date).getTime() > new Date().getTime() && x.hospital === hospital).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())"
              :key="schedules.id" style="width: 75%; margin:auto">
              <hr />
              <div class="controls">
                <label class="radio">
                  <input type="radio" class="radioSched" name="schedule"
                    @click="pickSched(index, schedules, schedules.prefix)" />
                  <span class="subtitle has-text-black">{{ new Date(schedules.date).toDateString() }}</span>
                  <br />
                  <span class="has-text-black">{{ schedules.timeStart }} - {{ schedules.timeEnd }}</span>
                </label>
                <a style="pointer-events: none;" class="button statusSched">
                  <span v-if="schedAvailability" class="has-text-success">Available</span>
                  <span v-else class="has-text-danger">Unavailable</span>
                </a>
              </div>
              <br />
            </div>
            <br />
            <br />
            <div class="block has-text-centered">
              <span>
                <button class="button is-danger" type="button" style="margin-right: 5%" @click="goBack">Go Back</button>
                <button type="button" class="button is-primary" :disabled="schedule == null" @click="appoint">Submit
                  appointment</button>
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "../../store";
import NavigationTab from "../../components/NavigationTab.vue";

export default {
  name: "RegForm",
  components: {
    NavigationTab
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
      basicDetailsDone: false,
      isActiveTabOne: true,
      isActiveTabTwo: false,
      isLoading: false,
      schedAvailability: false,
      radioIndex: null,
      prefix: null,
      hospital: store.state.hospitalName,
      refID: null,
      errMsg: false
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
        .get("/api/appointmentList")
        .then(
          (response) =>
          (this.patientsAppointed =
            response.data.filter(
              (e) =>
                e.schedule[0].date === this.schedule.date &&
                e.doctorID == this.doctorDetails._id
            ).length));
      //check how many appointed patients in regards to the appointment limit set by the doctor
      if (await this.patientsAppointed < this.schedule.appointmentLimit) {
        //if success
        await axios
          .get("/api/appointmentList")
          .then(
            (response) =>
            (this.priorityNum =
              response.data.filter(
                (e) =>
                  e.schedule[0].date === this.schedule.date &&
                  e.doctorID == this.doctorDetails._id
              ).length + 1)
          );
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
              priorityNum: this.prefix + "-" + this.priorityNum,
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
              priorityNum: this.prefix + "-" + this.priorityNum,
            };
            store.commit("patientDetails", patientDetails);
            store.commit("appointed", true)
            await this.$router.push("/success").catch(err => console.log(err));
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
              priorityNum: this.prefix + "-" + this.priorityNum,
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
              priorityNum: this.prefix + "-" + this.priorityNum,
            };
            this.isLoading = false
            store.commit("patientDetails", patientDetails);
            store.commit("appointed", true)
            await this.$router.push("/success").catch(err => console.log(err));
          } catch (err) {
            this.errMsg = err
          }
        }
        //if not
      } else {
        this.isLoading = false
        this.schedAvailability = false
        this.schedule = null
        radio[this.radioIndex].checked = false
        radio[this.radioIndex].disabled = true
        statusSched[this.radioIndex].style.display = 'block'
      }
    },
    proceedSched() {
      this.isActiveTabOne = false
      this.isActiveTabTwo = true
      this.basicDetailsDone = true
    },
    goBack() {
      this.isActiveTabOne = true
      this.isActiveTabTwo = false
      this.basicDetailsDone = false
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
      await axios
        .get("/api/appointmentList")
        .then(
          (response) =>
          (this.patientsAppointed =
            response.data.filter(
              (e) =>
                e.schedule[0].date === this.schedule.date &&
                e.doctorID == this.doctorDetails._id
            ).length));
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