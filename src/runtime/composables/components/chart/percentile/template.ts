// WHO
// weight
// boy
import whoWeightForBoy13w from '../../../../assets/data/weight-for-age-boy-birthto13w-percentile-who.json'
import whoWeightForBoy60m from '../../../../assets/data/weight-for-age-boy-birthto60m-percentile-who.json'
// girl
import whoWeightForGirl13w from '../../../../assets/data/weight-for-age-girl-birthto13w-percentile-who.json'
import whoWeightForGirl60m from '../../../../assets/data/weight-for-age-girl-birthto60m-percentile-who.json'
// height
// boy
import whoHeightForBoy13w from '../../../../assets/data/height-for-age-boy-birthto13w-percentile-who.json'
import whoHeightForBoy60m from '../../../../assets/data/height-for-age-boy-birthto60m-percentile-who.json'
// girl
import whoHeightForGirl13w from '../../../../assets/data/height-for-age-girl-birthto13w-percentile-who.json'
import whoHeightForGirl60m from '../../../../assets/data/height-for-age-girl-birthto60m-percentile-who.json'
// head
// boy
import whoHeadForBoy13w from '../../../../assets/data/head-for-age-boy-birthto13w-percentile-who.json'
import whoHeadForBoy60m from '../../../../assets/data/head-for-age-boy-birthto60m-percentile-who.json'
// girl
import whoHeadForGirl13w from '../../../../assets/data/head-for-age-girl-birthto13w-percentile-who.json'
import whoHeadForGirl60m from '../../../../assets/data/head-for-age-girl-birthto60m-percentile-who.json'

// CDC
// weight
// boy
import cdcWeightForBoy240m from '../../../../assets/data/weight-for-age-boy-birthto240m-percentile-cdc.json'
// girl
import cdcWeightForGirl240m from '../../../../assets/data/weight-for-age-girl-birthto240m-percentile-cdc.json'
// height
// boy
import cdcHeightForBoy240m from '../../../../assets/data/length-for-age-boy-birthto240m-percentile-cdc.json'
// girl
import cdcHeightForGirl240m from '../../../../assets/data/length-for-age-girl-birthto240m-percentile-cdc.json'
// head
// boy
import cdcHeadForBoy36m from '../../../../assets/data/head-for-age-boy-birthto36m-percentile-cdc.json'
// girl
import cdcHeadForGirl36m from '../../../../assets/data/head-for-age-girl-birthto36m-percentile-cdc.json'

import type {
    MeasurementType,
    Gender,
    TimeRange,
    Series,
} from '../../../../models'
import { safeParseFloat } from '../../../../utils'

interface Period {
    min: number
    max: number
}

interface TemplateStructure {
    who: Partial<
        Record<
            Partial<MeasurementType>,
            Record<
                Gender,
                Partial<Record<Partial<TimeRange>, Partial<Series['series']>>>
            >
        >
    >
    cdc: Partial<
        Record<
            Partial<MeasurementType>,
            Record<
                Gender,
                Partial<Record<Partial<TimeRange>, Partial<Series['series']>>>
            >
        >
    >
}

export const PERIODS: Record<TimeRange, Period> = {
    '13w': { min: 0, max: 13 },
    '6m': { min: 0, max: 6 },
    '24m': { min: 0, max: 24 },
    '36m': { min: 0, max: 36 },
    '6mto24m': { min: 6, max: 24 },
    '24mto60m': { min: 24, max: 60 },
    '60m': { min: 0, max: 60 },
    '240m': { min: 0, max: 240 },
}

// Utility Functions
function filterPercentilesByXRange(
    series: Series['series'],
    xRange: Period,
): Series['series'] {
    return Object.fromEntries(
        Object.entries(series).map(([percentileName, percentileData]) => [
            percentileName,
            {
                data: percentileData.data.filter((point) => {
                    const x = safeParseFloat(point.x)
                    return x >= xRange.min && x <= xRange.max
                }),
            },
        ]),
    )
}

// Data imports remain the same as in your original code
// Template definition remains the same as in your original code
export const template: TemplateStructure = {
    who: {
        height: {
            F: {
                '13w': whoHeightForGirl13w.series,
                '6m': filterPercentilesByXRange(
                    whoHeightForGirl60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoHeightForGirl60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoHeightForGirl60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoHeightForGirl60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoHeightForGirl60m.series,
            },
            M: {
                '13w': whoHeightForBoy13w.series,
                '6m': filterPercentilesByXRange(
                    whoHeightForBoy60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoHeightForBoy60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoHeightForBoy60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoHeightForBoy60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoHeightForBoy60m.series,
            },
        },
        weight: {
            F: {
                '13w': whoWeightForGirl13w.series,
                '6m': filterPercentilesByXRange(
                    whoWeightForGirl60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoWeightForGirl60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoWeightForGirl60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoWeightForGirl60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoWeightForGirl60m.series,
            },
            M: {
                '13w': whoWeightForBoy13w.series,
                '6m': filterPercentilesByXRange(
                    whoWeightForBoy60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoWeightForBoy60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoWeightForBoy60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoWeightForBoy60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoWeightForBoy60m.series,
            },
        },
        headCircumference: {
            F: {
                '13w': whoHeadForGirl13w.series,
                '6m': filterPercentilesByXRange(
                    whoHeadForGirl60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoHeadForGirl60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoHeadForGirl60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoHeadForGirl60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoHeadForGirl60m.series,
            },
            M: {
                '13w': whoHeadForBoy13w.series,
                '6m': filterPercentilesByXRange(
                    whoHeadForBoy60m.series,
                    PERIODS['6m'],
                ),
                '24m': filterPercentilesByXRange(
                    whoHeadForBoy60m.series,
                    PERIODS['24m'],
                ),
                '6mto24m': filterPercentilesByXRange(
                    whoHeadForBoy60m.series,
                    PERIODS['6mto24m'],
                ),
                '24mto60m': filterPercentilesByXRange(
                    whoHeadForBoy60m.series,
                    PERIODS['24mto60m'],
                ),
                '60m': whoHeadForBoy60m.series,
            },
        },
    },
    cdc: {
        height: {
            F: {
                '36m': filterPercentilesByXRange(
                    cdcHeightForGirl240m.series,
                    PERIODS['36m'],
                ),
                '240m': cdcHeightForGirl240m.series,
            },
            M: {
                '36m': filterPercentilesByXRange(
                    cdcHeightForBoy240m.series,
                    PERIODS['36m'],
                ),
                '240m': cdcHeightForBoy240m.series,
            },
        },
        weight: {
            F: {
                '36m': filterPercentilesByXRange(
                    cdcWeightForGirl240m.series,
                    PERIODS['36m'],
                ),
                '240m': cdcWeightForGirl240m.series,
            },
            M: {
                '36m': filterPercentilesByXRange(
                    cdcWeightForBoy240m.series,
                    PERIODS['36m'],
                ),
                '240m': cdcWeightForBoy240m.series,
            },
        },
        headCircumference: {
            F: {
                '36m': cdcHeadForGirl36m.series,
            },
            M: {
                '36m': cdcHeadForBoy36m.series,
            },
        },
    },
}
