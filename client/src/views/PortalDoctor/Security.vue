<template>
    <div style="overflow-x: hidden; height: 100vh; background-color: whitesmoke;">
        <div class="columns">
            <div class="column is-2">
                <DoctorMenu />
            </div>
            <div class="column" style="background-color: whitesmoke;">
                <section class="section" style="background-color: whitesmoke;">
                    <h1 class="title">SECURITY</h1>
                    <div class="container box">
                        <article class="message is-danger" v-if="!verified">
                            <div class="message-header">
                                <p>YOU ARE NOT VERIFIED ❌</p>
                            </div>
                            <div class="message-body">
                                To get verified, link your
                                <b>email account</b>.
                            </div>
                        </article>
                        <div class="columns">
                            <div class="column">
                                <h1 class="title">Change password:</h1>
                                <ForgotPassword :userType="'doctor'" :username="doctorDetails.username"
                                    :email="gmail" />
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
                                        <input class="input password" size="5" type="password" v-model="password"
                                            required :class="{ 'is-danger': passwordValidate }" />
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
                                        <div class="has-text-centered" v-if="!codeError">
                                            <button class="button is-info" :disabled="OTP === ''"
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
                                            <div class="has-text-centered">
                                                <button class="button is-success" @click="sendVerificationEmail"
                                                    :disabled="gmail === ''">Verify</button>
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
                                                <input v-if="!codeError" class="input" type="number" maxlength="4"
                                                    id="OTP" v-model="OTP"
                                                    oninput="this.value=this.value.slice(0,this.maxLength)"
                                                    :disabled="codeError || OTP == ''" />
                                            </div>
                                            <div class="has-text-centered" v-if="!codeError">
                                                <button class="button is-info" :disabled="OTP === ''"
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
                                <button class="button is-link" :disabled="!authorized"
                                    @click="updateInfo">Confirm</button>
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
<script>
import axios from 'axios'
import DoctorMenu from '../../components/DoctorMenu.vue'
import ForgotPassword from '../../components/ForgotPassword.vue'

