<script setup lang="ts">
import { type PropType } from '#imports'
import type { INotionBlock } from '../../../../models'
import NotionBookmark from '../../notion/bookmark.vue'
import NotionBulletedListItem from '../../notion/bulleted_list_item.vue'
import NotionCallout from '../../notion/callout.vue'
import NotionCode from '../../notion/code.vue'
import NotionColumn from '../../notion/column.vue'
import NotionColumnList from '../../notion/column_list.vue'
import NotionDivider from '../../notion/divider.vue'
import NotionEmbed from '../../notion/embed.vue'
import NotionEquation from '../../notion/equation.vue'
import NotionFile from '../../notion/file.vue'
import NotionHeading1 from '../../notion/heading_1.vue'
import NotionHeading2 from '../../notion/heading_2.vue'
import NotionHeading3 from '../../notion/heading_3.vue'
import NotionImage from '../../notion/image.vue'
import NotionLinkPreview from '../../notion/link_preview.vue'
import NotionMention from '../../notion/mention.vue'
import NotionNumberedListItem from '../../notion/numbered_list_item.vue'
import NotionParagraph from '../../notion/paragraph.vue'
import NotionPdf from '../../notion/pdf.vue'
import NotionQuote from '../../notion/quote.vue'
import NotionSyncedBlock from '../../notion/synced_block.vue'
import NotionTable from '../../notion/table.vue'
import NotionTodo from '../../notion/to_do.vue'
import NotionToggle from '../../notion/toggle.vue'
import NotionVideo from '../../notion/video.vue'

const { block, isBlockEnd } = defineProps({
    block: {
        type: Object as PropType<INotionBlock>,
        required: true,
    },
    isBlockEnd: {
        type: Boolean,
        default: false,
    },
})

const component = {
    heading_1: NotionHeading1,
    heading_2: NotionHeading2,
    heading_3: NotionHeading3,
    bookmark: NotionBookmark,
    bulleted_list_item: NotionBulletedListItem,
    callout: NotionCallout,
    code: NotionCode,
    column_list: NotionColumnList,
    column: NotionColumn,
    divider: NotionDivider,
    embed: NotionEmbed,
    equation: NotionEquation,
    file: NotionFile,
    image: NotionImage,
    link_preview: NotionLinkPreview,
    mention: NotionMention,
    numbered_list_item: NotionNumberedListItem,
    paragraph: NotionParagraph,
    pdf: NotionPdf,
    quote: NotionQuote,
    synced_block: NotionSyncedBlock,
    table: NotionTable,
    to_do: NotionTodo,
    toggle: NotionToggle,
    video: NotionVideo,
}
</script>
<template>
    <component
        :is="component[block.type]"
        :image="block.image"
        :heading_1="block.heading_1"
        :heading_2="block.heading_2"
        :heading_3="block.heading_3"
        :breadcrumb="block.breadcrumb"
        :bulleted_list_item="block.bulleted_list_item"
        :callout="block.callout"
        :child_database="block.child_database"
        :child_page="block.child_page"
        :code="block.code"
        :column_list="block.column_list"
        :column="block.column"
        :divider="block.divider"
        :embed="block.embed"
        :equation="block.equation"
        :file="block.file"
        :link_preview="block.link_preview"
        :mention="block.mention"
        :numbered_list_item="block.numbered_list_item"
        :paragraph="block.paragraph"
        :pdf="block.pdf"
        :quote="block.quote"
        :synced_block="block.synced_block"
        :table="block.table"
        :to_do="block.to_do"
        :toggle="block.toggle"
        :video="block.video"
        :class="isBlockEnd ? 'mb-0' : 'mb-4'" />
</template>
