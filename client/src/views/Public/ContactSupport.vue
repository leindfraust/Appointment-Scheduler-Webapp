<script setup>
import { ref } from 'vue'
import axios from 'axios';

const ticketID = ref('')
const ticketType = ref('')
const title = ref('')
const message = ref('')
const email = ref('')
const loading = ref(false)
const errMsg = ref('')
const success = ref(false)
const problemSelect = ref(false)
//methods
async function submitIssue() {
    loading.value = true

    generateTicket()
    try {
        await axios.post('/api/SupportMail', {
            ticketID: ticketID.value,
            email: email.value,
            ticketType: ticketType.value,
            ticketTitle: title.value,
        });
        await axios.post('/api/superuser/submitTicket', {
            ticketID: ticketID.value,
            email: email.value,
            ticketType: ticketType.value,
            ticketTitle: title.value,
            ticketMessage: message.value
        });

        success.value = true
    } catch (err) {
        errMsg.value = err
    }
    loading.value = false
}
function generateTicket() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    ticketID.value = result.toUpperCase()
}
</script>
<template>
    <section class="section">
        <div class="modal" :class="{ 'is-active': loading }">
            <div class="modal-background"></div>
            <div class="modal-content loader"></div>
        </div>
        <div class="container box" style="width: 33%">
            <div class="notification is-danger" v-if="errMsg && !success">{{ errMsg }}</div>
            <div class="notification is-success" v-if="success">Your problem has been reported, your ticket ID is: {{
                    ticketID
            }}. Please see your email for further instructions.</div>
            <div v-else>
                <h1 class="title">Contact Us</h1>
                <div class="dropdown block" :class="{ 'is-active': problemSelect }">
                    <div class="dropdown-trigger">
                        <button class="button" @click="problemSelect = !problemSelect">
                            {{ ticketType == '' ? 'Select a Problem' : ticketType }}</button>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a class="dropdown-item"
                                @click="(ticketType = 'General Inquiry', problemSelect = false)">General Inquiry</a>
                            <a class="dropdown-item"
                                @click="(ticketType = 'Account Problem', problemSelect = false)">Account Problem</a>
                            <a class="dropdown-item"
                                @click="(ticketType = 'Report a bug', problemSelect = false)">Report a bug</a>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Email</label>
                        <input type="email" v-model="email" class="input" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Subject</label>
                        <input type="text" v-model="title" class="input" />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Explain the problem</label>
                        <textarea v-model="message" class="textarea"></textarea>
                    </div>
                </div>
                <div class="field has-text-centered">
                    <div class="control">
                        <button class="button is-primary" @click="submitIssue"
                            :disabled="ticketType == '' || email == '' || title == '' || message == ''">Submit
                            Issue</button>
                    </div>
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
</style>