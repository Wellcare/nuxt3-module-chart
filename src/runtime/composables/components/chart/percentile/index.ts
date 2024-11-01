import { computed, ref, useDisplay, watch } from '#imports'
import type { ComputedRef, Ref } from '#imports'

import {
    getTemplate,
    getLimits,
    type ProcessedDataPoint,
    type ChartOptions,
} from './get-template'
import { adaptObs, type AdaptObs } from './adapter'
import type { Observation } from '../../../../models'

interface PercentileChartReturn {
    schema: ComputedRef<any>
    obsAdapted: Ref<AdaptObs[]>
    updateSchemas: (options: ChartOptions) => void
    key: ComputedRef<string> // Add key to return type
}

interface PercentileChartProps {
    observations: ComputedRef<Observation[]>
    dob: ComputedRef<string>
}

export const usePercentileChart = ({
    observations,
    dob,
}: PercentileChartProps): PercentileChartReturn => {
    const { display } = useDisplay()
    const template = ref<ProcessedDataPoint[]>([])
    const optionsRef = ref<Partial<ChartOptions>>({})
    const obsRef = ref<AdaptObs[]>([])
    const updateCounter = ref(0) // Add counter for tracking updates

    const updateSchemas = (options: ChartOptions) => {
        template.value = getTemplate(options)
        optionsRef.value = options
        obsRef.value = adaptObs({
            observations: observations.value,
            dob: dob.value,
            time: optionsRef.value?.time || '6m',
            limits: getLimits(template.value),
        })
        updateCounter.value++ // Increment counter on options update
    }

    // Watch for changes in observations and dob
    watch([observations, dob], () => {
        updateSchemas(optionsRef.value as ChartOptions)
    })

    // Computed key that changes with any update
    const key = computed(() => {
        return `chart-${updateCounter.value}-${dob.value}-${optionsRef.value?.time || '6m'}`
    })

    const schema = computed(() => ({
        $schema: 'https://vega.github.io/schema/vega/v5.json',
        width: display.breakpoint?.w / 1.4,
        height: display.breakpoint?.h / 1.5,
        padding: 5,
        title: {
            text: ['Height(cm)'],
            font: 'Quicksand, sans-serif',
            dy: -15,
        },
        signals: [
            { name: 'interpolate', value: 'linear' },
            {
                name: 'active',
                value: {},
                on: [
                    { events: '@point:mouseover', update: 'datum' },
                    { events: '@point:mouseout', update: '{}' },
                ],
            },
        ],
        data: [
            {
                name: 'growthRange',
                values: template.value,
            },
            {
                name: 'noteDatas',
                source: 'growthRange',
                transform: [
                    {
                        type: 'aggregate',
                        groupby: ['percentile'],
                        fields: ['value', 'buffer'],
                        ops: ['max', 'max'],
                        as: ['last', 'buffer'],
                    },
                    {
                        type: 'formula',
                        expr: "scale('suffixScale', datum.percentile)",
                        as: 'suffix',
                    },
                ],
            },
            {
                name: 'measurements',
                values: obsRef.value,
            },
        ],
        scales: [
            {
                name: 'x',
                type: 'linear',
                domain: { data: 'growthRange', field: 'time' },
                range: 'width',
                zero: false,
            },
            {
                name: 'y',
                type: 'linear',
                domain: { data: 'growthRange', field: 'value' },
                range: 'height',
                zero: false,
            },
            {
                name: 'genderColorScale',
                type: 'ordinal',
                domain: ['F', 'M'],
                range: ['#e84393', '#0984e3'],
            },
            {
                name: 'suffixScale',
                type: 'bin-ordinal',
                domain: [1, 2, 3, 4],
                range: ['st', 'nd', 'rd', 'th'],
            },
        ],
        axes: [
            {
                scale: 'x',
                orient: 'bottom',
                title: 'Month',
                grid: true,
                tickCount: 15,
                titleFontSize: 18,
                titleAnchor: 'end',
                domain: true,
                titleFontWeight: '400',
            },
            {
                scale: 'y',
                orient: 'left',
                grid: true,
                titleFontSize: 18,
                titleFontWeight: '400',
            },
            { scale: 'y', orient: 'right', grid: true },
        ],
        marks: [
            {
                type: 'rule',
                encode: {
                    enter: {
                        y: { signal: 'height' },
                        strokeDash: { value: [5, 5] },
                    },
                    update: {
                        opacity: { signal: 'active.time != null ? 1 : 0' },
                        y2: { scale: 'y', signal: 'active.value' },
                        x: { scale: 'x', signal: 'active.time' },
                    },
                },
            },
            {
                type: 'rule',
                encode: {
                    enter: { x: { value: 0 }, strokeDash: { value: [5, 5] } },
                    update: {
                        opacity: { signal: 'active.time != null ? 1 : 0' },
                        y: { scale: 'y', signal: 'active.value' },
                        x2: { scale: 'x', signal: 'active.time' },
                    },
                },
            },
            {
                type: 'group',
                from: {
                    facet: {
                        name: 'series',
                        data: 'growthRange',
                        groupby: 'percentile',
                    },
                },
                marks: [
                    {
                        type: 'line',
                        from: { data: 'series' },
                        encode: {
                            enter: {
                                x: { scale: 'x', field: 'time' },
                                y: { scale: 'y', field: 'value' },
                                stroke: {
                                    scale: 'genderColorScale',
                                    value: optionsRef.value?.gender || 'M',
                                },
                                strokeWidth: { value: 2 },
                                interpolate: { value: 'basis' },
                                strokeOpacity: {
                                    signal: 'datum.buffer ? 0 : 0.5',
                                },
                            },
                        },
                    },
                ],
            },
            {
                type: 'text',
                from: { data: 'noteDatas' },
                encode: {
                    enter: {
                        x: { signal: 'width', offset: -5 },
                        y: { scale: 'y', field: 'last', offset: 0 },
                        text: { signal: 'datum.percentile + datum.suffix' },
                        align: { value: 'right' },
                        fontSize: { value: 14 },
                        fill: { value: 'black' },
                        baseline: { value: 'middle' },
                        opacity: { signal: 'datum.buffer ? 0 : 1' },
                    },
                },
            },
            {
                type: 'line',
                from: { data: 'measurements' },
                encode: {
                    enter: {
                        x: { scale: 'x', field: 'time' },
                        y: { scale: 'y', field: 'value' },
                        strokeWidth: { value: 2.5 },
                        stroke: { value: 'black' },
                    },
                },
            },
            {
                type: 'symbol',
                name: 'point',
                from: { data: 'measurements' },
                encode: {
                    enter: {
                        x: { scale: 'x', field: 'time' },
                        y: { scale: 'y', field: 'value' },
                        strokeWidth: { value: 1.5 },
                        stroke: { value: 'black' },
                        fill: { value: 'white' },
                        size: { value: 40 },
                        tooltip: {
                            signal: "{title: datum.diffDob,\n                    'observedAt': datum.obvervedFormat,\n                    'value': datum.valueText}",
                        },
                    },
                },
            },
            {
                type: 'image',
                encode: {
                    enter: {
                        url: {
                            value: 'https://cdn.wellcare.vn/file-proxy/cms-gallery/6433bc35d8f5ef4d37045ddb/logo1080.png',
                        },
                        x: { value: 5 },
                        y: { value: 5 },
                        width: { signal: '50' },
                        opacity: { value: 0.7 },
                    },
                },
            },
        ],
    }))

    return {
        schema,
        obsAdapted: obsRef,
        updateSchemas,
        key, // Return the key in the interface
    }
}
