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
</style>
