import * as path from 'path'

export const primevue: any = {
    autoImport: true,
    components: {
        include: '*',
    },
    options: {
        unstyled: true,
        cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
        },
    },
    importPT: {
        as: 'Primary',
        from: path.resolve(__dirname, '../assets/presets/primary/index.js'),
    },
}
