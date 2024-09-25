<script setup lang="ts">
import type { PropType } from 'vue'
import type { IQuote } from '../../../models'
import RichText from './rich_text.vue'

const { quote } = defineProps({
    quote: {
        type: Object as PropType<IQuote>,
        required: true,
    },
})
</script>
<template>
    <div
        class="bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-primary rounded-lg">
        <q>
            <RichText :rich_text="quote.rich_text" />
        </q>
    </div>
</template>
