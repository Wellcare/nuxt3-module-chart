<script setup lang="ts">
import { useDisplay, useI18n } from '#imports'
import DynamicDialog from 'primevue/dynamicdialog'
import { useDialog } from 'primevue/usedialog'
import Bmi from './Bmi.vue'
import Percentile from './Percentile.vue'

interface Components {
    percentile: typeof Percentile
    bmi: typeof Bmi
}

interface OpenDialogOptions {
    label: keyof Components
}

const i18n = useI18n()
const dialog = useDialog()
const { display } = useDisplay()

const components: Components = {
    percentile: Percentile,
    bmi: Bmi,
}

const open = (label: OpenDialogOptions['label']) => {
    dialog.open(components[label], {
        props: {
            header: i18n.t(`form:header:${label}`),
            draggable: false,
            position: display?.breakpoint?.isMobile ? 'bottom' : 'center',
            style: {
                width: '30rem',
            },
            modal: true,
        },
    })
}

defineExpose({
    open,
})
</script>

<template>
    <div><slot /><DynamicDialog /></div>
</template>
