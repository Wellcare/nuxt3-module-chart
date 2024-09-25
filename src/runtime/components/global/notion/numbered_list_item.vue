<script lang="ts" setup>
import { type PropType } from '#imports'
import type { INumberedListItem } from '../../../models'
import NotionListItemNested from './list_item_nested.vue'
import RichText from './rich_text.vue'

const { numbered_list_item } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    numbered_list_item: {
        type: Array as PropType<INumberedListItem[]>,
        required: true,
    },
})
</script>

<template>
    <ol class="ml-6 list-decimal">
        <li v-for="(item, index) in numbered_list_item" :key="index">
            <RichText :rich_text="item.rich_text" />

            <NotionListItemNested
                :children="item?.children"
                parent-type="numbered_list_item" />
        </li>
    </ol>
</template>
