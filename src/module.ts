/* eslint-disable @typescript-eslint/no-unsafe-function-type */
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

interface TailwindConfig {
    content: any
}

declare module '@nuxt/schema' {
    interface NuxtHooks {
        'tailwindcss:config': (config: Partial<TailwindConfig>) => void
    }
}

export interface ModuleOptions {
    // Options passed directly
    prefix?: string
}

interface ModuleConfigs {
    [key: string]: any
}

const getModuleConfigs = (resolve: Function): ModuleConfigs => ({
    '@vueuse/nuxt': {},
    '@wellcare/nuxt3-module-data-layer': {},
    '@wellcare/muot-ui': {},
    '@pinia/nuxt': {},
    'dayjs-nuxt': {},
    '@primevue/nuxt-module': {},
    '@nuxtjs/i18n': {
        langDir: resolve('./runtime/lang'),
        locales: [
            {
                code: 'en',
                file: resolve('./runtime/lang/en.json'),
            },
            {
                code: 'vi',
                file: resolve('./runtime/lang/vi.json'),
            },
        ],
    },
})

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
        const { resolve } = createResolver(import.meta.url)
        const runtimeDir = resolve('./runtime')

        nuxt.options.build.transpile.push(runtimeDir)

        const moduleConfigs = getModuleConfigs(resolve)

        const installModules = async () => {
            try {
                await Promise.all(
                    Object.entries(moduleConfigs).map(
                        async ([moduleName, config]) => {
                            await installModule(moduleName, config)
                        },
                    ),
                )
                logger.success(
                    `[${namespace}] All modules installed successfully`,
                )
            } catch (error) {
                logger.error(
                    `[${namespace}] Failed to install modules: ${error}`,
                )
                throw error
            }
        }

        if (nuxt.options.dev || nuxt.options._start || nuxt.options._generate) {
            validate({
                buildConfig: options,
                runtimeConfig: nuxt.options.runtimeConfig[namespace] as any,
                publicRuntimeConfig: nuxt.options.runtimeConfig.public[
                    namespace
                ] as any,
            })
        }

        const setupPlugins = () => {
            const pluginsDir = resolve('./runtime/plugins')
            if (existsSync(pluginsDir) && statSync(pluginsDir).isDirectory()) {
                const plugins = readdirSync(pluginsDir).filter(
                    (file) => !file.endsWith('.d.ts'),
                )
                plugins.forEach((file) => addPlugin(join(pluginsDir, file)))
                logger.success(`[${namespace}] Added ${plugins.length} plugins`)
            }
        }

        const setupDirs = () => {
            addComponentsDir({
                global: true,
                prefix: options.prefix,
                path: resolve('./runtime/components/global'),
            })

            const importDirs = ['composables', 'stores']
            importDirs.forEach((dir) => {
                addImportsDir(resolve(`./runtime/${dir}`))
            })
            logger.success(
                `[${namespace}] Added ${importDirs.join(', ')} directories`,
            )
        }

        const setupTypes = () => {
            const templateClient = addTemplate({
                filename: `types/${namespace}.d.ts`,
                getContents: () => `
                    import type * as types from '${resolve('./runtime/types')}'

                    declare module '@nuxt/schema' {
                        interface NuxtConfig {
                            nuxt3ModuleChart?: types.ModuleOptions
                        }
                    }

                    declare global {
                        export type ModuleOptions = types.ModuleOptions
                    }`,
            })

            nuxt.hook('prepare:types', ({ references }) => {
                references.push({ path: templateClient.dst })
            })
        }

        const setupTailwind = () => {
            nuxt.hooks.hook(
                'tailwindcss:config',
                (tailwindConfig: Partial<TailwindConfig>) => {
                    tailwindConfig.content = tailwindConfig.content ?? {
                        files: [],
                    }
                    const contentPaths = [
                        resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'),
                        resolve(runtimeDir, 'pages/**/*.{vue,mjs,ts}'),
                    ]

                    if (Array.isArray(tailwindConfig.content)) {
                        tailwindConfig.content.push(...contentPaths)
                    } else {
                        tailwindConfig.content.files.push(...contentPaths)
                    }
                },
            )
        }

        try {
            await installModules()
            setupPlugins()
            setupDirs()
            setupTypes()
            setupTailwind()
        } catch (error) {
            logger.error(`[${namespace}] Module setup failed: ${error}`)
            throw error
        }
    },
})
