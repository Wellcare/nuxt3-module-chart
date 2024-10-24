<script setup lang="ts">
import { useDisplay, useI18n } from '#imports'
import DynamicDialog from 'primevue/dynamicdialog'
import { useDialog } from 'primevue/usedialog'
import Bmi from './Bmi.vue'
import HeadCircumference from './HeadCircumference.vue'
import Weight from './Weight.vue'
import Height from './Height.vue'

interface Components {
    headCircumference: typeof HeadCircumference
    bmi: typeof Bmi
    weight: typeof Weight
    height: typeof Height
}

interface OpenDialogOptions {
    label: keyof Components
}

const i18n = useI18n()
const dialog = useDialog()
const { display } = useDisplay()

const components: Components = {
    headCircumference: HeadCircumference,
    bmi: Bmi,
    height: Height,
    weight: Weight,
}

const open = (label: OpenDialogOptions['label']) => {
    dialog.open(components[label], {
        props: {
            header: `${i18n.t(`form:header:${label}`).toLocaleUpperCase()}`,
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
