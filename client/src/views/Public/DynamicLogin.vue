<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import ForgotPassword from '../../components/ForgotPassword.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const authProgress = ref(false)

const username = ref(null)
const password = ref(null)
const dynamicUser = ref(null)
const validateMessage = ref(null)
const incorrectUserPass = ref(Boolean)
const newAccount = ref(false)
const forgotPasswordCount = ref(0)
const fetchingAuth = ref(false)

onMounted(async () => {
    if (store.state.accountCreated == true) {
        newAccount.value = true
        store.commit('accountCreated', false)
    }
})
onBeforeMount(async () => {
    await axios.get("/session/patient").then(async response => {
        if (typeof response.data.username !== 'undefined' && !response.data.alias && !response.data.hospital) {
            store.commit("patientUsername", response.data.username)
            store.commit("patientID", response.data._id)
            await router.push(`/user/${store.state.patientUsername}`);
        }
    })
    await axios.get("/session/doctor").then(async response => {
        if (typeof response.data.alias !== 'undefined') {
            store.commit("alias", response.data.alias);
            store.commit("doctorID", response.data._id);
            store.commit("doctorName", response.data.fullname);
            await router.push(`/doctor/${store.state.alias}/appointments`);
        }
    })
    await axios.get("/session/manager").then(async response => {
        if (typeof response.data.hospital !== 'undefined') {
            store.commit("managerHospital", response.data.hospital);
            await router.push(`/manager/${store.state.managerHospital}`);
        }
    })
})

async function authPatient() {
    await axios
        .post("/api/auth/patient", {
            username: username.value,
            password: password.value
        })
        .then(
            async (response) => {
                dynamicUser.value = await response.data
                // if username and password matched to a patient
                if (await dynamicUser.value) {
                    authProgress.value = false
                    await axios.post("/session/patient", {
                        _id: dynamicUser.value._id,
                        name: dynamicUser.value.name,
                        email: dynamicUser.value.gmail,
                        username: username.value,
                        province: dynamicUser.value.province,
                        city: dynamicUser.value.city,
                        currentAddress: dynamicUser.value.currentAddress
                    });
                    store.commit("patientUsername", dynamicUser.value.username)
                    store.commit("patientID", dynamicUser.value._id)
                    if (store.state.patientUsername == dynamicUser.value.username) {
                        await router.push(`/user/${store.state.patientUsername}`);
                    }
                }
            })
}
async function authDoctor() {
    await axios
        .post("/api/auth/doctor", {
            username: username.value,
            password: password.value
        })
        .then(
            async (response) => {
                dynamicUser.value = await response.data
                // if username and password matched to a doctor
                if (await dynamicUser.value) {
                    authProgress.value = false
                    await axios.post("/session/doctor", {
                        verified: dynamicUser.value.verified,
                        _id: dynamicUser.value._id,
                        licenseNo: dynamicUser.value.licenseNo,
                        alias: dynamicUser.value.alias,
                        fullname: dynamicUser.value.name,
                        specialist: dynamicUser.value.specialist,
                        gmail: dynamicUser.value.gmail,
                        hospitalOrigin: dynamicUser.value.hospitalOrigin,
                        schedule: dynamicUser.value.schedule,
                        username: dynamicUser.value.username,
                        messageHistory: dynamicUser.value.messageHistory,
                        appointmentCategories: dynamicUser.value.appointmentCategories,
                        paymentMethods: dynamicUser.value.paymentMethods
                    });
                    store.commit("alias", dynamicUser.value.alias);
                    store.commit("doctorID", dynamicUser.value._id);
                    store.commit("doctorName", dynamicUser.value.name);
                    if (store.state.alias == dynamicUser.value.alias) {
                        await router.push(`/doctor/${store.state.alias}/appointments`);
                    }
                }
            })
}
async function providerLogin() {
    await axios
        .post("/api/auth/manager", {
            username: username.value,
            password: password.value
        })
        .then(async (response) => {
            dynamicUser.value = await response.data
            if (await dynamicUser.value) {
                await axios.post("/session/manager", {
                    _id: dynamicUser.value._id,
                    registrationCode: dynamicUser.value.registrationCode,
                    hospital: dynamicUser.value.hospital
                });
                store.commit("managerHospital", dynamicUser.value.hospital);
                if (store.state.managerHospital == dynamicUser.value.hospital) {
                    await router.push(`/manager/${store.state.managerHospital}`);
                }
            }
        });
}
async function login() {
    fetchingAuth.value = true
    if (username.value == null || password.value == null) {
        incorrectUserPass.value = false;
        validateMessage.value = "empty username or password";
        username.value = null
        password.value = null
    } else {
        authProgress.value = true
        while (authProgress.value) {
            await authPatient()
            await authDoctor()
            await providerLogin()
            authProgress.value = false
            forgotPasswordCount.value = forgotPasswordCount.value + 1
            validateMessage.value = "Incorrect username or password";
            incorrectUserPass.value = true;
            username.value = null;
            password.value = null;
        }
        fetchingAuth.value = false
    }
}
</script>
<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="container has-text-centered animate__animated animate__fadeInLeft">
                    <div class="box" style="width: 35%; margin: auto">
                        <div class="notification is-success" v-if="newAccount">Your account has been successfully
                            created.</div>
                        <br />
                        <h1 class="title has-text-info has-text-centered">MEDIC SEARCH</h1>
                        <div class="field">
                            <div class="control">
                                <input class="input is-rounded" type="text" v-model="username" placeholder="username"
                                    @keyup.enter="login" required />
                            </div>
                            <div class="control" style="margin-top: 2%">
                                <input class="input is-rounded" type="password" v-model="password" placeholder="password"
                                    @keyup.enter="login" required />
                            </div>
                            <h1 v-if="incorrectUserPass" class="subtitle has-text-danger">{{ validateMessage }}</h1>
                            <h1 v-else-if="incorrectUserPass == false" class="subtitle has-text-danger">{{
                                validateMessage
                            }}</h1>
                            <button type="button" class="button is-info is-rounded" @click="login"
                                :class="{ 'is-loading': fetchingAuth }">Login</button>
                            <br />
                            <br />
                            <a href="/user/signup">Create an account</a>
                        </div>
                        <ForgotPassword :forgotPasswordPromptCount="forgotPasswordCount" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.hero {
    background: no-repeat center url('../../assets/images/background-login.png');
    background-size: cover;
}

@media (max-width: 991.98px) {
    .box {
        width: 100% !important;
    }
}
</style>