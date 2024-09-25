import type { ModuleOptions } from '@nuxtjs/tailwindcss'

export const tailwindcss: Partial<ModuleOptions> = {
    config: {
        darkMode: 'class',
        plugins: [require('tailwindcss-primeui')],
        content: ['../assets/presets/**/*.js', '*'],
        theme: {
            extend: {
                animation: {
                    border: 'border 4s ease infinite',
                },
                keyframes: {
                    border: {
                        '0%, 100%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                    },
                },

                colors: {
                    // Typography
                    default: '#000000',

                    /* Primary */
                    primary: 'rgb(var(--primary))',

                    /* Secondary */
                    secondary: 'rgb(var(--secondary))',

                    // bg
                    'surface-0': 'rgb(var(--surface-0))',
                    'surface-50': 'rgb(var(--surface-50))',
                    'surface-100': 'rgb(var(--surface-100))',
                    'surface-200': 'rgb(var(--surface-200))',
                    'surface-300': 'rgb(var(--surface-300))',
                    'surface-400': 'rgb(var(--surface-400))',
                    'surface-500': 'rgb(var(--surface-500))',
                    'surface-600': 'rgb(var(--surface-600))',
                    'surface-700': 'rgb(var(--surface-700))',
                    'surface-800': 'rgb(var(--surface-800))',
                    'surface-900': 'rgb(var(--surface-900))',
                    'surface-950': 'rgb(var(--surface-950))',
                },
                backgroundImage: {
                    'gradient-top-black-7/10':
                        '-webkit-linear-gradient(top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
                },
                height: {
                    100: '25rem',
                    125: '31.25rem',
                    150: '37.5rem',
                    175: '43.75rem',
                    200: '50rem',
                    225: '56.25rem',
                    250: '62.5rem',
                    275: '68.75rem',
                    300: '75rem',
                },
                maxHeight: {
                    100: '25rem',
                    125: '31.25rem',
                    150: '37.5rem',
                    175: '43.75rem',
                    200: '50rem',
                    225: '56.25rem',
                    250: '62.5rem',
                    275: '68.75rem',
                    300: '75rem',
                },
            },
        },
    },
}
