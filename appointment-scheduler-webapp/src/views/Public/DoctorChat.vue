<template>
  <div class="columns">
    <div class="column is-2">
      <aside class="menu">
        <ul class="menu-list" v-for="room in rooms">
          <div class="container" style="padding: 5px">
            <li>
              <a @click="pickChat(room._id, room.roomID)"><span v-if='userType == "patient"'>{{ room.doctorName }}</span><span v-else-if='userType == "doctor"'>{{ room.patientName }}</span></a>
            </li>
          </div>
        </ul>
      </aside>
    </div>
    <div class="column" style="margin-top:5%;">
      <div class="container" id="chatbox" style="margin-right: 30%">
        <div v-for="(message, index) in messages" :key="index">
          <!--<h2 v-if="this.username" class="subtitle has-text-right">{{message.message}}</h2>-->
          <h2 class="subtitle">
            <b>{{ message.user }}</b><span><p style="font-size: 12px; margin-bottom: 1%">{{message.date }}</p></span>
            <div style="margin-bottom: 1%">{{ message.message }}</div>
          </h2>
        </div>
        <br />
        <input type="input" class="input" v-model="input" placeholder="e.g. Hello world" />
        <div class="button is-success" @click="sendMessage($event, this.input)">Send</div>
      </div>
    </div>
  </div>
</template>
<script>
import socket from '../../socket'
import axios from 'axios'

export default {
  name: "DoctorChat",
  data() {
    return {
      rooms: [],
      input: null,
      messages: [],
      currentUser: null,
      userType: this.$store.state.userType,
      username: null,
      socketUsername: null,
      currentRoom: null
    }
  },
  created() {
    document.addEventListener('beforeunload', this.disconnect)
  },
  async mounted() {
    socket.connect()
    if (await this.userType == "patient") {
      await axios.get("/session/patient").then(response => this.currentUser = response.data)
      await axios.get("/api/chatrooms")
      .then(
        (response) =>
        (this.rooms = response.data.filter(
          (x) => x.patient === this.currentUser._id
        ))
      );
    } else if(this.userType == "doctor") {
      axios.get("/session/admin").then(response => this.currentUser = response.data)
      await axios.get("/api/chatrooms")
      .then(
        (response) =>
        (this.rooms = response.data.filter(
          (x) => x.doctor === this.currentUser._id
        ))
      );
    }
    socket.on('chat message', (msg, user, date) => {
      this.messages.push({
        user: user,
        message: msg,
        date: date
      })
    });
    socket.on('messages', (response) => {
      this.messages = response[0].messages
    });
  },
  methods: {
    disconnect() {
      socket.disconnect();
    },
    sendMessage(e, msg) {
      if (this.input === null) {
        e.preventDefault();
      } else {
        if(this.userType == "patient") {
          let date = new Date()
          socket.emit('message', msg, this.currentUser.username, date.toLocaleString())
          this.input = null
        } else if(this.userType == "doctor") {
          socket.emit('message', msg, this.currentUser.alias, date.toLocaleString())
          this.input = null
        }
      }
    },
    pickChat(id, roomID) {
      if(this.userType == "patient") {
          socket.emit('join room', roomID, this.currentUser.username)
          this.currentRoom = id
      } else if(this.userType == "doctor"){
          socket.emit('join room', roomID, this.currentUser.alias)
          this.currentRoom = id
      }
    }
  }
}
</script>
<style scoped>
@media (max-width: 991.98px) {
  #chatbox {
    margin-right: 0 !important;
  }
}
</style>