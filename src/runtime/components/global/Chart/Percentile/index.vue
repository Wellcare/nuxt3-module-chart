<script setup lang="ts">
import {
    computed,
    onBeforeMount,
    ref,
    useObservations,
    useRoute,
    useRouter,
} from '#imports'
import { useConfirm } from 'primevue/useconfirm'
import { RenderChart, TabLayout } from '../../../internal/Chart/Common'
import WrapperDynamicForm from '../../../internal/Form/index.vue'
import type { Observation } from '../../../../models'

// Constants
const FORMAT_KEY_CHART = {
    height: 'Person Height',
    weight: 'Person Weight',
    headCircumference: 'Person Head Circumference',
} as const

const TABS = [
    {
        label: 'body-index.chart.common.layout.label.height',
        value: 'height',
        icon: 'pi-arrows-v',
    },
    {
        label: 'body-index.chart.common.layout.label.weight',
        value: 'weight',
        icon: 'pi-chart-bar',
    },
    {
        label: 'body-index.chart.common.layout.label.head-circumference',
        value: 'headCircumference',
        icon: 'pi-circle',
    },
]

// Props and Emits
interface Props {
    keyChart: Observation['key']
    userId: string
}

const props = defineProps<Props>()
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
const keyChartComputed = computed<string>(
    () => props.keyChart || (route.query?.key as string) || '',
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

// Lifecycle
onBeforeMount(() => {
    refreshSearch(keyChartComputed.value as Observation['key'])
})

// Chart Configuration
const chartSchema = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    description: 'Interactive bar chart with hover effects',
    width: 200,
    height: 100,
    padding: 5,
    data: [
        {
            name: 'table',
            values: [
                { category: 'A', amount: 28 },
                { category: 'B', amount: 55 },
                { category: 'C', amount: 43 },
                { category: 'D', amount: 91 },
                { category: 'E', amount: 81 },
                { category: 'F', amount: 53 },
                { category: 'G', amount: 19 },
                { category: 'H', amount: 87 },
            ],
        },
    ],
    signals: [
        {
            name: 'tooltip',
            value: {},
            on: [
                { events: 'rect:pointerover', update: 'datum' },
                { events: 'rect:pointerout', update: '{}' },
            ],
        },
    ],
    scales: [
        {
            name: 'xscale',
            type: 'band',
            domain: { data: 'table', field: 'category' },
            range: 'width',
            padding: 0.05,
            round: true,
        },
        {
            name: 'yscale',
            domain: { data: 'table', field: 'amount' },
            nice: true,
            range: 'height',
        },
    ],
    axes: [
        { orient: 'bottom', scale: 'xscale' },
        { orient: 'left', scale: 'yscale' },
    ],
    marks: [
        {
            type: 'rect',
            from: { data: 'table' },
            encode: {
                enter: {
                    x: { scale: 'xscale', field: 'category' },
                    width: { scale: 'xscale', band: 1 },
                    y: { scale: 'yscale', field: 'amount' },
                    y2: { scale: 'yscale', value: 0 },
                },
                update: { fill: { value: 'steelblue' } },
                hover: { fill: { value: 'red' } },
            },
        },
        {
            type: 'text',
            encode: {
                enter: {
                    align: { value: 'center' },
                    baseline: { value: 'bottom' },
                    fill: { value: '#333' },
                },
                update: {
                    x: {
                        scale: 'xscale',
                        signal: 'tooltip.category',
                        band: 0.5,
                    },
                    y: {
                        scale: 'yscale',
                        signal: 'tooltip.amount',
                        offset: -2,
                    },
                    text: { signal: 'tooltip.amount' },
                    fillOpacity: [
                        { test: 'datum === tooltip', value: 0 },
                        { value: 1 },
                    ],
                },
            },
        },
    ],
}
</script>

<template>
    <TabLayout
        :tabs="TABS"
        :default-tab="keyChartComputed"
        :observations="observations"
        @on:change="handleOnChangeTabLayout"
        @on:add="onAdd"
        @on:edit="onEdit"
        @on:delete="onDelete">
        <template #[`body-${keyChartComputed}`]>
            <WrapperDynamicForm
                ref="wrapperDynamicFormRef"
                :user-id="userId"
                :is-loading="isLoading"
                :default-data="defaultData"
                @on:submit="onSubmit">
                <RenderChart :component-id="'chart-1'" :schema="chartSchema" />
            </WrapperDynamicForm>
            <ConfirmDialog />
        </template>
    </TabLayout>
</template>
