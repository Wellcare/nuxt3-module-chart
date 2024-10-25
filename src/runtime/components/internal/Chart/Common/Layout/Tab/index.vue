<script setup lang="ts">
import { onMounted, ref } from '#imports'

import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import Button from 'primevue/button'

import SideAcction from './SideAcction.vue'
import type { Observation } from '../../../../../../models'

interface Tab {
    label: string
    value: any
    icon?: string
}

interface Props {
    tabs?: Tab[]
    defaultTab?: string
    observations: Observation[]
}

const props = withDefaults(defineProps<Props>(), {
    tabs: () => [],
    defaultTab: '',
})

const emit = defineEmits<{
    'on:change': [value: string]
}>()

const activeTabIndex = ref('')
const selectedAge = ref(null)
const visible = ref(false)

const ageOptions = [
    { name: '0-5 years', code: '0-5' },
    { name: '5-10 years', code: '5-10' },
    { name: '10-15 years', code: '10-15' },
]

const handleUpdateValue = (value: any) => {
    emit('on:change', value)
}

onMounted(() => {
    if (Array.isArray(props.tabs) && props.tabs.length) {
        if (!props.defaultTab) {
            activeTabIndex.value = props.tabs[0].value
        } else {
            activeTabIndex.value = props.defaultTab
        }
    }
})
</script>

<template>
    <div class="flex h-screen flex-col gap-4 lg:flex-row">
        <!-- Main Card - full width on mobile, 3/4 on desktop -->
        <Card class="h-full w-full lg:w-3/4">
            <template #content>
                <div class="flex h-full flex-col">
                    <Tabs
                        :value="activeTabIndex"
                        class="flex flex-grow flex-col"
                        @update:value="handleUpdateValue">
                        <TabList class="overflow-x-auto rounded-t-lg">
                            <Tab
                                v-for="tab in tabs"
                                :key="tab.value"
                                :value="tab.value"
                                class="hover: whitespace-nowrap">
                                <i :class="['pi', tab.icon, 'mr-2']" />
                                <span class="text-sm uppercase lg:text-base">
                                    {{ $t(tab.label) }}
                                </span>
                            </Tab>
                        </TabList>
                        <TabPanels class="flex-grow rounded-b-lg p-2 lg:p-4">
                            <TabPanel
                                v-for="tab in tabs"
                                :key="tab.value"
                                :value="tab.value"
                                class="h-full">
                                <keep-alive>
                                    <div class="m-0 flex h-full flex-col">
                                        <!-- Button group - stack on mobile -->
                                        <div
                                            class="mb-4 flex flex-col gap-2 sm:flex-row lg:mb-6 lg:gap-4">
                                            <Button
                                                class="w-full bg-teal-600 hover:bg-teal-700 sm:w-auto"
                                                >WHO</Button
                                            >
                                            <Button
                                                class="w-full hover:bg-gray-600 sm:w-auto"
                                                >CDC</Button
                                            >
                                        </div>

                                        <Dropdown
                                            v-model="selectedAge"
                                            :options="ageOptions"
                                            option-label="name"
                                            placeholder="Select Age Range"
                                            class="mb-4 w-full lg:mb-6" />

                                        <slot
                                            :name="`body-${tab.value}`"
                                            :tab-value="tab.value" />
                                    </div>
                                </keep-alive>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </template>
        </Card>

        <!-- Sidebar Card - full width on mobile, 1/4 on desktop -->
        <SideAcction
            class="hidden h-full md:block lg:w-1/4 lg:p-4"
            :observations="observations" />

        <div class="fixed bottom-12 right-6 md:hidden">
            <Button
                icon="pi pi-plus"
                rounded
                siz="large"
                @click="visible = true" />

            <!-- Add Family Member Dialog -->
            <Dialog
                v-model:visible="visible"
                :draggable="false"
                class="p-dialog-maximized"
                :pt="{ content: { class: 'px-0' } }"
                modal
                header="Add body index">
                <SideAcction :observations="observations" />

                <div class="fixed bottom-12 right-6">
                    <Button icon="pi pi-plus" rounded siz="large" />
                </div>
            </Dialog>
        </div>
    </div>
</template>
