// Types
import type { ComponentPublicInstance } from '#imports'

export const clamp = (value: number, min = 0, max = 1) => {
    return Math.max(min, Math.min(max, value))
}

export const isObject = (obj: any): obj is Record<string, any> => {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export const mergeDeep = (
    source: Record<string, any> = {},
    target: Record<string, any> = {},
    arrayFn?: (a: unknown[], b: unknown[]) => unknown[],
) => {
    const out: Record<string, any> = {}

    for (const key in source) {
        out[key] = source[key]
    }

    for (const key in target) {
        const sourceProperty = source[key]
        const targetProperty = target[key]

        // Only continue deep merging if
        // both properties are objects
        if (isObject(sourceProperty) && isObject(targetProperty)) {
            out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn)

            continue
        }

        if (
            Array.isArray(sourceProperty) &&
            Array.isArray(targetProperty) &&
            arrayFn
        ) {
            out[key] = arrayFn(sourceProperty, targetProperty)

            continue
        }

        out[key] = targetProperty
    }

    return out
}

export const refElement = (
    obj?: ComponentPublicInstance<any> | HTMLElement,
): HTMLElement | undefined => {
    if (obj && '$el' in obj) {
        const el = obj.$el as HTMLElement
        if (el?.nodeType === Node.TEXT_NODE) {
            // Multi-root component, use the first element
            return el.nextElementSibling as HTMLElement
        }
        return el
    }
    return obj as HTMLElement
}
