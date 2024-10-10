<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

const { user } = useUserInfo({ scope: '_id' })
</script>

<template>
    <div class="container mx-auto py-4">
        <WVaccination v-if="user?._id" :user-id="user?._id" />
    </div>
</template>
