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

<script>
export default {
    name: "imageUploadSuccessDoctor",
    created() {
        setTimeout(() => {
            window.location.href = "/doctor/login"
            this.$store.commit('imgSuccess', false)
        }, 15000)
    }
}
</script>

<style>

</style>