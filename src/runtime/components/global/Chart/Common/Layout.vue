<template>
    <div class="flex gap-4 p-4">
        <div class="w-3/4">
            <div class="flex h-full flex-col">
                <Tabs :value="activeTabIndex" class="flex flex-grow flex-col">
                    <TabList class="rounded-t-lg">
                        <Tab
                            v-for="tab in tabs"
                            :key="tab.value"
                            :value="tab.value"
                            class="hover:">
                            <i :class="['pi', tab.icon, 'mr-2']" />
                            {{ tab.label }}
                        </Tab>
                    </TabList>
                    <TabPanels class="flex-grow rounded-b-lg p-4">
                        <TabPanel
                            v-for="tab in tabs"
                            :key="tab.value"
                            :value="tab.value"
                            class="h-full">
                            <keep-alive>
                                <div class="m-0 flex h-full flex-col">
                                    <div class="mb-6 flex gap-4">
                                        <Button
                                            class="bg-teal-600 hover:bg-teal-700"
                                            >WHO</Button
                                        >
                                        <Button class="hover:bg-gray-600"
                                            >CDC</Button
                                        >
                                    </div>
                                    <Dropdown
                                        v-model="selectedAge"
                                        :options="ageOptions"
                                        option-label="name"
                                        placeholder="Select Age Range"
                                        class="mb-6 w-full" />
                                    <div
                                        class="mb-4 text-xl font-bold text-gray-300">
                                        Girl chart-{{ tab.label }} for age
                                        {{
                                            selectedAge
                                                ? selectedAge.name
                                                : '0-5 years'
                                        }}
                                    </div>
                                    <!-- Slot for dynamic content -->
                                    <slot :name="`body-${tab.value}`">
                                        <div
                                            class="flex flex-grow items-center justify-center rounded-lg bg-slate-800">
                                            <p class="text-2xl">
                                                {{ tab.label }} Data for
                                                {{
                                                    selectedAge
                                                        ? selectedAge.name
                                                        : '0-5 years'
                                                }}
                                            </p>
                                        </div>
                                    </slot>
                                </div>
                            </keep-alive>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
        <!-- Sidebar Card -->
        <Card class="flex w-1/4 flex-col rounded-lg p-4">
            <template #title>
                <div class="mb-4 flex items-center justify-between">
                    <span class="text-xl font-bold">Growth Data</span>
                    <Button
                        icon="pi pi-plus"
                        class="p-button-rounded p-button-text"
                        aria-label="Add Growth Entry" />
                </div>
            </template>
            <template #content>
                <!-- Make this section scrollable -->
                <div class="max-h-[70vh] flex-grow space-y-4 overflow-y-auto">
                    <div
                        v-if="growthEntries.length === 0"
                        class="text-center text-gray-400">
                        No growth data available
                    </div>
                    <div
                        v-for="(entry, index) in growthEntries"
                        :key="index"
                        class="bg-primary-300 rounded-lg p-4 shadow-sm">
                        <div class="text-primary-900 text-2xl font-bold">
                            {{ entry.value }} {{ entry.unit }}
                        </div>
                        <div class="text-sm text-gray-400">
                            {{ entry.date }}
                        </div>
                        <div class="text-xs text-gray-400">
                            {{ entry.age }}
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

interface Tab {
    label: string
    value: any
    icon?: string
}

interface Props {
    tabs?: Tab[]
}

withDefaults(defineProps<Props>(), {
    tabs: () => [
        { label: 'HEIGHT', value: 'height', icon: 'pi-arrows-v' },
        { label: 'WEIGHT', value: 'weight', icon: 'pi-chart-bar' },
        { label: 'HEAD CIRCUMFERENCE', value: 'head', icon: 'pi-circle' },
    ],
})

const activeTabIndex = ref(0)
const selectedAge = ref(null)

const ageOptions = [
    { name: '0-5 years', code: '0-5' },
    { name: '5-10 years', code: '5-10' },
    { name: '10-15 years', code: '10-15' },
]

const growthEntries = [
    {
        value: 96.5,
        unit: 'cm',
        date: '09 April 2012',
        age: '4 years 3 months 10 days',
    },
    {
        value: 15.2,
        unit: 'kg',
        date: '15 October 2013',
        age: '5 years 9 months 6 days',
    },
    {
        value: 52.3,
        unit: 'cm',
        date: '22 May 2015',
        age: '7 years 4 months 13 days',
    },
    {
        value: 18.5,
        unit: 'kg',
        date: '30 November 2016',
        age: '8 years 10 months 21 days',
    },
    {
        value: 105.8,
        unit: 'cm',
        date: '14 February 2018',
        age: '10 years 1 month 5 days',
    },
    {
        value: 54.1,
        unit: 'cm',
        date: '07 July 2019',
        age: '11 years 6 months 28 days',
    },
]
</script>
