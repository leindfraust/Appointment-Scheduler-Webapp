<template>
  <div class="container" style="margin-top: 20%">
    <h1
      class="title has-text-centered"
    >Hospital image changed successfully, changes may take a few minutes to hours to take effect.</h1>
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
  name: 'imgUploadSuccessManager',
  created() {
    setTimeout(() => {
      window.location.href = "/user/manager/login"
      this.$store.commit('imgSuccessManager', false)
    }, 15000)
  }
}
</script>

<style>
</style>