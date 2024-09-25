import {
    addComponentsDir,
    addImportsDir,
    addPlugin,
    addServerHandler,
    createResolver,
    defineNuxtModule,
    useLogger,
} from '@nuxt/kit'
import fs from 'fs'
import path from 'path'

import { namespace, validate } from './runtime/configs'
import type { ModuleOptions } from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: namespace,
        configKey: namespace,
    },
    defaults: {
        prefix: 'w',
        level: 1,
    },
    async setup(options, nuxt) {
        const logger = useLogger(namespace)
        // Create resolver to resolve relative paths
        const { resolve } = createResolver(import.meta.url)
        const runtimeDir = resolve('./runtime')
        nuxt.options.build.transpile.push(runtimeDir)

        validate({
            buildConfig: options,
            runtimeConfig: nuxt.options.runtimeConfig[namespace] as any,
        })

        // Add plugins
        const pluginsDir = resolve('./runtime/plugins')
        if (
            fs.existsSync(pluginsDir) &&
            fs.statSync(pluginsDir).isDirectory()
        ) {
            const pluginFiles = fs.readdirSync(pluginsDir)
            pluginFiles
                .filter((pluginFile) => !pluginFile.match('.d.ts'))
                .forEach((pluginFile) => {
                    const pluginPath = path.join(pluginsDir, pluginFile)
                    addPlugin(pluginPath)
                    logger.info(`Plugin added plugins/${pluginFile}`)
                })
        }

        // Add Middleware
        const middlewareDir = resolve('./runtime/middleware')
        if (
            fs.existsSync(middlewareDir) &&
            fs.statSync(middlewareDir).isDirectory()
        ) {
            const middlewareFiles = fs.readdirSync(middlewareDir)
            middlewareFiles.forEach((middlewareFile) => {
                const middlewarePath = path.join(middlewareDir, middlewareFile)
                addServerHandler({
                    middleware: true,
                    handler: middlewarePath,
                })
                logger.info(`Middleware added middleware/${middlewareFile}`)
            })
        }

        // Merge language files from module with app
        const langDir = resolve('./runtime/lang')
        const appLangDir = resolve(nuxt.options.srcDir, 'lang')

        // Check if the app's lang folder exists, create it if not
        if (
            !fs.existsSync(appLangDir) ||
            !fs.statSync(appLangDir).isDirectory()
        ) {
            fs.mkdirSync(appLangDir)
            logger.info(`[${namespace}] Created lang folder in the app`)
        }

        // Check if the lang folder in the module exists
        if (fs.existsSync(langDir) && fs.statSync(langDir).isDirectory()) {
            const langFiles = fs.readdirSync(langDir)

            // Check if the app's lang folder is empty, create and push 2 files if so
            if (langFiles.length === 0) {
                // Push default language files into the app's lang folder
                fs.copyFileSync(
                    resolve(langDir, 'en.json'),
                    resolve(appLangDir, 'en.json'),
                )
                fs.copyFileSync(
                    resolve(langDir, 'vi.json'),
                    resolve(appLangDir, 'vi.json'),
                )

                logger.info(
                    `[${namespace}] Pushed default language files into the app's lang folder`,
                )
            } else {
                // Iterate through the language files in the module and merge into the app
                langFiles.forEach((langFile) => {
                    const langPath = path.join(langDir, langFile)
                    const appLangPath = path.join(appLangDir, langFile)

                    // Read the content of the language files
                    const moduleLangContent = require(langPath)
                    const appLangContent = fs.existsSync(appLangPath)
                        ? require(appLangPath)
                        : {}

                    // Merge the content of the module language file into the app language file
                    const mergedLangContent = { ...appLangContent }

                    // Add new keys from the module language file to the merged content
                    Object.keys(moduleLangContent).forEach((key) => {
                        if (!(key in mergedLangContent)) {
                            mergedLangContent[key] = moduleLangContent[key]
                        }
                    })

                    // Save the merged content back to the app's lang folder
                    fs.writeFileSync(
                        appLangPath,
                        JSON.stringify(mergedLangContent, null, 2),
                    )

                    logger.info(
                        `[${namespace}]Module merged into file "${langFile}" in the app's lang folder`,
                    )
                })
            }
        }

        // Add components
        addComponentsDir({
            global: true,
            prefix: options.prefix,
            path: resolve('./runtime/components/global'),
        })

        // Add composables
        addImportsDir(resolve('./runtime/composables'))
    },
}) as any
