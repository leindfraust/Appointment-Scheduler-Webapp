<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
/* globally disable input type number arrows */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* global css for doctor */
.main-doctor::-webkit-scrollbar {
  display: none;
}

.main-doctor-content {
  max-height: 100vh;
  overflow: auto;
}

.main-doctor {
  background: linear-gradient(180deg, #DAE6FE 0%, #FFFFFF 43.56%);
}
</style>
