<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <form class="field customField animate__animated animate__fadeInLeft">
          <label class="label">First Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="firstName"
              placeholder="First Name"
            required/>
          </div>
          <label class="label">Last Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="lastName"
              placeholder="Last Name"
            required/>
          </div>
          <label class="label">E-mail Address</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="emailAddress"
              placeholder="E-mail Address"
            required/>
          </div>
          <label class="label">Contact Number:</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="contactNum"
              placeholder="Contact Number"
            required/>
          </div>
          <button class="button is-primary" @click="appoint">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "RegForm",
  data() {
    return {
      firstName: null,
      lastName: null,
      emailAddress: null,
      contactNum: null,
      month: store.state.month,
      dateNum: store.state.dateNum,
      day: store.state.day,
      statedHr: store.state.statedHr,
      expireHr: store.state.expireHr,
    };
  },
  methods: {
    async appoint() {
      if(firstName == null || lastName == null || emailAddress == null || contactNum == null){
        console.log('hakdog')
      } else {
      await axios.post("api/appointmentList", { 
        firstName: this.firstName,
        lastName: this.lastName,
        emailAdd: this.emailAddress,
        contactNum: this.contactNum,
        month: this.month,
        day: this.day,
        dateNum: this.dateNum,
        statedHr: this.statedHr,
        expireHr: this.expireHr,
      });
    }}
  },
};
</script>

<style scoped>
.customField {
  width: 50%;
  margin: auto;
  padding: 50px;
  background-color: whitesmoke;
  border-radius: 15px;
}
input {
  width: 75%;
}
button {
  margin-top: 15px;
  margin-right: 60%;
}
@media (max-width: 991.98px) {
  .customField {
    width: 100% !important;
  }
  input {
    width: 100% !important;
  }
}
</style>