<script setup>
import axios from 'axios'
import DoctorMenu from '../../components/DoctorMenu.vue'
import ForgotPassword from '../../components/ForgotPassword.vue';
import { ref, onBeforeMount } from 'vue'


const doctorDetails = ref([])
const OTP = ref(null)
const id = ref(null)
const isActiveModal = ref(false)
const currentPassword = ref(null)
const currentPasswordValidateMessage = ref(null)
const passwordValidateMessage = ref(null)
const incorrectPasswordValidate = ref(null)
const passwordValidate = ref(null)
const password = ref(null)
const passwordRepeat = ref(null)
const passwordSuccess = ref(false)
const verified = ref(null)
const licenseNo = ref(null)
const fullname = ref(null)
const gmail = ref(null)
const authorized = ref(false)
const verifyEmailSent = ref(false)
const emailTaken = ref(false)
const codeError = ref(false)
const updateInfoSuccess = ref(false)
const incorrectCode = ref(false)
const errMsg = ref('')
const verifyButtonLoading = ref(false)

onBeforeMount(async () => {
    await axios.get("/session/doctor").then(response => doctorDetails.value = response.data)
    verified.value = await doctorDetails.value.verified
    id.value = await doctorDetails.value._id
    licenseNo.value = await doctorDetails.value.licenseNo
    fullname.value = await doctorDetails.value.fullname
    gmail.value = await doctorDetails.value.gmail
})

async function updatePassword() {
    if (await currentPassword.value !== '' && password.value !== '' && passwordRepeat.value !== '') {
        if (password.value !== passwordRepeat.value) {
            passwordValidate.value = true;
            passwordValidateMessage.value = "Passwords do not match"
            passwordSuccess.value = false
        } else {
            try {
                await axios.put('/api/updatePassword/doctor', {
                    doctorID: id.value,
                    currentPassword: currentPassword.value,
                    newPassword: password.value
                }).then(response => {
                    if (response.data) {
                        incorrectPasswordValidate.value = false
                        passwordValidate.value = false
                        passwordSuccess.value = true
                        currentPassword.value = null
                        password.value = null
                        passwordRepeat.value = null
                        currentPasswordValidateMessage.value = ''
                    } else {
                        passwordValidate.value = false
                        passwordSuccess.value = false
                        incorrectPasswordValidate.value = true
                        currentPasswordValidateMessage.value = 'Incorrect current password'
                    }
                });
            } catch (err) {
                passwordValidate.value = false
                passwordSuccess.value = false
                incorrectPasswordValidate.value = true
                errMsg.value = err
            }
        }
    }
}
function showPass() {
    let passwordToggle = document.getElementsByClassName("password");
    for (let i = 0; i < passwordToggle.length; i++) {
        if (passwordToggle[i].type === "password") {
            passwordToggle[i].type = "text";
        } else {
            passwordToggle[i].type = "password";
        }
    }
}
async function modalUpEditInfo() {
    codeError.value = false

    await axios.post("/api/code/email", {
        email: gmail.value
    }).then(async response => {
        if (!response.data) {
            await axios.post('/api/OTPMail', {
                email: gmail.value
            }).then(isActiveModal.value = true).catch(err => {
                if (err) {
                    codeError.value = true
                }
            });
        } else {
            isActiveModal.value = true
            codeError.value = true
        }
    })
}
function modalUpInfoVerify() {
    isActiveModal.value = true
}
async function sendVerificationEmail() {
    verifyButtonLoading.value = true
    let existingEmail = []
    verifyEmailSent.value = false
    codeError.value = false
    emailTaken.value = false
    await axios.get("/api/doctor").then(response => existingEmail = response.data.find(x => x.gmail === gmail.value))
    if (typeof existingEmail !== 'undefined') {
        await axios.post("/api/code/email", {
            email: gmail.value
        }).then(async response => {
            if (!response.data) {
                await axios.post('/api/OTPMail', {
                    email: gmail.value
                }).catch(err => {
                    if (err) {
                        codeError.value = true
                    }
                });
                verifyEmailSent.value = true
            } else {
                verifyEmailSent.value = true
                codeError.value = true
            }
        })
    } else {
        verifyEmailSent.value = true
        codeError.value = true
        emailTaken.value = true
    }
    verifyButtonLoading.value = false
}
async function confirmOTPEditInfo() {
    verifyButtonLoading.value = true
    incorrectCode.value = false
    await axios.post("/api/code/verify", {
        code: OTP.value
    }).then(response => {
        if (response.data) {
            if (!codeError.value) {
                authorized.value = true
                isActiveModal.value = false
            }
        } else {
            incorrectCode.value = true
        }
    })
    verifyButtonLoading.value = false
}
async function verifyEmail() {
    verifyButtonLoading.value = true
    incorrectCode.value = false
    await axios.post("/api/code/verify", {
        code: OTP.value
    }).then(async response => {
        if (await response.data) {
            if (!codeError.value) {
                await axios.put(`/api/doctor/${id.value}`, {
                    gmail: gmail.value,
                    verified: true
                });
                await axios.put('/session/doctor', {
                    gmail: gmail.value,
                    verified: true
                });
                verified.value = true
                isActiveModal.value = false
                if (!isActiveModal.value) {
                    await axios.get('/session/doctor').then(response => doctorDetails.value = response.data)
                }
            } else {
                incorrectCode.value = true
            }
        } else {
            incorrectCode.value = true
        }
    });
    verifyButtonLoading.value = false
}
async function updateInfo() {
    updateInfoSuccess.value = false
    if (verified.value) {
        await axios.put(`/api/doctor/${id.value}`, {
            licenseNo: licenseNo.value,
            name: fullname.value
        })
        await axios.put("/session/doctor", {
            licenseNo: licenseNo.value,
            name: fullname.value
        })
        await axios
            .get("/session/doctor")
            .then((response) => (fullname.value = response.data.fullname));

        updateInfoSuccess.value = true
    }
}
function closeModal() {
    isActiveModal.value = false
}

