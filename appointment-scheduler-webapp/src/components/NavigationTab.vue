<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" />
            </a>

            <a
                role="button"
                class="navbar-burger"
                :class="{ 'is-active': isActive }"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar"
                @click="navbar"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-end">
                <a class="navbar-item">About</a>

                <a class="navbar-item">Support</a>
                <div class="navbar-item">
                    <div
                        class="dropdown"
                        v-if="patient != ''"
                        :class="{ 'is-active': isActiveNotifications }"
                    >
                        <div class="dropdown-trigger">
                            <a class="button" @click="notification">🔔</a>
                        </div>
                        <div class="dropdown-menu" v-if="notifications.length !== 0">
                            <div
                                class="dropdown-content"
                                v-for="(notifs, index) in notifications.sort((a, b) => {
                                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                                })"
                                :key="index"
                            >
                                <a @click="openNotif(notifs, index)">
                                    <div
                                        class="dropdown-item notification is-info" :class="{'is-light': !notifs.new}"
                                        style="margin: 5%"
                                    >
                                        <button class="delete" @click="deleteNotif(notifs)"></button>
                                        From Dr. {{ notifs.from }}
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="dropdown-menu" v-else>
                            <div class="dropdown-content">
                                <p class="dropdown-item">No new notifications.</p>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <a v-if="patient != ''" class="button is-light" href="#">
                            <img :src="imgPreUrl + patient + svgExtUrl" />
                            {{ patient }}
                        </a>
                        <div class="container" v-if="patient != ''"></div>
                        <a v-else class="button is-light" href="/user/login">Log in</a>
                        <a v-if="patient != ''" class="button is-danger" @click="logout">
                            <strong>Logout</strong>
                        </a>
                        <a v-else class="button is-primary" href="/user/signup">
                            <strong>Sign up</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!--Modal for notifications-->
    <div class="modal" :class="{ 'is-active': isActiveModal }">
        <div class="modal-background"></div>
        <div class="modal-content box">
            <section class="section">
                <p class="title">From Dr. {{ viewNotif.from }}</p>
                <p class="subtitle">{{ new Date(viewNotif.date).toDateString() }}</p>
                <p class="subtitle">{{ viewNotif.message }}</p>
            </section>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeNotificationModal"></button>
    </div>
</template>
<script>
import axios from 'axios'
import socket from '../socket'

export default {
    name: 'NavigationTab',
    mounted() {
        socket.emit('join room', this.$store.state.patientID)
        socket.on('send messages', (response) => {
            this.notifications = response
        });
        socket.on('delete messages', (response) => {
            this.notifications = response
        });
        socket.on('messages', (response) => {
            this.notifications = response
        });
    },
    data() {
        return {
            isActiveNotifications: false,
            isActiveModal: false,
            isActive: false,
            patient: this.$store.state.patientUsername,
            imgPreUrl: "https://avatars.dicebear.com/api/micah/",
            svgExtUrl: ".svg",
            notifications: [],
            viewNotif: []
        }
    },
    methods: {
        navbar() {
            this.isActive = !this.isActive
        },
        async logout() {
            await this.$store.commit("patientID", null);
            await this.$store.commit("patientUsername", '');
            await axios.delete("/session/patient");
            await this.$router.push("/user/login");
            socket.disconnect();
        },
        notification() {
            this.isActiveNotifications = !this.isActiveNotifications
        },
        deleteNotif(notif) {
            socket.emit('delete message', this.$store.state.patientID, notif)
        },
        openNotif(notif, index) {
            this.viewNotif = notif
            this.isActiveModal = true
            if(this.viewNotif.new){
                this.notifications[index].new = false
                socket.emit('update message', this.notifications)
            }

        },
        closeNotificationModal() {
            this.isActiveModal = false
        }
    }
}
</script>
<style scoped>
.dropdown-menu {
  max-height: 20em;
  overflow: auto;
}
</style>