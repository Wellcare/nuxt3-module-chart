<script lang="ts" setup>
import { useError } from '#imports'
import type { PropType } from 'vue'
import type { MenuItem } from '../../models'

const { clearError } = useError()

const { code, message, guide, actions } = defineProps({
    code: {
        type: String,
        default: '404',
    },
    message: {
        type: String,
        default: "Something's missing",
    },
    guide: {
        type: String,
        default:
            "Sorry, we can't find that page. You'll find lots to explore on the home page.",
    },
    actions: {
        type: Array as PropType<MenuItem[]>,
        default: () => [{ label: 'Back to Homepage', route: '/' }],
    },
})

const handleError = (route: string) => {
    clearError({
        redirect: route,
    })
}
</script>

<template>
    <section class="bg-white dark:bg-gray-900 min-h-full">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h1
                    class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary">
                    {{ code }}
                </h1>
                <p
                    class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                    {{ message }}
                </p>
                <p
                    class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                    {{ guide }}
                </p>
                <ButtonGroup>
                    <Button
                        v-for="action in actions"
                        :key="action.route"
                        :label="action.label"
                        @click="handleError(action.route)" />
                </ButtonGroup>
            </div>
        </div>
    </section>
</template>
