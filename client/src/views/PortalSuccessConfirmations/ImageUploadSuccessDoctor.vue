<script setup>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onBeforeMount(() => {
    setTimeout(() => {
        window.location.href = "/account/login"
        store.commit('imgSuccess', false)
    }, 15000)
})
</script>
<template>
    <div class="container" style="margin-top: 20%">
        <h1 class="title has-text-centered">Your account has been successfully created, please login onto your account
            and setup your schedule to start.</h1>
        <br />
        <h1 class="subtitle has-text-centered">Redirecting browser in 15 seconds.</h1>
        <h1 class="subtitle has-text-centered">
            If the browser does not reload automatically, please click
            <a href="/admin/login">here</a>
        </h1>
    </div>
</template>

<style></style>