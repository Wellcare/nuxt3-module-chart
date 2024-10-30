<script setup lang="ts">
import {
    computed,
    onBeforeMount,
    ref,
    useObservations,
    useRoute,
    useRouter,
} from '#imports'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { RenderChart, TabLayout } from '../../../internal/Chart/Common'
import WrapperDynamicForm from '../../../internal/Form/index.vue'
import Options from './Options.vue'

import type { Observation, Gender } from '../../../../models'
import { usePercentileChart } from '../../../../composables'

// Constants
const FORMAT_KEY_CHART = {
    height: 'Person Height',
    weight: 'Person Weight',
    headCircumference: 'Person Head Circumference',
} as const

const TABS = [
    {
        label: 'body-index.chart.common.layout.tab.label.height',
        value: 'height',
        icon: 'pi-arrows-v',
    },
    {
        label: 'body-index.chart.common.layout.tab.label.weight',
        value: 'weight',
        icon: 'pi-chart-bar',
    },
    {
        label: 'body-index.chart.common.layout.tab.label.head-circumference',
        value: 'headCircumference',
        icon: 'pi-circle',
    },
]

// Props and Emits
interface Props {
    keyChart: Observation['key']
    userId: string
    gender: Gender
}

const props = withDefaults(defineProps<Props>(), {
    gender: 'M',
})
const emit = defineEmits<{
    'on:change-tab-layout': [value: Observation['key']]
}>()

// Composables
const route = useRoute()
const router = useRouter()
const confirm = useConfirm()

// Refs and State
const wrapperDynamicFormRef = ref<InstanceType<typeof WrapperDynamicForm>>()
const defaultData = ref<Record<string, any>>({})
const currObs = ref<Observation>()

// Computed
const keyChartComputed = computed<Observation['key']>(
    () => props.keyChart || (route.query?.key as Observation['key']),
)

const typeSubmit = computed<'create' | 'update'>(() =>
    Object.keys(defaultData.value).length ? 'update' : 'create',
)

// Custom Hook
const {
    observations,
    updateQuery,
    isLoading,
    importCreate,
    deleteObservation,
    updateObservation,
} = useObservations({
    userId: computed(() => props.userId),
})

const { schema, el } = usePercentileChart()

// Methods
const refreshSearch = (keyChart: Observation['key']) => {
    updateQuery({
        filter: {
            user: props.userId,
            name: [FORMAT_KEY_CHART[keyChart as keyof typeof FORMAT_KEY_CHART]],
        },
        limit: 100,
        sort: '-observedAt',
    })
}

const handleOnChangeTabLayout = (value: Observation['key']) => {
    emit('on:change-tab-layout', value)
    refreshSearch(value)
    router.push({
        query: {
            ...route.query,
            key: value,
        },
    })
}

const resetForm = () => {
    defaultData.value = {}
}

const onAdd = () => {
    resetForm()
    wrapperDynamicFormRef.value?.open(
        keyChartComputed.value as Observation['key'],
    )
}

const onEdit = (observation: Observation) => {
    if (!observation?.key) return

    currObs.value = observation
    wrapperDynamicFormRef.value?.open(observation.key)

    defaultData.value = {
        observedAt: observation.observedAt,
        height: observation.value,
        weight: observation.value,
        headCircumference: observation.value,
    }
}

const onDelete = async (observation: Observation) => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger',
        },
        accept: async () => {
            if (observation._id) {
                await deleteObservation(observation._id)
            }
        },
    })
    wrapperDynamicFormRef.value?.closeDialog()
}

const onSubmit = async (observations: Observation[]) => {
    if (typeSubmit.value === 'create') {
        await importCreate(observations)
    } else if (currObs.value?._id) {
        await updateObservation(currObs.value._id, {
            ...observations[0],
        })
    }
    wrapperDynamicFormRef.value?.closeDialog()
}

const handleUpdateValue = (value: Record<string, any>) => {
    console.log(value)
}

// Lifecycle
onBeforeMount(() => {
    refreshSearch(keyChartComputed.value as Observation['key'])
})
</script>

<template>
    <TabLayout
        ref="el"
        :tabs="TABS"
        :default-tab="keyChartComputed"
        :observations="observations"
        @on:change="handleOnChangeTabLayout"
        @on:add="onAdd"
        @on:edit="onEdit"
        @on:delete="onDelete">
        <template #body-header>
            <Options
                :observation-key="keyChartComputed"
                @update:model-value="handleUpdateValue" />
        </template>
        <template #[`body-${keyChartComputed}`]>
            <WrapperDynamicForm
                ref="wrapperDynamicFormRef"
                :user-id="userId"
                :is-loading="isLoading"
                :default-data="defaultData"
                @on:submit="onSubmit">
                <RenderChart
                    :component-id="`chart-${keyChartComputed}`"
                    :schema="schema" />
            </WrapperDynamicForm>
            <ConfirmDialog />
        </template>
    </TabLayout>
</template>
