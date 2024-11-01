// Types
export type Gender = 'M' | 'F'
export type Organization = 'who' | 'cdc'
export type MeasurementType = 'height' | 'weight' | 'headCircumference' | 'bmi'
export type TimeRange =
    | '13w'
    | '6m'
    | '24m'
    | '36m'
    | '6mto24m'
    | '24mto60m'
    | '60m'
    | '240m'
export type PercentileKey =
    | '3rd percentile'
    | '5th percentile'
    | '10th percentile'
    | '15th percentile'
    | '25th percentile'
    | '50th percentile'
    | '75th percentile'
    | '85th percentile'
    | '90th percentile'
    | '95th percentile'
    | '97th percentile'
    | '3rd percentile head'
    | '5th percentile head'
    | '10th percentile head'
    | '15th percentile head'
    | '25th percentile head'
    | '50th percentile head'
    | '75th percentile head'
    | '85th percentile head'
    | '90th percentile head'
    | '95th percentile head'
    | '97th percentile head'

export interface DataPoint {
    x: string // Updated to string since data comes as string
    y: string // Updated to string since data comes as string
}

export interface Series {
    series: {
        [key in PercentileKey]?: {
            data: DataPoint[]
        }
    }
}
