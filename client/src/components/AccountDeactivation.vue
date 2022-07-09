<script setup>
import ref from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
    userType: String
});
let activeModal = ref(false);

if (props.userType == 'patient') {
    await axios.post("/api/patientDeactivate", {
        id: store.state.patientID
    });
}
</script>
<template>
    <a class="subtitle has-text-danger">Deactivate Account</a>
    <div class="modal" :class="{ 'is-active': activeModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="section">
                <h1 class="title is-4 has-text-centered">Do you wish to deactivate your account?</h1>
                <p class="subtitle is-4">All of your data will remain </p>
            </div>
        </div>
        <button class="modal-close is-large"></button>
    </div>
</template>