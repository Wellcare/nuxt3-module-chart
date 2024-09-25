<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
    layout: 'wellcare',
})
</script>

<template>
    <div>{{ $route.name }}</div>
</template>
