<script setup lang="ts">
import { computed, onUnmounted, ref } from '#imports'

const { position, hiddenArrow, message, delay, bgColor, border } = defineProps({
    position: {
        type: String,
        default: 'bottom',
    },
    hiddenArrow: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
        default: 'This is a tooltip',
    },
    delay: {
        type: Number,
        default: 200,
    },
    styles: {
        type: String,
        default: '',
    },
    bgColor: {
        type: String,
        default: 'bg-white',
    },
    border: {
        type: String,
        default: 'border-gray-300',
    },
})

const showTooltip = ref<boolean>(false)

const tooltipClasses = computed(() => {
    const classes = {
        top: {
            body: 'bottom-full -translate-x-1/2 mb-3 left-1/2',
            arrow: 'absolute -bottom-1.5 left-1/2 z-20 h-3 w-3 border-b border-r -translate-x-1/2 rotate-45  bg-white',
        },
        left: {
            body: 'right-full -translate-y-1/2 mr-3 top-1/2',
            arrow: 'absolute -right-1.5 top-1/2 z-20 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-white border-t border-r',
        },
        right: {
            body: 'left-full -translate-y-1/2 ml-3 top-1/2',
            arrow: 'absolute -left-1.5 top-1/2 z-20 h-3 w-3 border-b border-l -translate-y-1/2 rotate-45  bg-white',
        },
        bottom: {
            body: 'top-full -translate-x-1/2 mt-3 left-1/2',
            arrow: 'absolute -top-1.5 left-1/2 z-20 h-3 w-3  border-t border-l rounded-sm -translate-x-1/2 rotate-45 bg-white',
        },
    }

    return classes[position] || classes['bottom']
})

// Hide tooltip with delay
let hideTimeout: ReturnType<typeof setTimeout> | null = null
const hideTooltipWithDelay = () => {
    hideTimeout = setTimeout(() => {
        showTooltip.value = false
    }, delay)
}

// Cancel hiding tooltip when mouse re-enters
const cancelHide = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }
}

// Hide tooltip when mouse leaves with delay
const hideTooltip = () => {
    hideTooltipWithDelay()
}

onUnmounted(() => {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
    }
})
</script>

<template>
    <div class="relative inline-block cursor-pointer">
        <div
            @mouseover="showTooltip = true"
            @mouseleave="hideTooltip"
            @mouseenter="cancelHide">
            <slot />
        </div>
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95">
            <template v-if="showTooltip">
                <div
                    :class="[
                        'absolute z-10 whitespace-nowrap',
                        tooltipClasses.body,
                    ]"
                    role="tooltip"
                    @mouseenter="cancelHide"
                    @mouseleave="hideTooltipWithDelay">
                    <slot name="body">
                        <span
                            v-if="!hiddenArrow"
                            :class="[tooltipClasses.arrow, bgColor, border]" />
                        <div
                            :class="`rounded-lg border px-4 py-2 text-xs font-medium text-gray-800 shadow-[0px-12px-30px-4px-rgba(16,24,40,0.08)] transition-opacity duration-300 ${styles} ${bgColor} ${border}`">
                            {{ message }}
                        </div>
                    </slot>
                </div>
            </template>
        </transition>
    </div>
</template>

<style scoped></style>
