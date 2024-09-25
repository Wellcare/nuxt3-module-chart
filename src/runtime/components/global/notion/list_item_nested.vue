<script setup lang="ts">
import type { PropType } from '#imports'
import type { BlockType, INotionBlock } from '../../../models'
import ArticleBodyNested from '../article/body/nested.vue'
import RichText from './rich_text.vue'

type TransformPartial = Partial<
    Record<
        BlockType,
        {
            component: 'ul' | 'ol'
            listStyles?: string[]
        }
    >
>

const { children, parentType } = defineProps({
    children: {
        type: Array as PropType<INotionBlock[]>,
        default: () => [],
    },
    parentType: {
        type: String as PropType<BlockType>,
        default: '',
    },
})

const transform: TransformPartial = {
    bulleted_list_item: {
        component: 'ul',
        listStyles: ['list-disc', 'list-[circle]', 'list-[square]'],
    },
    numbered_list_item: {
        component: 'ol',
        listStyles: [
            'list-decimal',
            'list-[lower-latin]',
            'list-[lower-roman]',
        ],
    },
}

const listStyle = ({ type, level }: { type: BlockType; level: number }) => {
    const styles = transform[type]?.listStyles || []
    let index = Math.min(level, styles.length) - 1
    if (type === parentType) {
        index += 1
    }

    return styles[index] || ''
}

const checkListType = (val: BlockType) => {
    return val === 'bulleted_list_item' || val === 'numbered_list_item'
}
</script>

<template>
    <component
        :is="transform[parentType]?.component"
        v-if="transform[parentType]?.component"
        :class="[`${listStyle({ type: parentType, level: 1 })} mt-4`]">
        <template v-for="child in children" :key="child.id">
            <template v-if="child.type && checkListType(child.type)">
                <li class="ml-5 mb-4">
                    <RichText :rich_text="child[child.type]?.rich_text" />

                    <component
                        :is="transform[child.type]?.component"
                        v-if="transform[child.type]?.component"
                        :class="[
                            `${listStyle({
                                type: child.type,
                                level: 2,
                            })} ml-6 mt-4`,
                        ]">
                        <template
                            v-for="child1 in child[child.type]?.children"
                            :key="child1.id">
                            <template
                                v-if="
                                    child1.type && checkListType(child1.type)
                                ">
                                <li class="mb-4">
                                    <RichText
                                        :rich_text="
                                            child1[child1.type]?.rich_text
                                        " />
                                </li>
                            </template>
                            <template v-else>
                                <ArticleBodyNested
                                    :blocks="[child1]"
                                    class="mt-4" />
                            </template>
                        </template>
                    </component>
                </li>
            </template>
            <template v-else>
                <div class="mb-4">
                    <ArticleBodyNested :blocks="[child]" />
                </div>
            </template>
        </template>
    </component>
</template>
