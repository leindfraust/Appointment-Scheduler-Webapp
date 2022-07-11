<script setup>
import { ref } from 'vue'
import axios from 'axios';

let isLoading = ref(false)
let errMsg = ref('')
let modal = ref(false)
let emailExists = ref(false)
let code = ref('')
let codeSent = ref(false)
let codeVerified = ref(false)
let newPassword = ref('')
let confirmPassword = ref('')
let passwordNotMatch = ref(false)
let passwordChanged = ref(false)
let noUserFound = ref(false)
let userData = ref('')
let usernameHandler = ref(props.username)
let emailHandler = ref(props.email)
const props = defineProps({
    userType: String,
    username: String,
    email: String
});

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
            if (props.userType == 'patient') {
                await axios.post('/api/user/verify_username', {
                    username: usernameHandler.value,
                    email: emailHandler.value
                }).then(response => userData.value = response.data)
                if (userData.value) {
                    noUserFound.value = false
                    try {
                        await axios.post('/api/OTPMail', {
                            email: emailHandler.value
                        }).then(codeSent.value = true)
                        codeSent.value = true
                    } catch (err) {
                        errMsg.value = err
                    }
                } else {
                    noUserFound.value = true
                }
            } else if (props.userType == 'doctor') {
                await axios.post('/api/doctor/verify_username', {
                    username: usernameHandler.value,
                    email: emailHandler.value
                }).then(response => userData.value = response.data)
                if (userData.value) {
                    noUserFound.value = false
                    try {
                        await axios.post('/api/OTPMail', {
                            email: emailHandler.value
                        }).then(codeSent.value = true)
                        codeSent.value = true
                    } catch (err) {
                        errMsg.value = err
                    }
                } else {
                    noUserFound.value = true
                }
            } else if (props.userType == 'manager') {
                await axios.post('/api/manager/verify_username', {
                    username: usernameHandler.value,
                    email: emailHandler.value
                }).then(response => userData.value = response.data)
                if (userData.value) {
                    noUserFound.value = false
                    try {
                        await axios.post('/api/OTPMail', {
                            email: emailHandler.value
                        }).then(codeSent.value = true)
                        codeSent.value = true
                    } catch (err) {
                        errMsg.value = err
                    }
                } else {
                    noUserFound.value = true
                }
            }
        }
        isLoading.value = false
    }
}
async function verifyCode() {
    let confirmCode
    await axios.post('/api/code/verify', {
        code: code.value
    }).then(response => confirmCode = response.data)
    if (confirmCode) {
        codeVerified.value = true
    }
}
async function pushNewPassword() {
    if (newPassword.value === confirmPassword.value) {
        if (props.userType == 'patient') {
            try {
                await axios.put('/api/fupdatePassword/patient', {
                    patientID: userData.value._id,
                    password: newPassword.value
                });
                userData.value = ''
                passwordChanged.value = true
            } catch (err) {
                passwordChanged.value = false
                errMsg.value = err
                userData.value = ''
            }
        } else if (props.userType == 'doctor') {
            try {
                await axios.put('/api/fupdatePassword/doctor', {
                    doctorID: userData.value._id,
                    password: newPassword.value
                });
                userData.value = ''
                passwordChanged.value = true
            } catch (err) {
                passwordChanged.value = false
                errMsg.value = err
                userData.value = ''
            }
        } else if (props.userType == 'manager') {
            try {
                await axios.put('/api/fupdatePassword/manager', {
                    managerID: userData.value._id,
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
    <a class="subtitle has-text-danger" @click="modal = !modal">Forgot Password</a>
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