</script>
<template>
    <div class="main-doctor">
        <div class="columns">
            <div class="column is-2">
                <DoctorMenu />
            </div>
            <div class="column main-doctor-content">
                <section class="section">
                    <h1 class="title">SECURITY</h1>
                    <div class="container box">
                        <article class="message is-danger" v-if="!verified">
                            <div class="message-header">
                                <p>YOU ARE NOT VERIFIED ❌</p>
                            </div>
                            <div class="message-body">
                                To get verified, verify your
                                <b>email account</b>.
                            </div>
                        </article>
                        <div class="columns">
                            <div class="column">
                                <h1 class="title">Change password:</h1>
                                <div v-if="gmail != null">
                                    <ForgotPassword :userType="'doctor'" :email='gmail' />
                                </div>
                                <div class="block"></div>
                                <div class="field">
                                    <div class="control">
                                        <label class="label">Current password</label>
                                        <input class="input password" size="5" type="password" v-model="currentPassword"
                                            required />
                                    </div>
                                    <div v-if="incorrectPasswordValidate" class="notification is-warning">{{
                                        currentPasswordValidateMessage
                                    }}</div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <label class="label">Create new password:</label>
                                        <input class="input password" size="5" type="password" v-model="password" required
                                            :class="{ 'is-danger': passwordValidate }" />
                                    </div>
                                    <div v-if="passwordValidate" class="notification is-danger">{{
                                        passwordValidateMessage
                                    }}</div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <label class="label">Repeat new password:</label>
                                        <input class="input password" size="5" type="password" v-model="passwordRepeat"
                                            required :class="{ 'is-danger': passwordValidate }" />
                                    </div>
                                    <div v-if="passwordValidate" class="notification is-danger">{{
                                        passwordValidateMessage
                                    }}</div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <label class="checkbox">
                                            <input type="checkbox" @click="showPass" />
                                            Show password
                                        </label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-danger" type="submit" @click="updatePassword"
                                            :disabled="currentPassword == null || password == null || passwordRepeat == null">Confirm</button>
                                        <div v-if="passwordSuccess" class="notification is-success">Password has been
                                            changed.</div>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <p>
                                    <a class="has-text-info" v-if="verified" @click="modalUpEditInfo">[Edit
                                        Information]</a>
                                    <a class="has-text-danger" v-else @click="modalUpInfoVerify">[Verify Now]</a>
                                </p>
                                <div class="modal" :class="{ 'is-active': isActiveModal }">
                                    <div class="modal-background"></div>
                                    <div v-if="verified" class="modal-content box section" id="OTPModal"
                                        style="width: 33%;">
                                        <div class="notification is-info is-light" v-if="!codeError">We have sent you a
                                            verification code on your email.</div>
                                        <div v-else class="notification is-danger">You can only request a verification
                                            code once, please try again in 10 minutes.</div>
                                        <div class="field" v-if="!codeError">
                                            <div class="control has-text-centered">
                                                <input class="input" type="number" maxlength="4" id="OTP" v-model="OTP"
                                                    oninput="this.value=this.value.slice(0,this.maxLength)"
                                                    :disabled="codeError" />
                                            </div>
                                        </div>
                                        <div class="block"></div>
                                        <div class="has-text-centered" v-if="!codeError">
                                            <button class="button is-info" :disabled="OTP === ''"
                                                :class="{ 'is-loading': verifyButtonLoading }"
                                                @click="confirmOTPEditInfo">Confirm</button>
                                            <div class="notification is-danger" v-if="incorrectCode">Incorrect code,
                                                please check your email thoroughly.</div>
                                        </div>
                                        <button class="modal-close is-large" aria-label="close"
                                            @click="closeModal"></button>
                                    </div>
                                    <div v-else class="modal-content box section" id="OTPModal" style="width: 33%;">
                                        <div v-if="!verifyEmailSent" class="field">
                                            <div class="notification is-success is-light">Verify your email.</div>
                                            <div class="control has-text-centered">
                                                <input class="input" type="email" v-model="gmail" />
                                            </div>
                                            <div class="block"></div>
                                            <div class="has-text-centered">
                                                <button class="button is-success"
                                                    :class="{ 'is-loading': verifyButtonLoading }"
                                                    @click="sendVerificationEmail" :disabled="gmail === ''">Verify</button>
                                            </div>
                                        </div>
                                        <div v-if="verifyEmailSent" class="field">
                                            <div v-if="!codeError" class="notification is-info is-light">We have sent
                                                you a verification code on your email.</div>
                                            <div v-else class="notification is-danger is-light">
                                                <span v-if="emailTaken">Email address is already taken.</span>
                                                <span v-else>You can only request a verification code once, please try
                                                    again in 10 minutes.</span>
                                            </div>
                                            <div class="control has-text-centered">
                                                <input v-if="!codeError" class="input" type="number" maxlength="4" id="OTP"
                                                    v-model="OTP" oninput="this.value=this.value.slice(0,this.maxLength)"
                                                    :disabled="codeError || OTP == ''" />
                                            </div>
                                            <div class="block"></div>
                                            <div class="has-text-centered" v-if="!codeError">
                                                <button class="button is-info"
                                                    :class="{ 'is-loading': verifyButtonLoading }" :disabled="OTP === ''"
                                                    @click="verifyEmail">Confirm</button>
                                                <div class="notification is-danger" v-if="incorrectCode">Incorrect code,
                                                    please check your email thoroughly.</div>
                                            </div>
                                        </div>
                                        <button class="modal-close is-large" aria-label="close"
                                            @click="closeModal"></button>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <label class="label">
                                            <b>License No.</b>
                                        </label>
                                        <input class="input" type="text" v-model="licenseNo" style="width: 33%"
                                            :disabled="!authorized" :class="{ 'is-success': authorized }" />
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <label class="label">
                                                    <b>Full Name:</b>
                                                </label>
                                                <input class="input" size="5" type="text" v-model="fullname"
                                                    :disabled="!authorized" :class="{ 'is-success': authorized }" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control">
                                                <label class="label">
                                                    Email
                                                    <span v-if="verified" class="has-text-success">
                                                        <b>Verified ✓</b>
                                                    </span>
                                                    <span v-else class="has-text-danger">
                                                        <b>Requires verification ❌</b>
                                                    </span>
                                                </label>
                                                <input class="input" size="5" type="text" v-model="gmail" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="button is-link" :disabled="!authorized" @click="updateInfo">Confirm</button>
                                <div v-if="updateInfoSuccess" class="notification is-success is-light">Changes have been
                                    updated successfully.</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
}

#OTP {
    border-style: outset;
    letter-spacing: 2em;
    width: 50%;
}

@media (max-width: 991.98px) {
    #OTPModal {
        width: 100% !important;
    }
}
</style>