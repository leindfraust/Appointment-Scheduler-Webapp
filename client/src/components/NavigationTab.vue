<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="../assets/images/logos/medi-search-horizontal.png" />
            </a>

            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="navbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start is-hidden-desktop">
                <a class="navbar-item">About</a>
                <a class="navbar-item" @click="this.$router.push('/contactus')">Contact Us</a>
            </div>
            <div class="navbar-end" v-if="patient != ''">
                <div class="navbar-item has-dropdown" :class="{ 'is-active': isActiveNotifications }">
                    <a class="navbar-link" @click="notification"><span class="has-text-danger"
                            v-if="notifications.find(x => x.new === true)"><i
                                class="fa-solid fa-bell animate__animated animate__heartBeat animate__infinite"><span
                                    class="is-size-7">{{ notifications.filter(x =>
                                    x.new).length
                                    }}</span></i></span><span class="has-text-info" v-else><i
                                class="fa-solid fa-bell"></i></span></a>
                    <div class="navbar-dropdown is-right notif-list" v-if="notifications.length !== 0">
                        <div class="navbar-item" v-for="(notifs, index) in notifications.sort((a, b) => {
                            return new Date(b.date).getTime() - new Date(a.date).getTime()
                        })" :key="index">
                            <div class="notification is-info" :class="{ 'is-light': !notifs.new }">
                                <a style="text-decoration: none;" @click="openNotif(notifs, index)">{{ notifs.subject }}
                                    <p class="help">{{ notifs.from == 'Medic Search' ? `From ${notifs.from}` : `From
                                    Dr. ${notifs.from}`
                                    }}</p>
                                </a>
                                <button class="delete" @click="deleteNotif(notifs)"></button>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-dropdown is-right" v-else>
                        <div class="navbar-item">No new notifications.</div>
                    </div>
                </div>
                <div class="navbar-item has-dropdown" :class="{ 'is-active': isActiveProfileDropdown }"
                    @click="isActiveProfileDropdown = !isActiveProfileDropdown">
                    <a class="navbar-item is-hidden-mobile" v-if="checkImgState">
                        <figure class="image" v-if="$store.state.checkProfileImg">
                            <img class="is-rounded"
                                :src="`https://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/patients/${$store.state.patientUsername}.jpg`">
                        </figure>
                        <figure class="image" v-else>
                            <img class="is-rounded"
                                :src="`https://ui-avatars.com/api/?name=${this.$store.state.patientUsername}`">
                        </figure>
                    </a>
                    <div class="navbar-dropdown is-right">
                        <router-link :to="`/user/${patient}/profile`" class="navbar-item">Profile</router-link>
                        <router-link :to="`/user/${patient}/security`" class="navbar-item">Security</router-link>
                        <hr class="navbar-divider">
                        <a class="navbar-item has-text-danger" @click="logout">
                            <strong>Logout</strong>
                        </a>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hidden-mobile" :class="{ 'is-active': isActiveMenuDropdown }">
                    <a class="navbar-item" @click="isActiveMenuDropdown = !isActiveMenuDropdown"><i
                            class="fa-solid fa-bars"></i></a>
                    <div class="navbar-dropdown is-right">
                        <router-link :to="'/about'" class="navbar-item">About</router-link>
                        <router-link :to="'/contactus'" class="navbar-item">Contact Us</router-link>
                    </div>
                </div>
            </div>
            <div class="navbar-end" v-else>
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link :to="'/user/login'" class="button is-dark is-inverted"
                            style="background-color: transparent">Log in</router-link>
                        <router-link :to="'/user/signup'" class="button is-info">
                            <strong>Sign up</strong>
                        </router-link>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hidden-mobile" :class="{ 'is-active': isActiveMenuDropdown }">
                    <a class="navbar-item" @click="isActiveMenuDropdown = !isActiveMenuDropdown"><i
                            class="fa-solid fa-bars"></i></a>
                    <div class="navbar-dropdown is-right">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item" @click="this.$router.push('/contactus')">Contact Us</a>
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
                <p class="title">{{ viewNotif.from == 'Medic Search' ? `From ${viewNotif.from}` : `From
                Dr. ${viewNotif.from}`
                }}</p>
                <p class="subtitle">{{ new Date(viewNotif.date).toDateString() }}</p>
                <p class="subtitle">{{ viewNotif.message }}</p>
                <div v-if="viewNotif.id">
                    <figure class="image is-square">
                        <img loading="lazy"
                            :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${viewNotif.id}.jpg`" />
                    </figure>
                    <div class="has-text-centered">
                        <a :href="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patientimgmsg/patientCopy/${viewNotif.id}.jpg`"
                            class="button" download>Download File</a>
                    </div>
                </div>
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
    async mounted() {
        await axios.get(`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patients/${this.$store.state.patientUsername}.jpg`).then(response => response.status == 200 ? this.$store.commit('checkProfileImg', true) : this.$store.commit('checkProfileImg', false)).catch(err => err ? this.$store.commit('checkProfileImg', false) : this.$store.commit('checkProfileImg', true))
        this.checkImgState = true

        if (this.$store.state.patientID) {
            socket.connect()
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
        }
    },
    data() {
        return {
            isActiveNotifications: false,
            isActiveModal: false,
            isActiveProfileDropdown: false,
            isActiveMenuDropdown: false,
            isActive: false,
            patient: this.$store.state.patientUsername,
            notifications: [],
            viewNotif: [],
            checkImgState: false
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
        async deleteNotif(notif) {
            await axios.post('/api/imgUploadImgMsgDeletePatient', {
                id: 'assets/patientimgmsg/patientCopy/' + notif.id
            });
            socket.emit('delete message', this.$store.state.patientID, notif)
        },
        openNotif(notif, index) {
            this.viewNotif = notif
            this.isActiveModal = true
            if (this.viewNotif.new) {
                this.notifications[index].new = false
                socket.emit('update message', this.notifications)
            }
        },
        closeNotificationModal() {
            this.isActiveModal = false
        },
    }
}
</script>
<style scoped>
.notif-list {
    max-height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>