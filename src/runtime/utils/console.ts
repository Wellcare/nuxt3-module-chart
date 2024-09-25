/* eslint-disable no-console */

// Utilities
import { warn } from 'vue'

export const consoleWarn = (message: string): void => {
    warn(`Muot-UI: ${message}`)
}

export const consoleError = (message: string): void => {
    warn(`Muot-UI error: ${message}`)
}

export const deprecate = (original: string, replacement: string | string[]) => {
    replacement = Array.isArray(replacement)
        ? replacement
              .slice(0, -1)
              .map((s) => `'${s}'`)
              .join(', ') + ` or '${replacement.at(-1)}'`
        : `'${replacement}'`
    warn(
        `[Muot-UI UPGRADE] '${original}' is deprecated, use ${replacement} instead.`,
    )
}
// export const breaking(original: string, replacement: string) {
//     // warn(`[Vuetify BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`)
// }
// export function removed(original: string) {
//     // warn(`[Vuetify REMOVED] '${original}' has been removed. You can safely omit it.`)
// }
