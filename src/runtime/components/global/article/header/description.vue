<script setup lang="ts">
defineProps({
    description: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <h5 class="opacity-80">
        {{ description }}
    </h5>
</template>
