<script setup lang="ts">
import { computed, onMounted, useObservations, watch } from '#imports'
import type { Observation } from '../../models'
import type { IVitalSign } from '../internal/BodyIndex/card.vue'
import BodyIndexCard from '../internal/BodyIndex/card.vue'

const getIconAndColor = (
    key: string,
): { icon: string; bgColor: string; iconColor: string } => {
    switch (key) {
        case 'height':
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-red-100',
                iconColor: 'text-red-500',
            }
        case 'weight':
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-500',
            }
        case 'headCircumference':
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-yellow-100',
                iconColor: 'text-yellow-500',
            }
        case 'bmi':
            return {
                icon: 'pi pi-gauge',
                bgColor: 'bg-primary-100',
                iconColor: 'text-yellow-500',
            }
        default:
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-gray-100',
                iconColor: 'text-gray-500',
            }
    }
}

const adaptVitalSigns = (rawObservations: Observation[]) => {
    return rawObservations.map((obs) => {
        if (!obs.key) return

        const { icon, bgColor, iconColor } = getIconAndColor(obs.key)

        return {
            label: obs.name,
            icon,
            value: obs.value,
            lastUpdated: obs.observedAt,
            unit: obs.unit === 'bmi value' ? '' : obs.unit, // Remove 'bmi value' unit
            bgColor,
            iconColor,
        }
    })
}

const { userId } = defineProps({
    userId: {
        type: String,
        default: '',
    },
})

const { observations, isLoading, subscribe } = useObservations({
    userId: userId,
    initialQuery: {
        filter: {
            user: userId,
            name: [
                'Person Height',
                'Person Weight',
                'Person Head Circumference',
                'Person BMI',
            ],
        },
        limit: 1,
        sort: '-observedAt',
    },
})

const adaptedObservations = computed<IVitalSign[] | any[]>(() => {
    if (observations.value) {
        return adaptVitalSigns(observations.value.results)
    }
    return []
})

watch(observations, (newObservations) => {
    console.log('Observations changed:', newObservations)
})

onMounted(() => {
    subscribe()
})
</script>

<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BodyIndexCard
            v-for="(item, index) in adaptedObservations"
            :key="index"
            :vital-sign="item"
            :loading="isLoading" />
    </div>
</template>
