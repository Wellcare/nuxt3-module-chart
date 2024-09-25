// import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export const vite = defineConfig({
    plugins: [
        // vue()
    ],
    css: {
        modules: {
            generateScopedName: '[hash:base64:5]',
            hashPrefix: ' ',
        },
    },
})