export default {
    name: 'DoctorSecurity',
    components: {
        DoctorMenu,
        ForgotPassword
    },
    async mounted() {
        await axios.get("/session/doctor").then(response => this.doctorDetails = response.data)
        this.verified = await this.doctorDetails.verified
        this.id = await this.doctorDetails._id
        this.licenseNo = await this.doctorDetails.licenseNo
        this.fullname = await this.doctorDetails.fullname
        this.gmail = await this.doctorDetails.gmail
    },
    data() {
        return {
            doctorDetails: [],
            codes: [],
            OTP: null,
            id: null,
            isActiveModal: false,
            currentPassword: null,
            currentPasswordValidate: null,
            currentPasswordValidateMessage: null,
            currentValidateMessage: null,
            passwordValidateMessage: null,
            incorrectPasswordValidate: null,
            passwordValidate: null,
            password: null,
            passwordRepeat: null,
            passwordSuccess: false,
            verified: null,
            licenseNo: null,
            fullname: null,
            gmail: null,
            authorized: false,
            verifyEmailSent: false,
            emailTaken: false,
            codeError: false,
            updateInfoSuccess: false,
            incorrectCode: false,
            errMsg: ''
        }
    },
    methods: {
        async updatePassword() {
            if (await this.currentPassword !== '' && this.password !== '' && this.passwordRepeat !== '') {
                if (this.password !== this.passwordRepeat) {
                    this.passwordValidate = true;
                    this.passwordValidateMessage = "Passwords do not match"
                    this.passwordSuccess = false
                } else {
                    try {
                        await axios.put('/api/updatePassword/doctor', {
                            doctorID: this.id,
                            currentPassword: this.currentPassword,
                            newPassword: this.password
                        }).then(response => {
                            if (response.data) {
                                this.incorrectPasswordValidate = false
                                this.passwordValidate = false
                                this.passwordSuccess = true
                                this.currentPassword = null
                                this.password = null
                                this.passwordRepeat = null
                            } else {
                                this.passwordValidate = false
                                this.passwordSuccess = false
                                this.incorrectPasswordValidate = true
                                this.currentPasswordValidateMessage = 'Incorrect current password'
                            }
                        });
                    } catch (err) {
                        this.passwordValidate = false
                        this.passwordSuccess = false
                        this.incorrectPasswordValidate = true
                        this.errMsg = err
                    }
                }
            }
        },
        showPass() {
            let passwordToggle = document.getElementsByClassName("password");
            for (let i = 0; i < passwordToggle.length; i++) {
                if (passwordToggle[i].type === "password") {
                    passwordToggle[i].type = "text";
                } else {
                    passwordToggle[i].type = "password";
                }
            }
        },
        async modalUpEditInfo() {
            let randomCode = Math.floor(1000 + Math.random() * 9000);
            await axios.get("/api/code").then(response => this.codes = response.data)
            let confirmCode = await this.codes.find(x => x.code === randomCode)
            let confirmEmail = await this.codes.filter(x => x.email === this.gmail)
            if (await this.codes.length === 0) {
                this.isActiveModal = true
                await axios.post("/api/code", {
                    email: this.gmail,
                    code: randomCode
                });
                await axios.post('/api/OTPMail', {
                    email: this.gmail,
                    code: randomCode
                });
            } else if (typeof confirmCode === 'undefined' || !confirmEmail) {
                this.isActiveModal = true
                await axios.post("/api/code", {
                    email: this.gmail,
                    code: randomCode
                });
                await axios.post('/api/OTPMail', {
                    email: this.gmail,
                    code: randomCode
                });
            } else {
                this.isActiveModal = true
                this.codeError = true
            }
        },
        async modalUpInfoVerify() {
            this.isActiveModal = true
        },
        async sendVerificationEmail() {
            let existingEmail = []
            let randomCode = Math.floor(1000 + Math.random() * 9000);
            await axios.get("/api/code").then(response => this.codes = response.data)
            await axios.get("/api/doctor").then(response => existingEmail = response.data.find(x => x.gmail === this.gmail))
            let confirmCode = await this.codes.find(x => x.code === randomCode)
            let confirmEmail = await this.codes.filter(x => x.email === this.gmail)
            if (await this.codes.length === 0) {
                if (typeof existingEmail !== 'undefined') {
                    if (await existingEmail._id !== this.id) {
                        this.verifyEmailSent = true
                        this.codeError = true
                        this.emailTaken = true
                    } else {
                        this.verifyEmailSent = true
                        await axios.post("/api/code", {
                            email: this.gmail,
                            code: randomCode
                        });
                        await axios.post('/api/OTPMail', {
                            email: this.gmail,
                            code: randomCode
                        });
                    }
                } else if (typeof existingEmail === 'undefined') {
                    this.verifyEmailSent = true
                    await axios.post("/api/code", {
                        email: this.gmail,
                        code: randomCode
                    });
                    await axios.post('/api/OTPMail', {
                        email: this.gmail,
                        code: randomCode
                    });
                }
            } else if (typeof confirmCode === 'undefined' && Object.keys(confirmEmail).length === 0) {
                if (typeof existingEmail !== 'undefined') {
                    if (await existingEmail._id !== this.id) {
                        this.verifyEmailSent = true
                        this.codeError = true
                        this.emailTaken = true
                    } else {
                        this.verifyEmailSent = true
                        await axios.post("/api/code", {
                            email: this.gmail,
                            code: randomCode
                        });
                        await axios.post('/api/OTPMail', {
                            email: this.gmail,
                            code: randomCode
                        });
                    }
                } else if (typeof existingEmail === 'undefined') {
                    this.verifyEmailSent = true
                    await axios.post("/api/code", {
                        email: this.gmail,
                        code: randomCode
                    });
                    await axios.post('/api/OTPMail', {
                        email: this.gmail,
                        code: randomCode
                    });
                }
            } else {
                this.verifyEmailSent = true
                this.codeError = true
            }
        },
        async confirmOTPEditInfo() {
            await axios.get("/api/code").then(response => this.codes = response.data)
            let confirmCode = await this.codes.find(x => x.code === this.OTP && x.email === this.gmail)
            if (!this.codeError) {
                if (await confirmCode) {
                    this.authorized = true
                    this.isActiveModal = false
                } else {
                    this.incorrectCode = true
                }
            } else {
                this.incorrectCode = true
            }
        },
        async verifyEmail() {
            await axios.get("/api/code").then(response => this.codes = response.data)
            let confirmCode = await this.codes.find(x => x.code === this.OTP && x.email === this.gmail)
            if (!this.codeError) {
                if (await confirmCode) {
                    await axios.put(`/api/doctor/${this.id}`, {
                        gmail: this.gmail,
                        verified: true
                    });
                    await axios.put('/session/doctor', {
                        gmail: this.gmail,
                        verified: true
                    });
                    this.verified = true
                    this.isActiveModal = false
                    if (await !this.isActiveModal) {
                        await axios.get('/session/doctor').then(response => this.doctorDetails = response.data)
                    }
                } else {
                    this.incorrectCode = true
                }
            } else {
                this.incorrectCode = true
            }
        },
        async updateInfo() {
            if (this.verified) {
                await axios.put(`/api/doctor/${this.id}`, {
                    licenseNo: this.licenseNo,
                    name: this.fullname
                })
                await axios.put("/session/doctor", {
                    licenseNo: this.licenseNo,
                    name: this.fullname
                })
                await axios
                    .get("/session/doctor")
                    .then((response) => (this.fullname = response.data.fullname));

                this.updateInfoSuccess = true
            }
        },
        closeModal() {
            this.isActiveModal = false
        }
    }
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

#OTP {
    border: 0;
    letter-spacing: 2em;
    width: 50%;
}

@media (max-width: 991.98px) {
    #OTPModal {
        width: 100% !important;
    }
}
</style>