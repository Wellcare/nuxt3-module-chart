export const parseDate = (date: string | Date | undefined): Date => {
    if (!date) return new Date()

    try {
        if (date instanceof Date) {
            if (Number.isNaN(date.getTime())) {
                return new Date() // Return current date if invalid Date object
            }
            return date
        }

        const parsedDate = new Date(date)
        if (Number.isNaN(parsedDate.getTime())) {
            return new Date() // Return current date if parsing fails
        }
        return parsedDate
    } catch (error) {
        console.error('Error parsing date:', error)
        return new Date() // Return current date if any error occurs
    }
}
