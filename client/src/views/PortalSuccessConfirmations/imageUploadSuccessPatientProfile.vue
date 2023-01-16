<template>
    <div class="container" style="margin-top: 20%">
        <h1 class="title has-text-centered">Profile image has been changed successfully, changes may take a few minutes
            to hours
            to take effect.</h1>
        <br />
        <h1 class="subtitle has-text-centered">Redirecting browser in 15 seconds.</h1>
        <h1 class="subtitle has-text-centered">
            If the browser does not reload automatically, please click
            <a href="/account/login">here</a>
        </h1>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

onMounted(() => {
    setTimeout(() => {
        window.location.href = "/account/login"
        store.commit('imgSuccess', false)
    }, 15000)
});
</script>

<style>

</style>