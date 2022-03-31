<template>
  <div class="columns" style="height: 100vh; background-color: whitesmoke">
    <div class="column is-2" style="background-color: whitesmoke;" >
      <AdminMenu />
    </div>
    <div class="column" style="background-color: whitesmoke;">
      <section class="section" style="background-color: whitesmoke;">
      <h1 class="title" >APPOINTMENTS</h1>
        <div class="container is-widescreen is-fullhd" v-if="Object.keys(appointmentSchedules).length !== 0">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                style="width: 50% !important"
                v-model="searchBar"
                placeholder="Search..."
              />
            </div>
          </div>
          <div class="box" v-for="(appointmentList, index) in appointmentSchedules" :key="index" :style="new Date(index).toDateString() == new Date().toDateString() ? 'box-shadow: rgb(10 10 10 / 10%) 0px 0.5em 1em -0.125em, #485fc7 0px 0px 0px 1px !important;' : ''">
          <h1 class="subtitle" v-if="new Date(index).toDateString() == new Date().toDateString()"><b>TODAY</b></h1>
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
                    <button
                      class="dropdown-item button has-text-info"
                      type="button"
                      @click="
                        toggleModal(
                          appointments.firstName,
                          appointments.lastName,
                          appointments.emailAdd,
                          appointments.contactNum,
                          appointments.birthDay,
                          appointments._id
                        )
                      "
                    >Edit</button>
                    <br />
                    <div class="modal" :class="{ 'is-active': isActiveModal }">
                      <div class="modal-background"></div>
                      <div class="modal-content">
                        <form
                          class="field customField animate__animated animate__fadeInLeft has-text-centered"
                        >
                          <label class="label">First Name</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              v-model="firstName"
                              placeholder="First Name"
                              required
                            />
                          </div>
                          <label class="label">Last Name</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              v-model="lastName"
                              placeholder="Last Name"
                              required
                            />
                          </div>
                          <label class="label">Contact Number</label>
                          <div class="control">
                            <input
                              class="input"
                              type="number"
                              v-model="contactNum"
                              placeholder="Contact Number"
                              required
                            />
                          </div>
                          <label class="label">Birthday</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              v-model="birthDay"
                              placeholder="Birthday"
                              required
                            />
                          </div>
                          <button class="button is-primary" type="button" @click="updateData">Submit</button>
                        </form>
                      </div>
                      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
                    </div>
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
          <div class="notification is-info"><h1 class="title is-5">No upcoming appointments.</h1></div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store";
import _ from 'lodash'
import AdminMenu from "../../components/AdminMenu.vue";

export default {
  name: "Admin",
  components: {
    AdminMenu
  },
  data() {
    return {
      alias: store.state.alias,
      profileImg: store.state.profileImg,
      isActiveModal: false,
      id: null,
      firstName: null,
      lastName: null,
      birthDay: null,
      contactNum: null,
      searchBar: "",
      schedule: null,
      appointmentSched: [],
    };
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
          return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime()
        }).filter(x => { return new Date(x.schedule[0].date).toDateString() <= new Date().toDateString() })
        ,
        "schedule[0].date"
      );
    },
  },
  async mounted() {
    await axios
      .get("/api/appointmentList")
      .then(
        (response) =>
        (this.appointmentSched = response.data.filter(
          (x) => x.doctorID === store.state.userID
        ))
      );
  },
  methods: {
    async updateData() {
      await axios.put(`/api/appointmentList/${this.id}`, {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAdd: this.emailAddress,
        contactNum: this.contactNum,
        birthDay: this.birthDay,
      });
      await axios
        .get("/api/appointmentList")
        .then(
          (response) =>
          (this.appointmentSched = response.data.filter(
            (x) => x.doctorID === store.state.userID
          ))
        );
      this.isActiveModal = !this.isActiveModal;
    },
    async toggleModal(
      firstName,
      lastName,
      emailAdd,
      contactNum,
      birthDay,
      _id
    ) {
      this.isActiveModal = !this.isActiveModal;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAdd;
      this.contactNum = contactNum;
      this.birthDay = birthDay;
      this.id = _id;
    },
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
    width: 100% !important
  }
}
</style>