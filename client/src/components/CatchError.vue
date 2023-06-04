<script setup>
import { computed } from 'vue'

const props = defineProps({
    errMsg: null
});

const message = computed(() => props.errMsg)
</script>
<template>
    <div class="notification is-danger" v-if="message">Sorry, something went wrong. {{ message.message }}, please
        try again later or
        <router-link :to="'/contactus'">contact us</router-link>.
    </div>
</template>