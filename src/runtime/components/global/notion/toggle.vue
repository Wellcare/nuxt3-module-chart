<script setup lang="ts">
import { type PropType } from '#imports'
import type { IHeading, IParagraph, IToggle } from '../../../models'
import ArticleBodyNested from '../article/body/nested.vue'
import RichText from './rich_text.vue'

const { toggle } = defineProps({
    toggle: {
        type: Object as PropType<IToggle | IParagraph | IHeading>,
        required: true,
    },
})
</script>
<template>
    <Accordion>
        <AccordionTab>
            <template #header>
                <slot name="header">
                    <RichText :rich_text="toggle?.rich_text" />
                </slot>
            </template>
            <ArticleBodyNested :blocks="toggle?.children" />
        </AccordionTab>
    </Accordion>
</template>
