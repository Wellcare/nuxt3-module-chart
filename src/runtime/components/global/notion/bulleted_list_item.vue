<script lang="ts" setup>
import { type PropType } from '#imports'
import type { IBulletedListItem } from '../../../models'
import NotionListItemNested from './list_item_nested.vue'
import RichText from './rich_text.vue'

const { bulleted_list_item } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    bulleted_list_item: {
        type: Array as PropType<IBulletedListItem[]>,
        required: true,
        default: () => [],
    },
})
</script>

<template>
    <!-- NEED REFACTOR -->
    <ul class="ml-4 list-disc">
        <li v-for="(item, index) in bulleted_list_item" :key="index">
            <RichText :rich_text="item.rich_text" />

            <NotionListItemNested
                :children="item?.children"
                parent-type="bulleted_list_item" />
        </li>
    </ul>
</template>
