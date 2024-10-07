<script setup lang="ts">
import type { PropType } from '#imports'
import { computed, onMounted } from '#imports'
import { vega } from '../../../../configs'

const props = defineProps({
    componentId: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    type: {
        type: String as PropType<'line' | 'bar' | 'gauge'>,
        default: '',
    },
    isNullData: {
        type: Boolean,
        default: false,
    },
})

const dataVega = computed(() => (props.isNullData ? {} : props.data))

const render = async () => {
    const vegaScripts = [
        'https://cdn.jsdelivr.net/npm/vega@5',
        'https://cdn.jsdelivr.net/npm/vega-lite@5',
        'https://cdn.jsdelivr.net/npm/vega-embed@6',
    ]

    for (const script of vegaScripts) {
        await loadScript(script)
    }

    vegaEmbed(
        `#${props.componentId}`,
        { ...dataVega.value, config: vega.config },
        { actions: false, renderer: 'svg' },
    )
}

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () =>
            reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
    })
}

onMounted(() => {
    render()
})
</script>

<template>
    <div :id="componentId" />
</template>

<style scoped></style>
