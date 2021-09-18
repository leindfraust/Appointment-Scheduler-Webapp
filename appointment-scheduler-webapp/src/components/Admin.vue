<template>
  <div class="columns">
    <div class="column is-1">
      <aside class="menu">
        <p class="menu-label">Hello, {{ alias }}</p>
        <figure class="media block">
          <p class="image is-64x64">
            <img :src="require(`../assets/doctors/${alias}` + '.jpg')" />
          </p>
        </figure>
        <button @click="logout" class="button is-danger" type="button">
          Logout
        </button>
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
          <li><a @click="routeHome">Home</a></li>
          <li><a @click="profile">Profile</a></li>
          <li><a @click="openSchedule">Schedule</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <section class="hero is-info is-fullheight">
        <div class="hero-body">
          <div class="container is-widescreen is-fullhd" style="padding: 15">
            <div
              class="block"
              v-for="(appointmentList, index) in appointmentSchedules"
              :key="index"
            >
              <h1 class="title">Schedule: {{ index }}</h1>
              <table
                class="table is-striped is-narrow is-fullwidth customField"
              >
                <thead>
                  <tr>
                    <th class="subtitle has-text-black-ter">Controls</th>
                    <th class="subtitle has-text-black-ter">Priority No.</th>
                    <th class="subtitle has-text-black-ter">First Name</th>
                    <th class="subtitle has-text-black-ter">Last Name</th>
                    <th class="subtitle has-text-black-ter">Contact Number</th>
                    <th class="subtitle has-text-black-ter">Birthday</th>
                    <th class="subtitle has-text-black-ter">Comments</th>
                  </tr>
                </thead>
                <tbody
                  v-for="appointments in appointmentList"
                  :key="appointments._id"
                >
                  <tr :href="appointments.link" target="_blank">
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
                    >
                      Edit
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
                          class="
                            field
                            customField
                            animate__animated animate__fadeInLeft
                            has-text-centered
                          "
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
                    <th class="subtitle has-text-black-ter">
                      {{ appointments.priorityNum }}
                    </th>
                    <td class="subtitle has-text-black-ter">
                      {{ appointments.firstName }}
                    </td>
                    <td class="subtitle has-text-black-ter">
                      {{ appointments.lastName }}
                    </td>
                    <td class="subtitle has-text-black-ter">
                      {{ appointments.contactNum }}
                    </td>
                    <td class="subtitle has-text-black-ter">
                      {{ appointments.birthDay }}
                    </td>
                    <td class="subtitle has-text-black-ter" style="width: 30%">
                      {{ appointments.comments }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import lodash from 'lodash'

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
        }),
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
            (x) => x.doctor === store.state.userID
          ))
      );
  },
  methods: {
    async logout() {
      store.commit("alias", null);
      await axios.delete("/session/user");
      await this.$router.push("/login");
    },
    async deleteData(_id) {
      await axios.delete(`/api/appointmentList/${_id}`);
      location.reload();
    },
    async updateData() {
      await axios.put(`/api/appointmentList/${this.id}`, {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAdd: this.emailAddress,
        contactNum: this.contactNum,
        birthDay: this.birthDay,
      });
      location.reload();
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
    async routeHome() {
      await this.$router.push(`/admin/user/${this.alias}`);
    },
    async profile() {
      await this.$router.push(`/admin/user/${this.alias}/profile`)
    },
    async openSchedule() {
      await this.$router.push(`/admin/user/${this.alias}/schedule`);
    },
  },
};
</script>

<style scoped>
.customField {
  padding: 1%;
  border-radius: 15px;
}
.customField,
.table {
  background-color: whitesmoke;
}
th {
  font-weight: bold;
}
.modal input {
  width: 300px !important;
}
@media (max-width: 991.98px) {
  section {
    width: 991.98px;
    overflow: scroll;
  }
  .modal input {
    width: 300px !important;
  }
}
</style>