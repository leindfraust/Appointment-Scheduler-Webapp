<script setup>
import Navigation from '../../components/NavigationTab.vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';
import ForgotPassword from '../../components/ForgotPassword.vue';

let patient = ref([])
let currentPassword = ref('')
let newPassword = ref('')
let confirmPassword = ref('')
let errMsg = ref('')
let passwordChanged = ref(false)
let newPasswordNotMatch = ref(false)
let currentPasswordIncorrect = ref(false)
let username = ref('')
let email = ref('')
onMounted(async () => {
    await axios.get('/session/patient').then(response => patient.value = response.data);
    username.value = await patient.value.username
    email.value = await patient.value.email
})

//methods

function showPassword() {
    let passwordToggle = document.getElementsByClassName("password");
    for (let i = 0; i < passwordToggle.length; i++) {
        if (passwordToggle[i].type === "password") {
            passwordToggle[i].type = "text";
        } else {
            passwordToggle[i].type = "password";
        }
    }
}
async function changePassword() {
    if (currentPassword.value !== '' && newPassword.value !== '') {
        if (newPassword.value !== confirmPassword.value) {
            newPasswordNotMatch.value = true
        } else {
            newPasswordNotMatch.value = false
        }
    } else {
        if (newPassword.value !== confirmPassword.value) {
            newPasswordNotMatch.value = true
        } else {
            newPasswordNotMatch.value = false
        }
    }

    if (!newPasswordNotMatch.value) {
        try {
            await axios.put('/api/updatePassword/patient', {
                patientID: patient.value._id,
                currentPassword: currentPassword.value,
                newPassword: newPassword.value
            }).then(response => {
                if (response.data) {
                    currentPassword.value = ''
                    newPassword.value = ''
                    confirmPassword.value = ''
                    passwordChanged.value = true
                    errMsg.value = ''
                } else {
                    passwordChanged.value = false
                    currentPasswordIncorrect.value = true
                }
            });
        } catch (err) {
            errMsg.value = err
            passwordChanged.value = false
        }
    }
}
</script>
<template>
    <Navigation />

    <section class="hero is-info is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="box">
                    <div class="notification is-danger" v-if="errMsg">Oops, something went wrong. Try again later or
                        <router-link :to="'/contactus'">contact us</router-link>
                    </div>
                    <div class="notification is-success" v-if="passwordChanged">Password changed successfully.</div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Current Password:</label>
                            <input class="input password is-rounded" v-model="currentPassword" type="password"
                                placeholder="Current password" />
                            <p class="help is-danger" v-if="currentPasswordIncorrect">Current password is incorrect.</p>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">New Password:</label>
                            <input class="input password is-rounded" v-model="newPassword" type="password"
                                placeholder="New password" />
                        </div>
                        <p class="help is-danger" v-if="newPasswordNotMatch">Password do not match.</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Confirm Password:</label>
                            <input class="input password is-rounded" v-model="confirmPassword" type="password"
                                placeholder="Confirm password" />
                        </div>
                        <p class="help is-danger" v-if="newPasswordNotMatch">Password do not match.</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" @click="showPassword" />
                                Show password
                            </label>
                        </div>
                    </div>
                    <div class="field has-text-right">
                        <div class="control">
                            <button class="button is-danger" @click="changePassword"
                                :disabled="currentPassword === '' || newPassword === '' || confirmPassword === ''">Change
                                password</button>
                        </div>
                    </div>
                    <ForgotPassword v-if="username != '' && email != ''" :userType="'patient'" :username="username"
                        :email="email" />
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
@media (max-width: 991.98px) {
    .box {
        width: 100% !important;
    }
}

.hero {
    background: center center no-repeat url('../../assets/images/background-client-security.png');
    background-size: cover;
}

.box {
    width: 35%;
    margin: auto;
    padding: 30px
}
</style>