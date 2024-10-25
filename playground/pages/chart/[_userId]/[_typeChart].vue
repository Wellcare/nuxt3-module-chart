<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const route = useRoute()
const { user } = await useUserInfo({ scope: '_id' })

const chartType = computed(() => {
    const path = route.path
    const segments = path.split('/')
    return segments[segments.length - 1] || ''
})
</script>

<template>
    <div v-if="user._id" class="p-2">
        <WChart :type="chartType" :user-id="user._id" />
    </div>
</template>
