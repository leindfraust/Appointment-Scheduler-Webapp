<script setup>
import { computed } from 'vue'

const props = defineProps({
    errMsg: null
});

const errMsg = computed(() => props.errMsg)
</script>
<template>
    <div class="notification is-danger" v-if="errMsg">Sorry, something went wrong. {{ errMsg.message }}, please
        try again later or
        <router-link :to="'/contactus'">contact us</router-link>.
    </div>
</template>