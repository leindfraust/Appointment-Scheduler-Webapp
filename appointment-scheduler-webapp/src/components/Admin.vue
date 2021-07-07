<template>
  <div class="columns">
    <div class="column is-1">
      <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <button @click="logout" class="button is-danger" type="button">Logout</button>
        <ul class="menu-list">
          <li>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="searchBar"
                  placeholder="Search..."
                />
              </div>
            </div>
          </li>
          <li><a>Profile</a></li>
          <li><a @click="openSchedule">Schedule</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <section class="hero is-primary is-fullheight" style="padding: 15">
        <div class="hero-body">
          <div class="container is-widescreen is-fullhd customField">
            <table class="table is-striped is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th class="subtitle has-text-black-ter">Controls</th>
                  <th class="subtitle has-text-black-ter">No.</th>
                  <th class="subtitle has-text-black-ter">First Name</th>
                  <th class="subtitle has-text-black-ter">Last Name</th>
                  <th class="subtitle has-text-black-ter">Email Address</th>
                  <th class="subtitle has-text-black-ter">Contact Number</th>
                  <th class="subtitle has-text-black-ter">Birthday</th>
                  <th class="subtitle has-text-black-ter">Schedule</th>
                </tr>
              </thead>
              <tbody
                v-for="(appointments, index) in appointmentSched"
                :key="appointments._id"
              >
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
                        appointments.sched,
                        appointments._id
                      )
                    "
                  >
                    Update
                  </button>
                  <button
                    class="dropdown-item button has-text-danger"
                    type="button"
                    @click="deleteData(appointments._id)"
                  >
                    Delete</button
                  ><br />
                  <div class="modal" :class="{ 'is-active': isActiveModal }">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                      <form
                        class="field customField animate__animated animate__fadeInLeft has-text-centered"
                      >
                        <label class="label">First Name</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="text"
                            v-model="firstName"
                            placeholder="First Name"
                            required
                          />
                        </div>
                        <label class="label">Last Name</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="text"
                            v-model="lastName"
                            placeholder="Last Name"
                            required
                          />
                        </div>
                        <label class="label">E-mail Address</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="text"
                            v-model="emailAddress"
                            placeholder="E-mail Address"
                            required
                          />
                        </div>
                        <label class="label">Contact Number</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="number"
                            v-model="contactNum"
                            placeholder="Contact Number"
                            required
                          />
                        </div>
                        <label class="label">Month</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="text"
                            v-model="month"
                            placeholder="Month"
                            required
                          />
                        </div>
                        <label class="label">Date</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="number"
                            v-model="dateNum"
                            placeholder="Date"
                            required
                          />
                        </div>
                        <label class="label">Day</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="text"
                            v-model="day"
                            placeholder="Day"
                            required
                          />
                        </div>
                        <label class="label">Stated Hour</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="number"
                            v-model="statedHr"
                            placeholder="Stated Hour"
                            required
                          />
                        </div>
                        <label class="label">Expiry Hour</label>
                        <div class="control">
                          <input
                            class="input customWidth"
                            type="number"
                            v-model="expireHr"
                            placeholder="Expiry Hour"
                            required
                          />
                        </div>
                        <button
                          class="button is-primary"
                          type="button"
                          @click="updateData"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                    <button
                      class="modal-close is-large"
                      aria-label="close"
                      @click="toggleModal"
                    ></button>
                  </div>
                  <th class="subtitle has-text-black-ter">{{ index + 1 }}</th>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.firstName }}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.lastName }}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.emailAdd }}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.contactNum }}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.birthDay}}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.sched.date }}
                  </td>
                  <td class="subtitle has-text-black-ter">
                    {{ appointments.sched.time }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import { mapState } from "vuex";

export default {
  name: "Admin",
  data() {
    return {
      alias: store.state.alias,
      isActiveModal: false,
      id: null,
      firstName: null,
      lastName: null,
      birthDay: null,
      sched: null
    };
  },
  computed: mapState(["appointmentSched"]),
  async mounted() {
    this.$store.dispatch("appointmentItems");
  },
  methods: {
    async logout(){
      store.commit("alias", null)
      await axios.delete('/session/user')
      await this.$router.push('/login')
    },
    async deleteData(_id) {
      await axios.delete(`/api/appointmentList/${_id}`);
      await this.$store.dispatch("appointmentItems");
    },
    async updateData() {
      await axios.put(`/api/appointmentList/${this.id}`, {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAdd: this.emailAddress,
        contactNum: this.contactNum,
        birthDay: this.birthDay,
        sched: this.sched,
      });
      await this.$store.dispatch("appointmentItems");
      this.isActiveModal = !this.isActiveModal;
    },
    async toggleModal(
      firstName,
      lastName,
      emailAdd,
      contactNum,
      birthDay,
      sched,
      _id
    ) {
      this.isActiveModal = !this.isActiveModal;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAdd;
      this.contactNum = contactNum;
      this.birthDay = birthDay;
      this.sched = sched;
      this.id = _id;
    },
    async openSchedule(){
      await this.$router.push(`/admin/user/${this.alias}/schedule`)
    },
  },
};
</script>

<style scoped>
.customField {
  padding: 1%;
  margin: auto;
  border-radius: 15px;
  width: 100%;
}
.customWidth {
  width: 50%;
}
.customField,
.table {
  background-color: whitesmoke;
}
th {
  font-weight: bold;
  font-size: 18px !important;
  max-width: 1000px !important;
}
@media (max-width: 991.98px) {
  .customField,
  table {
    width: 600% !important;
    overflow: auto;
  }
}
</style>