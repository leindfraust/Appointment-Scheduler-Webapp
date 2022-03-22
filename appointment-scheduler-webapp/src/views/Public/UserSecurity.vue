<script setup>
import Navigation from '../../components/NavigationTab.vue';
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue';
import ForgotPassword from '../../components/ForgotPassword.vue';

const store = useStore()

let patient = ref([])
let currentPassword = ref('')
let confirmCurrentPassword = ref('')
let newPassword = ref('')
let confirmPassword = ref('')
let errMsg = ref('')
let passwordChanged= ref(false)
let currentPasswordNotMatch = ref(false)
let newPasswordNotMatch = ref(false)

onMounted(async () => {
    await axios.get('/session/patient').then(response => patient.value = response.data);
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
    if (currentPassword.value !== '' && newPassword.value !== '' && confirmPassword.value !== '') {
        let getUserData = []

        await axios.get('/api/user').then(response => getUserData = response.data.find(x => x._id === store.state.patientID))
        confirmCurrentPassword.value = getUserData.password

        if (currentPassword.value !== confirmCurrentPassword.value) {
            currentPasswordNotMatch.value = true
            if (newPassword.value !== confirmPassword.value) {
                newPasswordNotMatch.value = true
            } else {
                newPasswordNotMatch.value = false
            }
        } else {
            currentPasswordNotMatch.value = false
            if (newPassword.value !== confirmPassword.value) {
                newPasswordNotMatch.value = true
            } else {
                newPasswordNotMatch.value = false
            }
        }

        if (!newPasswordNotMatch.value && !currentPasswordNotMatch.value) {
            try {
                await axios.put('/session/patient/', {
                    password: newPassword.value
                });
                await axios.put(`/api/user/${patient.value._id}`, {
                    password: newPassword.value
                });
                currentPassword.value = ''
                confirmCurrentPassword.value = ''
                newPassword.value = ''
                confirmPassword.value = ''
                passwordChanged.value = true
            } catch (err) {
                errMsg.value = err
                passwordChanged.value = false
            }
        }
    }
}
</script>
<template>
    <Navigation />

    <section class="section is-medium">
        <div class="box" style="width: 50%; margin: auto">
            <h1 class="title">Security</h1>
            <div class="notification is-danger" v-if="errMsg">{{ errMsg }}</div>
            <div class="notification is-success" v-if="passwordChanged">Password changed successfully.</div>
            <div class="field">
                <div class="control">
                    <label class="label">Current Password:</label>
                    <input
                        class="input password"
                        v-model="currentPassword"
                        type="password"
                        placeholder="Current password"
                    />
                </div>
                <p class="help is-danger" v-if="currentPasswordNotMatch">Incorrect password.</p>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">New Password:</label>
                    <input
                        class="input password"
                        v-model="newPassword"
                        type="password"
                        placeholder="New password"
                    />
                </div>
                <p class="help is-danger" v-if="newPasswordNotMatch">Password do not match.</p>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Confirm Password:</label>
                    <input
                        class="input password"
                        v-model="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                    />
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
                    <button
                        class="button is-danger"
                        @click="changePassword"
                        :disabled="currentPassword === '' || newPassword === '' || confirmPassword === ''"
                    >Change password</button>
                </div>
            </div>
            <ForgotPassword :userType="'patient'" :username="patient.username" :email="patient.email"/>
        </div>
    </section>
</template>
<style scoped>
@media (max-width: 991.98px) {
    .box {
        width: 100% !important;
    }
}
</style>