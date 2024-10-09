import {
    addComponentsDir,
    addImportsDir,
    addPlugin,
    addTemplate,
    createResolver,
    defineNuxtModule,
    installModule,
    useLogger,
} from '@nuxt/kit'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { namespace, validate } from './runtime/configs'
import type { ModuleOptions } from './runtime/types'

// Use import() for Tailwind Config type
interface TailwindConfig {
    content: any
}

declare module '@nuxt/schema' {
    interface NuxtHooks {
        'tailwindcss:config': (config: Partial<TailwindConfig>) => void
        'i18n:registerModule': (register: any) => void
    }
}

export * from './runtime/models'
// export * from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: namespace,
        configKey: namespace,
    },
    defaults: {
        prefix: 'w',
    },
    async setup(options, nuxt) {
        const logger = useLogger(namespace)
        const log = (
            message: string,
            type: 'info' | 'success' | 'error' | 'warn' = 'info',
        ) => logger[type](`[${namespace}] ${message}`)
        const { resolve } = createResolver(import.meta.url)
        const runtimeDir = resolve('./runtime')

        nuxt.options.build.transpile.push('primevue')

        await installModule('@vueuse/nuxt')
        await installModule('@wellcare/nuxt3-module-data-layer')
        await installModule('@wellcare/muot-ui')
        await installModule('@pinia/nuxt')
        await installModule('dayjs-nuxt')
        await installModule('@primevue/nuxt-module')

        // Config validation
        if (nuxt.options.dev || nuxt.options._start || nuxt.options._generate) {
            validate({
                buildConfig: options,
                runtimeConfig: nuxt.options.runtimeConfig[namespace] as any,
                publicRuntimeConfig: nuxt.options.runtimeConfig.public[
                    namespace
                ] as any,
            })
        }

        // Tailwind configuration
        nuxt.hooks.hook(
            'tailwindcss:config',
            (tailwindConfig: Partial<TailwindConfig>) => {
                tailwindConfig.content = tailwindConfig.content ?? { files: [] }
                const contentPaths = [
                    resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'),
                    resolve(runtimeDir, 'config/**/*.{vue,mjs,ts}'),
                    join(
                        nuxt.options.srcDir,
                        'assets/presets/**/*.{js,vue,ts}',
                    ),
                ]

                if (Array.isArray(tailwindConfig.content)) {
                    tailwindConfig.content.push(...contentPaths)
                } else {
                    tailwindConfig.content.files.push(...contentPaths)
                }
            },
        )

        // Runtime setup
        nuxt.options.build.transpile.push(runtimeDir)
        log('Runtime directory transpiled', 'success')

        // Add plugins
        const addPlugins = () => {
            const pluginsDir = resolve('./runtime/plugins')
            if (existsSync(pluginsDir) && statSync(pluginsDir).isDirectory()) {
                readdirSync(pluginsDir)
                    .filter((file) => !file.endsWith('.d.ts'))
                    .forEach((file) => addPlugin(join(pluginsDir, file)))
            }
            log('Plugins added', 'success')
        }
        addPlugins()

        // Handle language files
        const setupLanguageFiles = () => {
            const langDir = resolve('./runtime/lang')
            if (existsSync(langDir) && statSync(langDir).isDirectory()) {
                nuxt.hook('i18n:registerModule', (register) => {
                    register({
                        // langDir path needs to be resolved
                        langDir: resolve('./runtime/lang'),
                        locales: [
                            {
                                code: 'en',
                                file: 'en.json',
                            },
                            {
                                code: 'vi',
                                file: 'vi.json',
                            },
                        ],
                    })
                })
                log('Module language files registered', 'success')
            }
        }
        setupLanguageFiles()

        // Add directories
        const addDirs = () => {
            addComponentsDir({
                global: true,
                prefix: options.prefix,
                path: resolve('./runtime/components/global'),
            })
            ;['composables', 'stores'].forEach((dir) => {
                addImportsDir(resolve(`./runtime/${dir}`))
                log(`${dir} added`, 'success')
            })
        }
        addDirs()

        // Type exports
        const templateClient = addTemplate({
            filename: `types/${namespace}.d.ts`,
            getContents: () => `
                import type * as types from '${resolve('./runtime/types')}'

                declare module '@nuxt/schema' {
                    interface NuxtConfig {
                        'nuxt3-module-chart'?: types.ModuleOptions
                    }
                }

                declare global {
                    export type ModuleOptions = types.ModuleOptions
                }`,
        })

        nuxt.hook('prepare:types', ({ references }) => {
            references.push({ path: templateClient.dst })
        })

        // Nitro config
        nuxt.hook('nitro:config', (nitroConfig) => {
            nitroConfig.publicAssets ||= []
            nitroConfig.publicAssets.push({
                dir: resolve('./runtime/public'),
                maxAge: 60 * 60 * 24 * 365, // 1 year
            })
            log('Nitro config updated', 'success')
        })

        log('Module setup complete', 'success')
    },
})
