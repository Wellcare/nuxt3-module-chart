import { computed, useDisplay } from '#imports'
import type { ComputedRef } from '#imports'
import { getTemplate } from './get-template'
// import type { Observation } from '../../../../models'

interface PercentileChartReturn {
    schema: ComputedRef<any>
}

// interface PercentileChartProps {
//     observations: ComputedRef<Observation[]>
//     query: any
// }

export const usePercentileChart = () // props: PercentileChartProps,
: PercentileChartReturn => {
    const { display } = useDisplay()

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
                values: getTemplate({
                    organize: 'who',
                    type: 'height',
                    gender: 'F',
                    time: '6m',
                }),
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
                values: [
                    // {
                    //     _id: '670be668a15102f5dfdaa4a9',
                    //     labels: [],
                    //     status: 'published',
                    //     type: 'height',
                    //     key: 'height',
                    //     name: 'Person Height',
                    //     value: '64.00',
                    //     observedAt: '2024-10-13T15:25:00.000Z',
                    //     unit: 'cm',
                    //     user: '66f2b7dea72437c74fde5f8f',
                    //     createdBy: '64707571567a54c6b7b90c82',
                    //     updatedBy: '64707571567a54c6b7b90c82',
                    //     createdAt: '2024-10-13T15:25:28.020Z',
                    //     updatedAt: '2024-10-13T15:25:28.020Z',
                    //     __v: 0,
                    //     time: 3.4,
                    // },
                ],
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
                                    value: 'M',
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
    }
}
