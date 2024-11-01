import type { Observation, TimeRange } from '../../../../models'
import { calculateDecimalMonths, calculateDecimalWeeks } from './handle-time'
import type { Limits } from './get-template'
import { safeParseFloat } from '../../../../utils'

export interface AdaptObs extends Observation {
    time: number
}

interface AdaptedObsProps {
    observations: Observation[]
    time: TimeRange
    dob: string
    limits: Limits
}

export const adaptObs = ({
    observations,
    dob,
    time,
    limits,
}: AdaptedObsProps): AdaptObs[] => {
    const timeComputed =
        time !== '13w' ? calculateDecimalMonths : calculateDecimalWeeks

    const adaptedObs = observations
        .map((obs) => {
            const decimalTime = timeComputed(dob, obs.observedAt)
            return {
                ...obs,
                time: decimalTime,
            }
        })
        // Filter observations based on x (time) and y (value) limits
        .filter((obs) => {
            const isWithinTimeRange =
                obs.time >= limits.x.min && obs.time <= limits.x.max

            const value = safeParseFloat(obs.value)
            const isWithinValueRange =
                value >= limits.y.min && value <= limits.y.max

            return isWithinTimeRange && isWithinValueRange
        })

    return adaptedObs
}
