<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ManagerMenu from '../../components/ManagerMenu.vue';
import ForgotPassword from '../../components/ForgotPassword.vue';

let currentPassword = ref('')
let newPassword = ref('')
let confirmPassword = ref('')
let passwordNotMatched = ref(false)
let managerID = ref('')
let errMsg = ref('')
let passwordChanged = ref(false)
let incorrectCurrentPassword = ref(false)

onMounted(async () => {
    await axios.get('/session/manager').then(response => managerID.value = response.data._id)
});

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
    if (newPassword.value === confirmPassword.value) {
        await axios.put('/api/updatePassword/manager', {
            managerID: managerID.value,
            currentPassword: currentPassword.value,
            newPassword: newPassword.value
        }).then(response => {
            if (response.data) {
                incorrectCurrentPassword.value = false
                currentPassword.value = ''
                newPassword.value = ''
                confirmPassword.value = ''
                passwordChanged.value = true
                errMsg.value = ''
                passwordNotMatched.value = false
            } else {
                passwordChanged.value = false
                incorrectCurrentPassword.value = true
            }
        }).catch(err => {
            errMsg.value = err
            passwordChanged.value = false
        })
    } else {
        passwordNotMatched.value = true
        passwordChanged.value = false
    }
}
</script>
<template>
    <div class="columns">
        <div class="column is-2">
            <ManagerMenu />
        </div>
        <div class="column">
            <section class="section">
                <h1 class="title">Change Password</h1>
                <div class="container box">
                    <div class="notification is-success" v-if="passwordChanged">Password has been changed successfully.
                    </div>
                    <div class="notification is-danger" v-if="errMsg"> {{ errMsg }}</div>
                    <div class="field">
                        <label class="label">Current Password</label>
                        <div class="control">
                            <input type="password" class="input password" v-model="currentPassword"
                                placeholder="Current password">
                        </div>
                        <p class="help is-danger" v-if="incorrectCurrentPassword">Current password does not match in our
                            database.</p>
                    </div>
                    <div class="field">
                        <label class="label">New Password</label>
                        <div class="control">
                            <input type="password" class="input password" v-model="newPassword"
                                placeholder="New password">
                        </div>
                        <p class="help is-danger" v-if="passwordNotMatched">Password do not match.</p>
                    </div>
                    <div class="field">
                        <label class="label">Confirm Password</label>
                        <div class="control">
                            <input type="password" class="input password" v-model="confirmPassword"
                                placeholder="Confirm password">
                        </div>
                        <p class="help is-danger" v-if="passwordNotMatched">Password do not match.</p>
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
                            <button class="button is-danger"
                                :disabled="currentPassword == '' || newPassword == '' || confirmPassword == ''"
                                @click="changePassword">Change password</button>
                        </div>
                    </div>
                    <ForgotPassword :userType="'manager'" />
                </div>
            </section>
        </div>
    </div>
</template>