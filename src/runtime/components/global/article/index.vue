<script lang="ts" setup>
import type { PropType } from '#imports'
import type { INotionBlock, NotionPage } from '../../../models'

const props = defineProps({
    blocks: {
        type: Array as PropType<Array<INotionBlock>>,
        required: true,
    },
    page: {
        type: Object as PropType<NotionPage>,
        required: true,
    },
    header: {
        type: Boolean,
        default: false,
    },
    body: {
        type: Boolean,
        default: false,
    },
    footer: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
    <main class="leading-loose">
        <slot name="header">
            <WArticleHeader
                v-if="header"
                :page="props.page"
                :loading="loading" />
        </slot>
        <slot name="body">
            <div>
                <template v-if="props.blocks?.length">
                    <WArticleBody
                        v-if="body"
                        :blocks="props.blocks"
                        :loading="loading" />
                </template>
                <template v-else>
                    <slot name="body-no-content">
                        <div class="h-175 flex items-center justify-center">
                            <p class="flex items-center justify-center gap-2">
                                <i class="pi pi-info-circle" />
                                <span>
                                    {{ $t('no content') }}
                                </span>
                            </p>
                        </div>
                    </slot>
                </template>
            </div>
        </slot>
        <slot name="footer">
            <WArticleFooter
                v-if="footer"
                :page="props.page"
                :loading="loading" />
        </slot>
    </main>
</template>
