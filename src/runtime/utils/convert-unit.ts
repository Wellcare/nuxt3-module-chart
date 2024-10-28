interface ConversionResult {
    amount: number
    unit: string
}

interface ConversionFunctions {
    [unit: string]: (value: number) => number
}

interface UnitConfig {
    base: string
    conversions: ConversionFunctions
}

interface ValidUnits {
    height: UnitConfig
    weight: UnitConfig
    headCircumference: UnitConfig
    bmi: UnitConfig
}

const normalizeUnit = (unit: string | null | undefined): string => {
    return unit ? unit.toLowerCase().trim() : ''
}

const validUnits: ValidUnits = {
    height: {
        base: 'cm',
        conversions: {
            m: (value: number) => value * 100,
            inch: (value: number) => value * 2.54,
            cm: (value: number) => value,
            // Ảo data
            kg: (value: number) => value,
        },
    },
    weight: {
        base: 'kg',
        conversions: {
            g: (value: number) => value / 1000,
            lbs: (value: number) => value * 0.45359237,
            kg: (value: number) => value,
            // Ảo data
            cm: (value: number) => value,
            m: (value: number) => value,
        },
    },
    headCircumference: {
        base: 'cm',
        conversions: {
            m: (value: number) => value * 100,
            inch: (value: number) => value * 2.54,
            cm: (value: number) => value,
            // Ảo data
            kg: (value: number) => value,
        },
    },
    bmi: {
        base: 'bmi value',
        conversions: {
            'bmi value': (value: number) => value,
            kgm2: (value: number) => value,
            lbsin2: (value: number) => value * 703,
        },
    },
}

// Hàm chuyển đổi đơn vị
export const convertToBaseUnit = (
    key: keyof ValidUnits,
    value: { amount: number; unit: string },
): ConversionResult | null => {
    // Chuẩn hóa đơn vị nhập vào
    const normalizedUnit = normalizeUnit(value.unit)

    // Kiểm tra key có hợp lệ không
    const config = validUnits[key]
    if (!config) {
        console.error(`Invalid key: ${key}`)
        return null
    }

    // Lấy hàm chuyển đổi đơn vị
    const conversionFn = config.conversions[normalizedUnit]
    if (conversionFn) {
        return {
            amount: conversionFn(value.amount),
            unit: config.base,
        }
    } else {
        console.error(`Invalid unit for ${key}: ${normalizedUnit}`)
        return null
    }
}
