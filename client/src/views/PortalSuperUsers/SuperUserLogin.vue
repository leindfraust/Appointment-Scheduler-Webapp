<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const modalActive = ref(false)
const statusMessage = ref('')
const superUserEmail = ref('')
const superUserConfirmEmail = ref('')
const superUserCode = ref('')
const superUserConfirmCode = ref('')

onBeforeMount(async () => {
    await axios.get('/session/superuser').then(response => superUserConfirmEmail.value = response.data)

    if (typeof superUserConfirmEmail.value.superuser !== 'undefined') {
        store.commit('superUserAuth', true)
        await router.push('/superuser')
    } else {
        await axios.delete("/session/superuser");
    }
})


async function authenticateMail() {
    await axios.post('/api/code/superuser', {
        email: superUserEmail.value
    }).then(response => superUserConfirmEmail.value = response.data)
    if (superUserConfirmEmail.value) {
        await axios.post('/api/loginReqMail', {
            email: superUserEmail.value
        }).then(modalActive.value = true).catch(err => {
            if (err) {
                statusMessage.value = err
            }
        });
    } else {
        statusMessage.value = 'invalid developer'
        superUserEmail.value = ''
    }
}
async function authenticateCode() {
    await axios.post('/api/code/verify', {
        code: superUserCode.value
    }).then(response => superUserConfirmCode.value = response.data)
    if (superUserConfirmCode.value) {
        await axios.post('/session/superuser', {
            superuser: superUserEmail.value
        });
        store.commit('superUserAuth', true)
        await router.push('/superuser')
    } else {
        statusMessage.value = 'invalid code'
        superUserCode.value = ''
    }
}
function modalClose() {
    modalActive.value = false
}
</script>
<template>
    <div class="container" style="width: 33%; margin-top: 15%">
        <h1 class="title has-text-centered">Welcome Superuser/Developer</h1>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input is-rounded" v-model="superUserEmail" type="text" placeholder="email" />
            </div>
            <br />
            <div class="has-text-centered">
                <button class="button is-success" @click="authenticateMail">Authenticate</button>
            </div>
            <p v-if="statusMessage == 'invalid developer'" class="subtitle has-text-danger">Sorry, email not identified
                as superuser/developer. Please try again.</p>
        </div>

        <div class="modal" :class="{ 'is-active': modalActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="field" style="background-color: whitesmoke; padding: 12%">
                    <label class="label">Please check your email for the login code</label>
                    <div class="control">
                        <input class="input" v-model="superUserCode" type="text" placeholder="code" />
                    </div>
                    <br />
                    <div class="has-text-centered">
                        <button class="button is-primary" @click="authenticateCode">Confirm</button>
                    </div>
                    <p v-if="statusMessage == 'invalid code'" class="subtitle has-text-danger">Invalid login code,
                        please check your email thoroughly.</p>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
        </div>
    </div>
</template>
<style scoped>
@media (max-width: 991.98px) {
    .container {
        width: 100% !important;
    }
}
</style>