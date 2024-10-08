<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const route = useRoute()

const chartType = computed(() => {
    const path = route.path
    const segments = path.split('/')
    return segments[segments.length - 1] || ''
})
</script>

<template>
    <div class="p-6"><WChart :type="chartType" /></div>
</template>
