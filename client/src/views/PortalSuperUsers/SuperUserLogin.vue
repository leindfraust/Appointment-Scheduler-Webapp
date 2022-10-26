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
<script>
import axios from 'axios'

export default {
    name: "SuperUserLogin",
    async beforeCreate() {
        await axios.get('/session/superuser').then(response => this.superUserConfirmEmail = response.data)

        if (typeof this.superUserConfirmEmail.superuser !== 'undefined') {
            this.$store.commit('superUserAuth', true)
            await this.$router.push('/superuser')
        } else {
            await axios.delete("/session/superuser");
        }
    },
    data() {
        return {

            modalActive: false,
            statusMessage: '',
            superUserEmail: '',
            superUserConfirmEmail: '',
            superUserCode: '',
            superUserConfirmCode: '',
            gmails: []
        }
    },
    methods: {
        async authenticateMail() {
            await axios.post('/api/code/superuser', {
                email: this.superUserEmail
            }).then(response => this.superUserConfirmEmail = response.data)
            if (this.superUserConfirmEmail) {
                await axios.post('/api/loginReqMail', {
                    email: this.superUserEmail
                }).then(this.modalActive = true).catch(err => {
                    if (err) {
                        this.statusMessage = err
                    }
                });
            } else {
                this.statusMessage = 'invalid developer'
                this.superUserEmail = ''
            }
        },
        async authenticateCode() {
            await axios.post('/api/code/verify', {
                code: this.superUserCode
            }).then(response => this.superUserConfirmCode = response.data)
            if (this.superUserConfirmCode) {
                await axios.post('/session/superuser', {
                    superuser: this.superUserEmail
                });
                await this.$store.commit('superUserAuth', true)
                await this.$router.push('/superuser')
            } else {
                this.statusMessage = 'invalid code'
                this.superUserCode = ''
            }
        },
        modalClose() {
            this.modalActive = false
        }
    }
}
</script>
<style scoped>
@media (max-width: 991.98px) {
    .container {
        width: 100% !important;
    }
}
</style>