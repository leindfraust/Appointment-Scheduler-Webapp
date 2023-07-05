<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const authCheck = ref(true)
//reload once if authenticating of an account results in error
onBeforeMount(async () => {
    console.log(store.state.managerHospital)
    if (await store.state.patientUsername || await store.state.alias || await store.state.managerHospital) {
        router.go()
    } else {
        authCheck.value = false

    }
})
</script>
<template>
    <section class="section" v-if="!authCheck">
        <div class="container">
            <h1 class="title">Oops, page does not exist. Please return <router-link :to="'/'">here.</router-link></h1>
        </div>
    </section>
</template>