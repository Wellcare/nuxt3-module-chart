import type {
    Gender,
    MeasurementType,
    Observation,
    Organization,
    PercentileKey,
    TimeRange,
} from '../../../../models'

import { template } from './template'
import { safeParseFloat } from '../../../../utils'

export interface ChartOptions {
    organize: Organization
    type: MeasurementType
    gender: Gender
    time: TimeRange
    data?: Observation[]
}

export interface ProcessedDataPoint {
    percentile: number
    time: string
    value: number
    buffer: boolean
}

export interface Limits {
    x: { min: number; max: number }
    y: { min: number; max: number }
}

// Constants for percentile mapping
const PERCENTILE_MAP: Record<PercentileKey, number> = {
    '3rd percentile': 3,
    '5th percentile': 5,
    '10th percentile': 10,
    '15th percentile': 15,
    '25th percentile': 25,
    '50th percentile': 50,
    '75th percentile': 75,
    '85th percentile': 85,
    '90th percentile': 90,
    '95th percentile': 95,
    '97th percentile': 97,
    '3rd percentile head': 3,
    '5th percentile head': 5,
    '10th percentile head': 10,
    '15th percentile head': 15,
    '25th percentile head': 25,
    '50th percentile head': 50,
    '75th percentile head': 75,
    '85th percentile head': 85,
    '90th percentile head': 90,
    '95th percentile head': 95,
    '97th percentile head': 97,
}

class GrowthChartError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'GrowthChartError'
    }
}

export function getTemplate(options: ChartOptions): ProcessedDataPoint[] {
    try {
        // Validate required options
        if (
            !options.organize ||
            !options.type ||
            !options.time ||
            !options.gender
        ) {
            throw new GrowthChartError('Missing required options')
        }

        const isValid = Boolean(
            template[options.organize]?.[options.type]?.[options.gender]?.[
                options.time
            ],
        )
        if (!isValid) {
            throw new GrowthChartError('Invalid template access path')
        }

        // Get the relevant template data
        const templateData =
            template[options.organize]?.[options.type]?.[options.gender][
                options.time
            ]
        if (!templateData) {
            throw new GrowthChartError(
                `No data available for the specified parameters: ${JSON.stringify(options)}`,
            )
        }

        // Process the line data with proper type handling for string values
        const line: ProcessedDataPoint[] = Object.entries(templateData).flatMap(
            ([key, percentileData]) => {
                const percentileKey = key as PercentileKey
                return percentileData.data.map((item) => ({
                    percentile: PERCENTILE_MAP[percentileKey] ?? 0,
                    time: item.x,
                    value: safeParseFloat(item.y),
                    buffer: false,
                }))
            },
        )

        // Add buffer points if user data is provided
        if (options.data?.length) {
            const userDataValues: number[] = options.data
                .map((d) =>
                    typeof d.value === 'string'
                        ? safeParseFloat(d.value)
                        : d.value || 0,
                )
                .filter(
                    (v): v is number =>
                        typeof v === 'number' &&
                        !Number.isNaN(v) &&
                        v !== undefined,
                )

            if (userDataValues.length > 0) {
                const minUserValue = Math.min(...userDataValues)

                // Add lower buffer point
                line.unshift({
                    percentile: line[0].percentile - 1,
                    time: line[0].time,
                    value: Math.min(minUserValue, line[0].value - 2),
                    buffer: true,
                })

                // Add upper buffer point
                line.push({
                    percentile: line[line.length - 1].percentile + 1,
                    time: line[line.length - 1].time,
                    value: line[line.length - 1].value + 2,
                    buffer: true,
                })
            }
        }

        return line
    } catch (error) {
        console.error(
            'Error processing growth chart data:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        return []
    }
}

export function getLimits(data: ProcessedDataPoint[]): Limits {
    const times = data.map((item) => Number(item.time))
    const values = data.map((item) => Number(item.value))

    return {
        x: {
            min: Math.min(...times),
            max: Math.max(...times),
        },
        y: {
            min: Math.min(...values),
            max: Math.max(...values),
        },
    }
}
