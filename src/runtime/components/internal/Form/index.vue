<script setup lang="ts">
import {
    useDisplay,
    useI18n,
    ref,
    markRaw,
    defineAsyncComponent,
    computed,
} from '#imports'
import Dialog from 'primevue/dialog'
import type { Observation } from '../../../models'

interface Props {
    userId: string
    isLoading: boolean
    defaultData?: any
}

defineProps<Props>()
const emit = defineEmits<{
    'on:submit': [value: Observation[]]
}>()

const i18n = useI18n()
const { display } = useDisplay()

// Dialog state management
const visible = ref(false)
const currentComponent = ref<any>(null)
const dialogHeader = ref('')

// Component registry
const components = {
    headCircumference: defineAsyncComponent(
        () => import('./HeadCircumference.vue'),
    ),
    bmi: defineAsyncComponent(() => import('./Bmi.vue')),
    height: defineAsyncComponent(() => import('./Height.vue')),
    weight: defineAsyncComponent(() => import('./Weight.vue')),
}

// Component instance references
const componentRefs = ref<Record<string, any>>({})

const isMobile = computed(() => display?.breakpoint?.isMobile)

const closeDialog = () => {
    visible.value = false
}

const setComponentRef = (key: string, instance: any) => {
    if (instance) {
        componentRefs.value[key] = instance
    }
}

const getComponentRef = (key: Observation['key']) => {
    return componentRefs.value[key as any]
}

const handleSubmit = (values: Observation[]) => {
    emit('on:submit', values)
}

const open = (key: Observation['key']) => {
    if (!key || !components[key as keyof typeof components]) {
        console.error(`Component for key ${key} not found`)
        return
    }

    // Set current component and dialog properties
    currentComponent.value = markRaw(components[key as keyof typeof components])
    dialogHeader.value = i18n
        .t(`body-index.form.header.${key.toLowerCase()}`)
        .toUpperCase()
    visible.value = true
}

const handleHide = () => {
    visible.value = false
    currentComponent.value = null
    dialogHeader.value = ''
}

// Compute dialog styles based on display
const dialogStyle = computed(() => ({
    width: isMobile.value ? '100vw' : '30rem',
    margin: isMobile.value ? '0' : undefined,
    position: isMobile.value ? 'fixed' : undefined,
    bottom: isMobile.value ? '0' : undefined,
    left: isMobile.value ? '0' : undefined,
    'border-bottom-left-radius': isMobile.value ? '0' : undefined,
    'border-bottom-right-radius': isMobile.value ? '0' : undefined,
}))

defineExpose({
    open,
    closeDialog,
    getComponentRef,
})
</script>

<template>
    <div>
        <slot />

        <Dialog
            v-model:visible="visible"
            :header="dialogHeader"
            :modal="true"
            :closable="true"
            :position="isMobile ? 'bottom' : 'center'"
            :style="dialogStyle"
            @hide="handleHide">
            <component
                :is="currentComponent"
                v-if="currentComponent && visible"
                :ref="(el: any) => setComponentRef(dialogHeader, el)"
                :user-id="userId"
                :is-loading="isLoading"
                :default-data="defaultData"
                @on:submit="($data: Observation[]) => handleSubmit($data)" />
        </Dialog>
    </div>
</template>

<style scoped>
.p-dialog-mask {
    align-items: flex-end;
}

/* Mobile specific styles */
@media screen and (max-width: 768px) {
    :deep(.p-dialog) {
        margin: 0;
        max-height: 90vh;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
}
</style>
