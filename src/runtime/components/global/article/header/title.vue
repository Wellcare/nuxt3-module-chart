<script setup lang="ts">
const { title } = defineProps({
    title: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <h1>
        {{ title }}
    </h1>
</template>
