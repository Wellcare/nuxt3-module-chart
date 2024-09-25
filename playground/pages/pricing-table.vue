<script lang="ts" setup>
import { ref } from '#imports'

const layouts = [
    'Default pricing cards',
    'Tabs selector pricing cards',
    'Horizontal pricing card',
    'Feature list description with pricing card',
    'Comparison table',
    'Highlighted pricing plan',
    'Pricing plan with toggle switch',
]

const blocks = ['title', 'sub-title']

const selectedLayout = ref(layouts[0])
const selectedBlocks = ref(blocks)

const items = [
    {
        name: 'Beginner',
        price: 'Free',
        per: 'forever',
        benefits: ['Use your superpowers', 'Key blocks collection'],
    },
    {
        name: 'Pro',
        price: '$100',
        per: 'per month',
        benefits: [
            'Entire collection of blocks',
            'Custom domain',
            'Google Analytics',
            'Favicon',
            'Custom fonts',
        ],
    },
    {
        name: 'Enterprise',
        price: '$2000',
        per: 'per year',
        benefits: [
            'All superpowers',
            'Source code export',
            'White label',
            'Premium support',
        ],
    },
]

const handleClick = (item: any) => {
    console.log('🚀 ~ handleClick ~ item:', item)
}
</script>

<template>
    <div class="mt-16">
        <div class="mb-4 gap-2 sm:grid sm:grid-cols-2">
            <div class="sm:mt-6">
                <div
                    class="mb-2 text-xl font-medium text-black dark:text-white">
                    Layout
                </div>
                <Dropdown
                    v-model="selectedLayout"
                    :options="layouts"
                    placeholder="Select a layout"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <Panel header="Option">
                <MultiSelect
                    v-model="selectedBlocks"
                    display="chip"
                    :options="blocks"
                    placeholder="Select blocks"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </Panel>
        </div>

        <WPricingTable
            :layout="selectedLayout"
            :blocks="selectedBlocks"
            title="Our Plans"
            sub-title="Your website will look brilliant as well as will be functional"
            :items="items"
            @on-click="handleClick" />
    </div>
</template>
