<script setup lang="ts">
import { computed, useDayjs } from '#imports'

const props = defineProps({
    time: {
        type: String,
        default: '',
    },
})

const dayjs = useDayjs()

const formattedTime = computed(() => {
    const formattedString = dayjs(props.time).format('dddd, DD/MM/YYYY')
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1)
})
</script>

<template>
    <span>{{ formattedTime }}</span>
</template>
