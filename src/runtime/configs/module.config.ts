import { createConsola } from 'consola'
import type { IRuntimeConfig, ModuleOptions } from '../types'
import { namespace } from './'

export const validate = ({
    buildConfig,
    // runtimeConfig,
}: {
    buildConfig: ModuleOptions
    runtimeConfig: IRuntimeConfig
}) => {
    const logger = createConsola().withTag(namespace)

    if (!buildConfig?.level) {
        logger.box({
            title: '[ERROR] MISSING BUILD CONFIG',
            message: `[${namespace}] missing level`,
        })
        process.exit(1)
    }

    if (!buildConfig?.prefix) {
        logger.box({
            title: '[ERROR] MISSING BUILD CONFIG',
            message: `[${namespace}] missing prefix`,
        })
        process.exit(1)
    }

    // if (!runtimeConfig?.consola) {
    //     logger.box({
    //         title: '[ERROR] MISSING BUILD CONFIG',
    //         message: `[${namespace}] missing key`,
    //     })
    //     process.exit(1)
    // }
}
