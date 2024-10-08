<script setup lang="ts">
import { computed, onMounted, ref, useObservations } from '#imports'
import type { Observation } from '../../models'
import type { IBodyIndexCard } from '../internal/BodyIndex/card.vue'
import BodyIndexCard from '../internal/BodyIndex/card.vue'
import WrapperDynamicForm from '../internal/BodyIndex/Form/index.vue'

// Props
interface Props {
    userId: string
}

const { userId } = defineProps<Props>()

// Refs
const wrapperDynamicFormRef = ref<InstanceType<typeof WrapperDynamicForm>>()

// Observations Hook Response
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

// Computed for Adapted Observations
const adaptedObservations = computed<IBodyIndexCard[]>(() => {
    if (observations.value) {
        return adaptVitalSigns(observations.value.results)
    }
    return defaultCards
})

// Function for icon and color
const getIconAndColor = (
    key: string,
): { icon: string; bgColor: string; iconColor: string } => {
    switch (key) {
        case 'height':
            return {
                icon: 'pi pi-arrows-v',
                bgColor: 'bg-green-100',
                iconColor: 'text-green-600',
            }
        case 'weight':
            return {
                icon: 'pi pi-calculator',
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-600',
            }
        case 'headCircumference':
            return {
                icon: 'pi pi-circle',
                bgColor: 'bg-yellow-100',
                iconColor: 'text-yellow-600',
            }
        case 'bmi':
            return {
                icon: 'pi pi-chart-bar',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-600',
            }
        default:
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-gray-100',
                iconColor: 'text-gray-600',
            }
    }
}

// Default cards array
const defaultCards: IBodyIndexCard[] = [
    {
        _id: '',
        key: 'height',
        label: 'person_height',
        value: '-',
        unit: 'cm',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('height'),
    },
    {
        _id: '',
        key: 'weight',
        label: 'person_weight',
        value: '-',
        unit: 'kg',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('weight'),
    },
    {
        _id: '',
        key: 'headCircumference',
        label: 'person_head_circumference',
        value: '-',
        unit: 'cm',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('headCircumference'),
    },
    {
        _id: '',
        key: 'bmi',
        label: 'person_bmi',
        value: '-',
        unit: '',
        lastUpdated: '',
        typeChart: 'bmi',
        ...getIconAndColor('bmi'),
    },
]

// Adapting vital signs
const adaptVitalSigns = (rawObservations: Observation[]): IBodyIndexCard[] => {
    return defaultCards.map((card) => {
        const obs = rawObservations.find((o) => o.key === card.key)
        if (obs) {
            return {
                ...card,
                _id: obs._id ?? '',
                value: obs.value ?? '-',
                lastUpdated: obs.observedAt ?? '',
            }
        }
        return card
    })
}

// Handling form additions
const handleAdd = (label: IBodyIndexCard['typeChart']) => {
    wrapperDynamicFormRef.value?.open(label)
}

// Emits
defineEmits(['click', 'add'])

// Lifecycle hook
onMounted(() => {
    subscribe()
})
</script>

<template>
    <WrapperDynamicForm ref="wrapperDynamicFormRef">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BodyIndexCard
                v-for="item in adaptedObservations"
                :key="item._id || item.key"
                :body-index="item"
                :loading="isLoading"
                @add="handleAdd"
                @click="(data) => $emit('click', data)" />
        </div>
    </WrapperDynamicForm>
</template>
