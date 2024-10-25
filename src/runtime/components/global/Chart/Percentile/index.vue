<script setup lang="ts">
import { RenderChart, TabLayout } from '../../../internal/Chart/Common'
import type { Observation } from '../../../../models'
import {
    computed,
    onBeforeMount,
    useObservations,
    useRoute,
    useRouter,
} from '#imports'

const FORMAT_KEY_CHART = {
    height: 'Person Height',
    weight: 'Person Weight',
    headCircumference: 'Person Head Circumference',
}

interface Props {
    keyChart: Observation['key']
    userId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'on:change-tab-layout': [value: Observation['key']]
}>()

const route = useRoute()
const router = useRouter()

const keyChartComputed = computed<string>(
    () => props.keyChart || (route.query?.key as string) || '',
)

const { observations, updateQuery } = useObservations({
    userId: computed(() => props.userId),
})

const tabs = [
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

const data = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    description:
        'A basic bar chart example, with value labels shown upon pointer hover.',
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
                update: {
                    fill: { value: 'steelblue' },
                },
                hover: {
                    fill: { value: 'red' },
                },
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

onBeforeMount(() => {
    refreshSearch(keyChartComputed.value as Observation['key'])
})
</script>

<template>
    <TabLayout
        :tabs="tabs"
        :default-tab="keyChartComputed"
        :observations="observations"
        @on:change="handleOnChangeTabLayout">
        <template #[`body-${keyChartComputed}`]>
            <RenderChart :component-id="`chart-1`" :schema="data" />
        </template>
    </TabLayout>
</template>
