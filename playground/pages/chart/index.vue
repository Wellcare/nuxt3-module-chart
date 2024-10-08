<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const { user } = await useUserInfo({ scope: '_id' })

const handleAdd = (key: string) => {
    console.log('click add', key)
}

const handleClick = (key: string) => {
    console.log('click card', key)
    navigateTo(`/chart/${user.value._id}/${key}`)
}
</script>

<template>
    <div class="mx-auto w-full max-w-7xl flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <WBodyIndex
            v-if="user._id"
            :user-id="user._id"
            @click="handleClick"
            @add="handleAdd" />
    </div>
</template>
