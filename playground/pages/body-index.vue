<script setup lang="ts">
const { user } = await useUserInfo({ scope: '_id' })
</script>

<template>
    <WBodyIndex v-if="user._id" :user-id="user._id" />
</template>
