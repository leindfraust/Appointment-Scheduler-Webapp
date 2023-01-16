<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import socket from '../socket'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
    providerFinderMode: {
        type: Boolean,
        default: false
    },
    providerProvinces: {
        type: Array,
        default: undefined
    },
    providerList: {
        type: undefined,
        default: undefined
    },
    query: String
})
defineEmits(['unloadPropData'])
onMounted(async () => {
    await axios.get(`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/patients/${store.state.patientUsername}.jpg`).then(response => response.status == 200 ? store.commit('checkProfileImg', true) : store.commit('checkProfileImg', false)).catch(err => err ? store.commit('checkProfileImg', false) : store.commit('checkProfileImg', true))
    checkImgState.value = true

    if (store.state.patientID) {
        socket.connect()
        socket.emit('join room', store.state.patientID)
        socket.on('send messages', (response) => {
            notifications.value = response
        });
        socket.on('delete messages', (response) => {
            notifications.value = response
        });
        socket.on('messages', (response) => {
            notifications.value = response
        });
    }
})

const isActiveNotifications = ref(false)
const isActiveModal = ref(false)
const isActiveProfileDropdown = ref(false)
//const isActiveMenuDropdown = ref(false)
const isActive = ref(false)
const patient = store.state.patientUsername
const notifications = ref([])
const viewNotif = ref([])
const checkImgState = ref(false)
const queryInput = ref(props.query)

function navbar() {
    isActive.value = !isActive.value
}
async function logout() {
    store.commit("patientID", null);
    store.commit("patientUsername", '');
    await axios.delete("/session/patient");
    await this.$router.push("");
    socket.disconnect();
}
function notification() {
    isActiveNotifications.value = !isActiveNotifications.value
}
async function deleteNotif(notif) {
    await axios.post('/api/imgUploadImgMsgDeletePatient', {
        id: 'assets/patientimgmsg/patientCopy/' + notif.id
    });
    socket.emit('delete message', store.state.patientID, notif)
}
function openNotif(notif, index) {
    viewNotif.value = notif
    isActiveModal.value = true
    if (viewNotif.value.new) {
        notifications.value[index].new = false
        socket.emit('update message', notifications.value)
    }
}
function closeNotificationModal() {
    isActiveModal.value = false
}
</script>
<template>
    <nav class="navbar" role="navigation" aria-label="main navigation"
        :class="{ 'provider-finder-mode': providerFinderMode }"
        style="background-color: transparent; border-bottom:  0.5px solid #969696;">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="../assets/images/logos/medi-search-horizontal.png" />
            </a>
            <router-link :to="'/about'" class="navbar-item is-hidden-desktop is-hidden-tablet">About</router-link>
            <router-link :to="'/contactus'" class="navbar-item is-hidden-desktop is-hidden-tablet">Contact</router-link>
            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" aria-label="menu"
                aria-expanded="false" data-target="navbar" @click="navbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link :to="'/about'" class="navbar-item">About</router-link>
                <router-link :to="'/contactus'" class="navbar-item">Contact</router-link>
            </div>
            <div class="field has-addons navbar-item" style="margin-left: auto" v-if="providerFinderMode">
                <div class="control has-icons-left">
                    <input class="input is-rounded" type="text" v-model="queryInput" style="width: 350px;"
                        placeholder="Search..." list="providers" @keyup.enter="$emit('unloadPropData', queryInput)" />
                    <span class="icon is-small is-left has-text-info">
                        <i class="fa-solid fa-location-dot"></i>
                    </span>
                </div>
                <datalist id="providers">
                    <option v-for="geodata in providerProvinces" :key="geodata._id">
                        {{ geodata.province }}</option>
                    <option v-for="provider in providerList" :key="provider._id">
                        {{ provider.hospital }}</option>
                </datalist>
                <div class="control">
                    <button class="button is-info is-rounded" :disabled="queryInput == ''"
                        @click="$emit('unloadPropData', queryInput)">Search</button>
                </div>
            </div>
        </div>
        <div id="navbar" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="field has-addons navbar-item is-hidden-desktop is-hidden-tablet" v-if="providerFinderMode">
                <div class="control has-icons-left">
                    <input class="input is-rounded" type="text" v-model="queryInput" style="width: 200px;"
                        placeholder="Search..." list="providers" @keyup.enter="$emit('unloadPropData', queryInput)" />
                    <span class="icon is-small is-left has-text-info">
                        <i class="fa-solid fa-location-dot"></i>
                    </span>
                </div>
                <datalist id="providers">
                    <option v-for="geodata in providerProvinces" :key="geodata._id">
                        {{ geodata.province }}</option>
                    <option v-for="provider in providerList" :key="provider._id">
                        {{ provider.hospital }}</option>
                </datalist>
                <div class="control">
                    <button class="button is-info is-rounded" :disabled="queryInput == ''"
                        @click="$emit('unloadPropData', queryInput)">Search</button>
                </div>
            </div>
            <div class="navbar-end" v-if="patient != ''">
                <div class="navbar-item has-dropdown" :class="{ 'is-active': isActiveNotifications }">
                    <a class="navbar-link" @click="notification"><span class="has-text-danger"
                            v-if="notifications.find(x => x.new === true)"><i
                                class="fa-solid fa-bell animate__animated animate__heartBeat animate__infinite"><span
                                    class="is-size-7">{{
                                        notifications.filter(x =>
                                            x.new).length
                                    }}</span></i></span><span class="has-text-info" v-else><i
                                class="fa-solid fa-bell"></i></span></a>
                    <div class="navbar-dropdown is-right notif-list" v-if="notifications.length !== 0">
                        <div class="navbar-item" v-for="(notifs, index) in notifications.sort((a, b) => {
                            return new Date(b.date).getTime() - new Date(a.date).getTime()
                        })" :key="index">
                            <div class="notification is-info" :class="{ 'is-light': !notifs.new }" style="width: 20rem">
                                <a style="text-decoration: none;" @click="openNotif(notifs, index)">{{ notifs.subject }}
                                    <p class="help">{{
                                        notifs.from == 'Medic Search' ? `From ${notifs.from}` : `From
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
                        <figure class="image" v-if="store.state.checkProfileImg">
                            <img class="is-rounded"
                                :src="`https://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/patients/${$store.state.patientUsername}.jpg`">
                        </figure>
                        <figure class="image" v-else>
                            <img class="is-rounded"
                                :src="`https://ui-avatars.com/api/?name=${store.state.patientUsername}`">
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
            </div>
            <div class="navbar-end" v-else>
                <div class="navbar-item">
                    <router-link :to="'/account/login'" class="button is-dark is-inverted is-medium"
                        style="background-color: transparent">Sign In</router-link>
                </div>
                <div class="navbar-item">
                    <router-link :to="'/user/signup'" class="button is-info is-medium">
                        <strong>Sign up</strong>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
    <!--Modal for notifications-->
    <div class="modal" :class="{ 'is-active': isActiveModal }">
        <div class="modal-background"></div>
        <div class="modal-content box">
            <section class="section">
                <p class="title">{{
                    viewNotif.from == 'Medic Search' ? `From ${viewNotif.from}` : `From
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
<style scoped>
.notif-list {
    max-height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
}

.provider-finder-mode {
    padding: 1.5% !important;
    background-color: rgba(216, 229, 255, 0.44) !important;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 0px !important;
}

[list]::-webkit-calendar-picker-indicator {
    opacity: 0 !important;
}
</style>