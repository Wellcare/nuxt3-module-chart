<script setup lang="ts">
import type { PropType } from '#imports'
import { computed, onMounted, ref, watch } from '#imports'
import { vega } from '../../../../configs'

const props = defineProps({
    componentId: {
        type: String,
        required: true,
    },
    schema: {
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

const chartRef = ref(null)
const isVisible = ref(false)
const dataVega = computed(() => (props.isNullData ? {} : props.schema))

const render = async () => {
    const vegaScripts = [
        'https://cdn.jsdelivr.net/npm/vega@5',
        'https://cdn.jsdelivr.net/npm/vega-lite@5',
        'https://cdn.jsdelivr.net/npm/vega-embed@6',
    ]

    for (const script of vegaScripts) {
        await loadScript(script)
    }

    // Reset animation state
    isVisible.value = false

    // Render chart
    await vegaEmbed(
        `#${props.componentId}`,
        { ...dataVega.value, config: vega.config },
        { actions: false, renderer: 'svg' },
    )

    // Trigger animation after a small delay
    setTimeout(() => {
        isVisible.value = true
    }, 50)
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

// Watch for changes in props that should trigger re-render
watch([() => props.schema, () => props.isNullData], () => {
    render()
})

onMounted(() => {
    render()
})
</script>

<template>
    <div
        :id="componentId"
        ref="chartRef"
        :class="[
            'transition-all duration-500 ease-in-out',
            isVisible
                ? 'translate-y-0 transform opacity-100'
                : 'translate-y-4 transform opacity-0',
        ]" />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
