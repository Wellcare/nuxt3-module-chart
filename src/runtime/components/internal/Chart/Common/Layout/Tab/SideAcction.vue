<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

import CardIndex from './Card.vue'
import type { Observation } from '../../../../../../models'

interface Props {
    observations: Observation[]
    title?: string
    loading?: boolean
}

withDefaults(defineProps<Props>(), {
    observations: () => [],
    title: 'Growth Data',
    loading: false,
})

defineEmits<{
    'on:add': []
    'on:delete': [value: Observation]
    'on:edit': [value: Observation]
}>()
</script>

<template>
    <Card>
        <template #title>
            <div class="hidden items-center justify-between pb-2 md:flex">
                <div class="flex items-center gap-2">
                    <i class="pi pi-chart-bar text-primary" />
                    <span class="text-xl font-bold">{{ title }}</span>
                </div>
                <Button
                    icon="pi pi-plus"
                    class="p-button-rounded p-button-outlined"
                    @click="$emit('on:add')" />
            </div>
        </template>

        <template #content>
            <div class="flex-grow space-y-4 overflow-y-auto md:max-h-[80vh]">
                <!-- Empty State -->
                <div
                    v-if="observations.length === 0 && !loading"
                    class="flex flex-col items-center justify-center space-y-2 py-8 text-gray-400">
                    <i class="pi pi-chart-line text-4xl" />
                    <p>No observations available</p>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-8">
                    <i class="pi pi-spin pi-spinner text-primary text-2xl" />
                </div>

                <!-- Observations List -->
                <CardIndex
                    v-for="(observation, index) in observations"
                    :key="index"
                    :observation="observation"
                    @on:edit="$emit('on:edit', observation)"
                    @on:delete="$emit('on:delete', observation)" />
            </div>
        </template>
    </Card>
</template>
