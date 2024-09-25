<script lang="ts" setup>
import type { PropType } from '#imports'
import type {
    PricingTableBlockType,
    PricingTableModeType,
} from '../../../types/'
import type { IPricingTableItem } from '../../../models'

import TitlePanel from '../title-panel.vue'

defineProps({
    blocks: {
        type: Array as PropType<PricingTableBlockType[]>,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    items: {
        type: Array as PropType<IPricingTableItem[]>,
        default: () => [],
    },
    mode: {
        type: String as PropType<PricingTableModeType>,
        default: '',
    },
    buttonPassthrough: {
        type: Object,
        default: () => {},
    },
})

defineEmits(['on-click'])

const findItemWithLongestBenefits = (items: IPricingTableItem[]): string => {
    const maxBenefitLength = items.reduce(
        (max: number, item: IPricingTableItem) =>
            Math.max(max, (item.benefits || []).length),
        0,
    )

    switch (maxBenefitLength) {
        case 1:
            return 'min-h-[24px]'
        case 2:
            return 'min-h-[64px]'
        case 3:
            return 'min-h-[104px]'
        case 4:
            return 'min-h-[144px]'
        case 5:
            return 'min-h-[184px]'
        case 6:
            return 'min-h-[224px]'
        case 7:
            return 'min-h-[264px]'
        case 8:
            return 'min-h-[304px]'
        case 9:
            return 'min-h-[344px]'
        case 10:
            return 'min-h-[384px]'
        default:
            break
    }

    return ''
}
</script>

<template>
    <section>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <TitlePanel :blocks="blocks" :title="title" :sub-title="subTitle" />
            <div class="flex flex-wrap">
                <!-- Pricing Card -->
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    :class="[
                        `
                            relative
                            flex 
                            flex-col
                            mt-6
                            first:mt-0
                            sm:first:mt-6
                            xl:mt-0
                            xl:first:mt-0
                            p-6
                            xl:p-8
                            mx-auto
                            w-[90%]
                            md:max-w-[46%]
                            lg:max-w-[30%]
                            bg-white
                            dark:bg-slate-800
                            border
                            border-slate-300
                            dark:border-slate-600
                            shadow
                            rounded-lg
                            text-center
                            text-slate-900
                            dark:text-white
                            transition
                            ease-in-out
                            delay-100
                            duration-300
                            hover:cursor-pointer
                            `,
                        {
                            'mt-11 last:mt-8 lg:last:mt-0 sm:first:mt-11':
                                mode === 'highlight',
                            'lg:hover:scale-105': mode !== 'highlight',
                            'scale-105 ring-2 ring-primary':
                                mode === 'highlight' && item?.highlightName,
                        },
                    ]">
                    <div
                        v-if="mode === 'highlight' && item?.highlightName"
                        :class="`
                            bg-primary
                            rounded-lg
                            px-2
                            py-2
                            text-xs
                            text-white
                            font-semibold
                            absolute
                            -top-4
                            left-1/2
                            -translate-x-1/2`">
                        {{ item?.highlightName }}
                    </div>
                    <h4
                        class="pb-4 font-semibold border-b border-slate-300 dark:border-slate-700">
                        {{ item.name }}
                    </h4>
                    <slot name="description-top">
                        <p
                            v-if="item.descriptionTop"
                            class="font-light text-slate-500 sm:text-lg dark:text-slate-400 mt-5 mb-1">
                            {{ item?.descriptionTop }}
                        </p>
                    </slot>
                    <div
                        :class="[
                            'flex justify-center items-baseline',
                            {
                                'my-8':
                                    !item.descriptionTop &&
                                    !item.descriptionBottom,
                                'mb-8': item.descriptionTop,
                                'mt-8': item.descriptionBottom
                            },
                        ]">
                        <span class="mr-2 text-5xl font-semibold">
                            {{ item?.price }}
                        </span>
                        <span class="text-slate-500 dark:text-slate-400">
                            {{ item?.per }}
                        </span>
                    </div>
                    <slot name="description-bottom">
                        <p
                            v-if="item.descriptionBottom"
                            class="font-light text-slate-500 sm:text-lg dark:text-slate-400 mt-1 mb-5">
                            {{ item?.descriptionBottom }}
                        </p>
                    </slot>
                    <!-- List -->
                    <ul
                        role="list"
                        :class="[
                            'mb-8 space-y-4 text-left',
                            findItemWithLongestBenefits(items),
                        ]">
                        <li
                            v-for="(benefit, no) in item.benefits"
                            :key="no"
                            class="flex items-center space-x-3">
                            <!-- Icon -->
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                fill="rgb(var(--primary))"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span>{{ benefit }}</span>
                        </li>
                    </ul>
                    <Button
                        class="mt-auto"
                        :label="item?.actionName"
                        :pt="{ ...buttonPassthrough }"
                        :outlined="mode === 'highlight' && !item?.highlightName"
                        @click="$emit('on-click', item)" />
                </div>
            </div>
        </div>
    </section>
</template>
