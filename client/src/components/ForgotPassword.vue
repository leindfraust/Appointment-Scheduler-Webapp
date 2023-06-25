<script setup>
import { ref, computed } from 'vue'
import axios from 'axios';

const isLoading = ref(false)
const errMsg = ref('')
const modal = ref(false)
const emailExists = ref(false)
const code = ref('')
const codeSent = ref(false)
const codeVerified = ref(false)
const codeIncorrect = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const passwordNotMatch = ref(false)
const passwordChanged = ref(false)
const noUserFound = ref(false)
const checkOTP = ref(false)
const userData = ref('')
const usernameHandler = ref(props.username)
const emailHandler = ref(props.email)
const userType = ref(props.userType)
const props = defineProps({
    userType: String,
    username: String,
    email: String,
    forgotPasswordPromptCount: {
        type: Number,
        default: 0
    }
});
const forgotPasswordPromptCountLimit = ref(2)
const forgotPasswordPromptCounts = computed(() => props.forgotPasswordPromptCount)

async function getPatient() {
    await axios.post('/api/user/verify_username', {
        username: usernameHandler.value,
        email: emailHandler.value,
        forgotPassword: true
    }).then(response => userData.value = response.data)
    if (userData.value) {
        noUserFound.value = false
        try {
            await axios.post('/api/OTPMail', {
                email: emailHandler.value
            }).then(codeSent.value = true)
            codeSent.value = true
            userType.value = 'patient'
            checkOTP.value = false
        } catch (err) {
            errMsg.value = err
        }
    } else {
        noUserFound.value = true
    }
}
async function getDoctor() {
    await axios.post('/api/doctor/verify_username', {
        username: usernameHandler.value,
        email: emailHandler.value,
        forgotPassword: true
    }).then(response => userData.value = response.data)
    if (userData.value) {
        noUserFound.value = false
        try {
            await axios.post('/api/OTPMail', {
                email: emailHandler.value
            }).then(codeSent.value = true)
            codeSent.value = true
            userType.value = 'doctor'
            checkOTP.value = false
        } catch (err) {
            errMsg.value = err
        }
    } else {
        noUserFound.value = true
    }
}
async function getProvider() {
    await axios.post('/api/manager/verify_username', {
        username: usernameHandler.value,
        email: emailHandler.value,
        forgotPassword: true
    }).then(response => userData.value = response.data)
    if (userData.value) {
        noUserFound.value = false
        try {
            await axios.post('/api/OTPMail', {
                email: emailHandler.value
            }).then(codeSent.value = true)
            codeSent.value = true
            userType.value = 'provider'
            checkOTP.value = false
        } catch (err) {
            errMsg.value = err
        }
    } else {
        noUserFound.value = true
    }
}
async function forgotPasswordOTP() {
    if (usernameHandler.value != null || emailHandler.value != null) {
        isLoading.value = true
        let confirmEmail
        await axios.post('/api/code/email', {
            email: emailHandler.value
        }).then(response => confirmEmail = response.data)
        if (confirmEmail) {
            emailExists.value = true
        } else {
            emailExists.value = false
            checkOTP.value = true
            while (checkOTP.value) {
                await getPatient()
                if (userData.value) break;
                await getDoctor()
                if (userData.value) break;
                await getProvider()
                if (userData.value) break;
                checkOTP.value = false
            }
        }
        isLoading.value = false
    }
}
async function verifyCode() {
    let confirmCode
    codeIncorrect.value = false
    codeVerified.value = false
    await axios.post('/api/code/verify', {
        code: code.value
    }).then(response => confirmCode = response.data)
    if (confirmCode) {
        codeVerified.value = true
    } else {
        codeIncorrect.value = true
    }
}
async function pushNewPassword() {
    if (newPassword.value === confirmPassword.value) {
        if (userType.value == 'patient') {
            try {
                await axios.put('/api/fupdatePassword/patient', {
                    patientID: userData.value,
                    password: newPassword.value
                });
                userData.value = ''
                passwordChanged.value = true
            } catch (err) {
                passwordChanged.value = false
                errMsg.value = err
                userData.value = ''
            }
        } else if (userType.value == 'doctor') {
            try {
                await axios.put('/api/fupdatePassword/doctor', {
                    doctorID: userData.value,
                    password: newPassword.value
                });
                userData.value = ''
                passwordChanged.value = true
            } catch (err) {
                passwordChanged.value = false
                errMsg.value = err
                userData.value = ''
            }
        } else if (userType.value == 'provider') {
            try {
                await axios.put('/api/fupdatePassword/manager', {
                    managerID: userData.value,
                    password: newPassword.value
                });
                userData.value = ''
                passwordChanged.value = true
            } catch (err) {
                passwordChanged.value = false
                errMsg.value = err
                userData.value = ''
            }
        }
    } else {
        passwordNotMatch.value = true
    }
}
</script>
<template>
    <a class="help has-text-danger" @click="modal = !modal"
        v-if="forgotPasswordPromptCounts >= forgotPasswordPromptCountLimit">Forgot Password</a>
    <div class="modal" :class="{ 'is-active': modal }">
        <div class="modal-background"></div>
        <div class="modal-content has-text-left" style="width: 40%; margin: auto">
            <section class="section box" v-if="!codeSent">
                <p class="title is-4 has-text-danger">Forgot Password</p>
                <div class="notification is-danger" v-if="errMsg">{{ errMsg }}</div>
                <div class="notification is-warning" v-if="noUserFound">No account has been found linked with this
                    email.</div>
                <div class="container" v-if="!emailExists">
                    <div class="field">
                        <div class="control">
                            <label class="label">Enter Username</label>
                            <input class="input" type="email" v-model="usernameHandler" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Enter Email</label>
                            <input class="input" type="email" v-model="emailHandler" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button" :class="{ 'is-loading': isLoading }" @click="forgotPasswordOTP"
                                :disabled="emailHandler == null || usernameHandler == null">Send OTP</button>
                        </div>
                    </div>
                </div>
                <div class="notification is-danger" v-else>You have to wait 10 minutes before requesting a code again.
                </div>
            </section>
            <section class="section box" v-else>
                <div class="container" v-if="!codeVerified">
                    <div class="notification is-warning" v-if="codeIncorrect">Incorrect code, please try again.</div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Enter code</label>
                            <input class="input" type="number" v-model="code" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button" @click="verifyCode">Verify</button>
                        </div>
                    </div>
                </div>
                <div class="container" v-else>
                    <div class="notification is-danger" v-if="passwordNotMatch">Passwords not match.</div>
                    <div class="container" v-if="!passwordChanged">
                        <div class="field">
                            <div class="control">
                                <label class="label">New Password:</label>
                                <input class="input" type="password" v-model="newPassword" />
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label class="label">Confirm Password:</label>
                                <input class="input" type="password" v-model="confirmPassword" />
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button" @click="pushNewPassword"
                                    :disabled="newPassword == '' && confirmPassword == ''">Confirm</button>
                            </div>
                        </div>
                    </div>
                    <div class="container" v-else>
                        <div class="notification is-success">Your password has been successfully changed.</div>
                    </div>
                </div>
            </section>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="modal = false"></button>
    </div>
</template>
<style scoped>
@media (max-width: 991.98px) {
    .modal-content {
        width: 100% !important;
    }
}
</style>