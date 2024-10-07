import path from 'node:path'

export const primevue: any = {
    options: {
        unstyled: true,
    },
    autoImport: true,
    directives: {
        include: ['Ripple', 'Tooltip'],
    },
    importPT: { from: path.resolve(__dirname, '../assets/presets/aura/') },
}
