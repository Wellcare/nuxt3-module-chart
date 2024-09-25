<script setup lang="ts">
import type { PropType } from '#imports'
import type { IToDo } from '../../../models'
import RichText from './rich_text.vue'

const { to_do } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    to_do: {
        type: Object as PropType<IToDo>,
        required: true,
    },
})
</script>
<template>
    <div class="flex items-center">
        <Checkbox
            :input-id="to_do?.rich_text[0].plain_text"
            :binary="to_do.checked" />
        <label :for="to_do?.rich_text[0].plain_text" class="ml-2">
            <RichText :rich_text="to_do.rich_text" />
        </label>
    </div>
</template>
