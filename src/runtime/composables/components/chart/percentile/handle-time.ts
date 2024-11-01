import dayjs from 'dayjs'

// Main calculator functions
export const calculateDecimalMonths = (
    startDate: string,
    endDate: string,
): number => {
    const DATE_FORMAT = 'DD/MM/YYYY'

    const start = dayjs(startDate, DATE_FORMAT)
    const end = dayjs(endDate, DATE_FORMAT)

    if (!start.isValid() || !end.isValid()) {
        throw new Error('Invalid date format. Please use DD/MM/YYYY')
    }

    if (end.isBefore(start)) {
        throw new Error('End date must be after start date')
    }

    return end.diff(start, 'month', true)
}

export const calculateDecimalWeeks = (
    startDate: string,
    endDate: string,
): number => {
    const DATE_FORMAT = 'DD/MM/YYYY'

    const start = dayjs(startDate, DATE_FORMAT)
    const end = dayjs(endDate, DATE_FORMAT)

    if (!start.isValid() || !end.isValid()) {
        throw new Error('Invalid date format. Please use DD/MM/YYYY')
    }

    if (end.isBefore(start)) {
        throw new Error('End date must be after start date')
    }

    return end.diff(start, 'week', true)
}

// export const formatDurationText = (duration: Duration): string => {
//     const parts: string[] = []

//     if ('years' in duration && duration.years) {
//         parts.push(i18n.t('{years} years', { years: duration.years }))
//     }

//     if ('months' in duration && duration.months) {
//         parts.push(i18n.t('{months} months', { months: duration.months }))
//     }

//     if ('weeks' in duration && duration.weeks) {
//         parts.push(i18n.t('{weeks} weeks', { weeks: duration.weeks }))
//     }

//     if (duration.days) {
//         parts.push(i18n.t('{days} days', { days: duration.days }))
//     }

//     return parts.join(' ').trim()
// }
