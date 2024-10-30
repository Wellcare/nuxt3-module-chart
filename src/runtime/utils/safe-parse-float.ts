export function safeParseFloat(value: string): number {
    const parsed = Number.parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
}
