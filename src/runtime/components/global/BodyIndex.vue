<script setup lang="ts">
import { computed, ref, useObservations } from '#imports'
import type { Observation } from '../../models'
import type { IBodyIndexCard } from '../internal/BodyIndex/card.vue'
import BodyIndexCard from '../internal/BodyIndex/card.vue'
import WrapperDynamicForm from '../internal/Form/index.vue'

interface Props {
    userId: string
}

const { userId } = defineProps<Props>()

// Emits
const emit = defineEmits(['click', 'add'])

const key = ref<Observation['key'] | any>('')
const wrapperDynamicFormRef = ref<InstanceType<typeof WrapperDynamicForm>>()

const { observations, isLoading, refresh, importCreate } = useObservations({
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

const adaptedObservations = computed<IBodyIndexCard[]>(() => {
    if (observations.value) {
        return adaptVitalSigns(observations.value)
    }
    return defaultCards
})

const getIconAndColor = (
    key: string,
): { icon: string; bgColor: string; iconColor: string } => {
    switch (key) {
        case 'height':
            return {
                icon: 'pi pi-arrows-v',
                bgColor: 'bg-gradient-to-b from-pink-200 to-pink-50',
                iconColor: 'text-pink-600',
            }
        case 'weight':
            return {
                icon: 'pi pi-calculator',
                bgColor: 'bg-gradient-to-b from-sky-200 to-sky-50',
                iconColor: '!text-sky-600',
            }
        case 'headCircumference':
            return {
                icon: 'pi pi-circle',
                bgColor: 'bg-gradient-to-b from-yellow-200 to-yellow-50',
                iconColor: 'text-yellow-600',
            }
        case 'bmi':
            return {
                icon: 'pi pi-chart-bar',
                bgColor: 'bg-gradient-to-b from-purple-200 to-purple-50',
                iconColor: 'text-purple-600',
            }
        default:
            return {
                icon: 'pi pi-chart-line',
                bgColor: 'bg-gray-50',
                iconColor: 'text-gray-600',
            }
    }
}

const defaultCards: IBodyIndexCard[] = [
    {
        _id: '',
        key: 'height',
        label: 'body-index.card.header.height',
        value: '-',
        unit: 'cm',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('height'),
    },
    {
        _id: '',
        key: 'weight',
        label: 'body-index.card.header.weight',
        value: '-',
        unit: 'kg',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('weight'),
    },
    {
        _id: '',
        key: 'headCircumference',
        label: 'body-index.card.header.head-circumference',
        value: '-',
        unit: 'cm',
        lastUpdated: '',
        typeChart: 'percentile',
        ...getIconAndColor('headCircumference'),
    },
    {
        _id: '',
        key: 'bmi',
        label: 'body-index.card.header.bmi',
        value: '-',
        unit: '',
        lastUpdated: '',
        typeChart: 'bmi',
        ...getIconAndColor('bmi'),
    },
]

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

const handleAdd = (val: IBodyIndexCard['key']) => {
    key.value = val
    wrapperDynamicFormRef.value?.open(val)
}

const handleClick = ({
    key,
    typeChart,
}: {
    key: IBodyIndexCard['key']
    typeChart: IBodyIndexCard['typeChart']
}) => {
    emit('click', {
        key,
        typeChart,
    })
}

const handleSubmit = async (val: Observation[]) => {
    await importCreate(val)
    wrapperDynamicFormRef.value?.getComponentRef(key.value)?.resetForm()
    wrapperDynamicFormRef.value?.closeDialog()
}

defineExpose({
    refreshSearch: refresh,
})
</script>

<template>
    <WrapperDynamicForm
        ref="wrapperDynamicFormRef"
        :user-id="userId"
        :is-loading="isLoading"
        @on:submit="handleSubmit">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BodyIndexCard
                v-for="item in adaptedObservations"
                :key="item._id || item.key"
                :body-index="item"
                :loading="isLoading"
                @add="handleAdd"
                @click="
                    handleClick({
                        key: item.key,
                        typeChart: item.typeChart,
                    })
                " />
        </div>
    </WrapperDynamicForm>
</template>
