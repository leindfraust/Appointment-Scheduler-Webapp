<template>
    <section class="hero is-fullheight" style="background-color: whitesmoke;">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="animate__animated animate__fadeInLeft">
                    <p class="notification is-success" v-if="newAccount">The account has been successfully created,
                        login to activate the account now.</p>
                    <div class="box" style="width: 33%; margin: auto">
                        <div class="content">
                            <form class="field" style="margin-top: 5%">
                                <h1 class="title">Login</h1>
                                <div class="control">
                                    <input class="input" type="text" v-model="username" placeholder="username" required
                                        @keyup.enter="login" />
                                </div>
                                <div class="control" style="margin-top: 2%">
                                    <input class="input" type="password" v-model="password" placeholder="password"
                                        required @keyup.enter="login" />
                                </div>
                                <p v-if="incorrectUserPass" class="has-text-danger" style="margin-top: 5%">{{
                                        validateMessage
                                }}</p>
                                <p v-else-if="incorrectUserPass == false" class="has-text-danger"
                                    style="margin-top: 5%">{{ validateMessage }}</p>
                                <button type="button" class="button is-primary" @click="login">Login</button>
                                <hr />
                                <a @click="signup" class="is-danger">Create an account</a>
                            </form>
                        </div>
                        <ForgotPassword :userType="'manager'" :forgotPasswordPromptCount="forgotPasswordCount" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import ForgotPassword from '../../components/ForgotPassword.vue'

export default {
    name: "ManagerLogin",
    component: ForgotPassword,
    data() {
        return {
            username: "",
            password: "",
            userManager: null,
            incorrectUserPass: "",
            validateMessage: "",
            newAccount: false,
            forgotPasswordCount: 0
        };
    },
    async mounted() {
        if (this.$store.state.accountCreated == true) {
            this.newAccount = true;
            await this.$store.commit("accountCreated", false);
        }
    },
    async beforeCreate() {
        await axios.get("/session/manager").then(async response => {
            if (typeof response.data.hospital !== 'undefined') {
                this.$store.commit("managerHospital", response.data.hospital);
                await this.$router.push(`/manager/${this.$store.state.managerHospital}`);
            }
        })
    },
    methods: {
        async login() {
            if (this.username == null || this.password == null) {
                this.incorrectUserPass = false;
                this.validateMessage = "empty username or password";
                this.username = null
                this.password = null
            }
            else {
                await axios
                    .post("/api/auth/manager", {
                        username: this.username,
                        password: this.password
                    })
                    .then(async (response) => {
                        this.userManager = await response.data
                        // if username and password matched to a user
                        if (await this.userManager) {
                            await axios.post("/session/manager", {
                                _id: this.userManager._id,
                                registrationCode: this.userManager.registrationCode,
                                hospital: this.userManager.hospital
                            });
                            this.$store.commit("managerHospital", this.userManager.hospital);
                            await this.$router.push(`/manager/${this.userManager.hospital}`);
                        }
                        else {
                            this.forgotPasswordCount = this.forgotPasswordCount + 1
                            this.validateMessage = "Incorrect username or password";
                            this.incorrectUserPass = true;
                            this.username = null;
                            this.password = null;
                        }
                    });
            }
        },
        async signup() {
            await this.$router.push("/manager/signup");
        }
    },
    components: { ForgotPassword }
}
</script>
<style scoped>
@media (max-width: 991.98px) {
    .box {
        width: 100% !important;
    }
}
</style>