<script setup lang="ts">
import type { PropType } from '#imports'
import type { Color, IRichText } from '../../../models'
import NotionEquation from '../notion/equation.vue'
import NotionMention from '../notion/mention.vue'

const { rich_text } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    rich_text: {
        type: Array as PropType<IRichText[] | undefined>,
        required: true,
    },
})

const getColorClasses = (color?: Color): string => {
    const colorMap: Record<string, string> = {
        blue: 'text-blue-500',
        blue_background: 'bg-blue-500 text-white',
        brown: 'text-brown-500',
        brown_background: 'bg-brown-500 text-white',
        default: '', // Tailwind doesn't require a class for default text color
        gray: 'text-gray-500',
        gray_background: 'bg-gray-500 text-white',
        green: 'text-green-500',
        green_background: 'bg-green-500 text-white',
        orange: 'text-orange-500',
        orange_background: 'bg-orange-500 text-white',
        pink: 'text-pink-500',
        pink_background: 'bg-pink-500 text-white',
        purple: 'text-purple-500',
        purple_background: 'bg-purple-500 text-white',
        red: 'text-red-500',
        red_background: 'bg-red-500 text-white',
        yellow: 'text-yellow-500',
        yellow_background: 'bg-yellow-500 text-white',
    }

    return color ? colorMap[color] || '' : ''
}

const getTypeRichText = (
    item: IRichText,
): {
    component: string | any
    classes?: string | Record<string, boolean>
} => {
    const type: 'link' | IRichText['type'] | any = item.href
        ? 'link'
        : item.type
    const annotation = item?.annotations
    const classes = {
        text: {
            component: 'span',
            classes: {
                'font-semibold': annotation?.bold,
                italic: annotation?.italic,
                'line-through': annotation?.strikethrough,
                underline: annotation?.underline,
                'text-white bg-primary bg-opacity-10 p-1 font-mono rounded-lg font-thin':
                    annotation?.code,
                [getColorClasses(annotation?.color)]:
                    annotation?.color !== 'default' &&
                    annotation?.color !== undefined,
            },
        },
        link: {
            component: 'a',
            classes:
                'no-underline cursor-pointer text-primary hover:underline hover:opacity-75',
        },
        mention: {
            component: NotionMention,
            classes: 'px-2',
        },
        equation: {
            component: NotionEquation,
        },
    }

    return classes[type]
}
</script>

<template>
    <component
        :is="getTypeRichText(item)?.component"
        v-for="(item, index) in rich_text"
        :key="index"
        :equation="item.equation"
        :mention="item.mention"
        :class="getTypeRichText(item)?.classes"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer nofollow">
        {{ item.plain_text }}
    </component>
</template>
