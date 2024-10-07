<script setup lang="ts">
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
    <WBodyIndex
        v-if="user._id"
        :user-id="user._id"
        @click="handleClick"
        @add="handleAdd" />
</template>
