<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

const { user } = useUserInfo({ scope: '_id' })
</script>

<template>
    <div class="container mx-auto p-4">
        <div class="mb-3 flex flex-row items-center justify-between">
            <div class="inline-flex gap-2">
                <div class="bg-primary-400 h-6 w-1 items-center rounded-2xl" />
                <h3 class="flex-auto font-semibold">Tiêm chủng</h3>
            </div>
        </div>
        <WVaccinationDetail v-if="user?._id" :user-id="user?._id" />
    </div>
</template>
