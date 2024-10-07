import type { ViteConfig } from '@nuxt/schema'

export const vite: Partial<ViteConfig> = {
    define: {
        'window.global': {},
    },
    optimizeDeps: {
        exclude: ['primevue'],
    },
}
