<script setup lang="ts">
const route = useRoute()

const chartType = computed(() => {
    const path = route.path
    const segments = path.split('/')
    return segments[segments.length - 1] || ''
})
</script>

<template>
    <WChart :type="chartType" />
</template>
