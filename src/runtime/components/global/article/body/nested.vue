<script setup lang="ts">
import { type PropType } from '#imports'
import type { INotionBlock } from '../../../../models'
import ArticleBodyChild from './child.vue'

defineProps({
    blocks: {
        type: Array as PropType<INotionBlock[]>,
        required: true,
    },
})

const checkIsBlockEnd = ({
    arr,
    index,
}: {
    arr: any[]
    index: number
}): boolean => {
    return arr.length - 1 === index
}
</script>

<template>
    <template v-if="Array.isArray(blocks) && blocks.length">
        <template v-for="(block, index) in blocks" :key="block.id">
            <ArticleBodyChild
                :block="block"
                :is-block-end="checkIsBlockEnd({ arr: blocks, index })" />

            <template v-if="block?.has_children">
                <template
                    v-for="(child1, index1) in block[block.type]?.children"
                    :key="child1.id">
                    <ArticleBodyChild
                        v-if="!child1.isIncluded"
                        :block="child1"
                        :is-block-end="
                            checkIsBlockEnd({
                                arr: block[block.type]?.children,
                                index: index1,
                            })
                        "
                        class="ml-2" />

                    <template v-if="child1?.has_children">
                        <template
                            v-for="(child2, index2) in child1[child1.type]
                                ?.children"
                            :key="child2.id">
                            <ArticleBodyChild
                                v-if="!child2.isIncluded"
                                :block="child2"
                                :is-block-end="
                                    checkIsBlockEnd({
                                        arr: child1[child1.type]?.children,
                                        index: index2,
                                    })
                                "
                                class="ml-4" />

                            <template v-if="child2?.has_children">
                                <template
                                    v-for="(child3, index3) in child2[
                                        child2.type
                                    ]?.children"
                                    :key="child3.id">
                                    <ArticleBodyChild
                                        v-if="!child3.isIncluded"
                                        :block="child3"
                                        :is-block-end="
                                            checkIsBlockEnd({
                                                arr: child2[child2.type]
                                                    ?.children,
                                                index: index3,
                                            })
                                        "
                                        class="ml-6" />
                                </template>
                            </template>
                        </template>
                    </template>
                </template>
            </template>
        </template>
    </template>
</template>
