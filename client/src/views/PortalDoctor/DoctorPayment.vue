<script setup>
import DoctorMenu from '../../components/DoctorMenu.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios';
import CatchError from '../../components/CatchError.vue';

const verifiedStatus = ref(false)
const doctorID = ref('')

const paymentMethods = ref()

const buttonUpdateLoading = ref(false)
const successUpdate = ref(false)
const errMsg = ref()

const gcashMethod = ref(false)
const gcashNumber = ref(NaN)
const gcashFName = ref('')
const mayaMethod = ref(false)
const mayaNumber = ref(NaN)
const mayaFName = ref('')
onMounted(async () => {
    await axios.get("/session/doctor").then(response => verifiedStatus.value = response.data.verified)
    await axios.get("/session/doctor").then(response => paymentMethods.value = response.data.paymentMethods)
    await axios.get("/session/doctor").then((response) => (doctorID.value = response.data._id));
    gcashNumber.value = await paymentMethods.value?.gcashMethod.number
    gcashFName.value = await paymentMethods.value?.gcashMethod.fullName
    mayaNumber.value = await paymentMethods.value?.mayaMethod.number
    mayaFName.value = await paymentMethods.value?.mayaMethod.fullName
});

async function updateBankDetails() {
    buttonUpdateLoading.value = true
    paymentMethods.value = {
        gcashMethod: {
            number: gcashNumber.value,
            fullName: gcashFName.value
        },
        mayaMethod: {
            number: mayaNumber.value,
            fullName: mayaFName.value
        }
    }
    try {
        await axios.put(`/api/doctor/${doctorID.value}`, {
            paymentMethods: paymentMethods.value
        });
        await axios.put("/session/doctor", {
            paymentMethods: paymentMethods.value
        })
    } catch (err) {
        errMsg.value = err
    }
    buttonUpdateLoading.value = false
    if (!errMsg.value) {
        successUpdate.value = true
        gcashMethod.value = false
        mayaMethod.value = false
    }
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
                    <h1 class="title">PAYMENT</h1>
                    <div class="container box is-fluid">
                        <CatchError :err-msg="errMsg" />
                        <article class="message is-danger" v-if="!verifiedStatus">
                            <div class="message-header">
                                <p>YOU ARE NOT VERIFIED ❌</p>
                            </div>
                            <div class="message-body">
                                You cannot do payment transactions if you are not verified. To get started, please visit
                                <b>Security</b> tab under
                                <b>VERIFICATION AND INFORMATION.</b>
                            </div>
                        </article>
                        <p class="title is-4">Link your e-Wallets or Bank accounts to accept payment.</p>
                        <p class="help">By providing the information below, you agreed to let Medic Search
                            <b>hold
                                your
                                payments</b> until every week for your payout. Medic Search will <b>charge 1%
                                transaction fee</b> for
                            every successful appointments. Your bank may charge additional fee.
                        </p>
                        <br />
                        <div class="columns">
                            <div class="column is-narrow">
                                <p class="subtitle">Available payment methods:</p>
                                <div class="columns is-vcentered">
                                    <div class="column is-narrow">
                                        <a @click="gcashMethod = true, mayaMethod = false">
                                            <figure class="image is-128x128">
                                                <img src="../../assets/images/logos/gcash.png" />
                                            </figure>
                                        </a>
                                    </div>
                                    <div class="column is-narrow">
                                        <a @click="gcashMethod = false, mayaMethod = true">
                                            <figure class="image is-128x128">
                                                <img src="../../assets/images/logos/maya.png" />
                                            </figure>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="block bank-detail" v-if="gcashMethod">
                                    <p class="subtitle">Verify your GCash details: </p>
                                    <div class="field">
                                        <label class="label">Phone Number</label>
                                        <div class="control">
                                            <input class="input" type="number" v-model="gcashNumber" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Full Name</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="gcashFName" />
                                        </div>
                                    </div>
                                </div>
                                <div class="block bank-detail" v-if="mayaMethod">
                                    <p class="subtitle">Verify your Maya details: </p>
                                    <div class="field">
                                        <label class="label">Phone Number</label>
                                        <div class="control">
                                            <input class="input" type="number" v-model="mayaNumber" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Full Name</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="mayaFName" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="buttons is-centered" v-if="gcashMethod || mayaMethod">
                                    <button class="button" @click="gcashMethod = false, mayaMethod = false">Cancel</button>
                                    <button class="button is-info" @click="updateBankDetails"
                                        :class="{ 'is-loading': buttonUpdateLoading }">Confirm</button>
                                </div>
                                <div class="notification is-success" v-if="successUpdate">Successfully updated.</div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bank-detail {
    width: 70%;
    margin: auto
}

@media (max-width: 991.98px) {
    .bank-detail {
        width: 100% !important;
    }
}
</style>
