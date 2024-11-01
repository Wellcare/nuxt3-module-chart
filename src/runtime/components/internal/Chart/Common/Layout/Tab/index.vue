<script setup lang="ts">
import { computed, onMounted, ref, useI18n } from '#imports'

import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import SideAction from './SideAction.vue'
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
const { t } = useI18n()

const emit = defineEmits<{
    'on:change': [value: Observation['key']]
    'on:add': []
    'on:delete': [value: Observation]
    'on:edit': [value: Observation]
}>()

const activeTabIndex = ref('')
const visible = ref(false)

const titleSideAction = computed<string>(() =>
    t(
        `body-index.chart.common.layout.tab.side-action.title-${props.defaultTab.toLowerCase()}`,
    ),
)

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
                        scrollable
                        @update:value="handleUpdateValue">
                        <TabList>
                            <Tab
                                v-for="tab in tabs"
                                :key="tab.value"
                                :value="tab.value"
                                class="hover:whitespace-nowrap">
                                <i :class="['pi', tab.icon, 'mr-2']" />
                                <span class="text-sm uppercase lg:text-base">
                                    {{ $t(tab.label) }}
                                </span>
                            </Tab>
                        </TabList>
                        <div class="my-4"><slot name="body-header" /></div>
                        <TabPanels class="flex-grow rounded-b-lg p-2 lg:p-4">
                            <TabPanel
                                v-for="tab in tabs"
                                :key="tab.value"
                                :value="tab.value"
                                class="h-full">
                                <keep-alive>
                                    <div class="m-0 flex h-full flex-col">
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
        <SideAction
            class="hidden h-full md:block lg:w-1/4 lg:p-4"
            :observations="observations"
            :title="titleSideAction"
            @on:add="$emit('on:add')"
            @on:edit="($data) => $emit('on:edit', $data)"
            @on:delete="($data) => $emit('on:delete', $data)" />

        <div class="fixed bottom-12 right-6 md:hidden">
            <Button
                icon="pi pi-bars"
                rounded
                siz="large"
                @click="visible = true" />

            <!-- Add Family Member Dialog -->
            <Dialog
                v-model:visible="visible"
                :draggable="false"
                class="p-dialog-maximized"
                :pt="{ content: { class: 'px-0' } }"
                :header="titleSideAction"
                modal>
                <SideAction
                    :observations="observations"
                    @on:add="$emit('on:add')"
                    @on:edit="($data) => $emit('on:edit', $data)"
                    @on:delete="($data) => $emit('on:delete', $data)" />

                <div class="fixed bottom-12 right-6">
                    <Button
                        icon="pi pi-plus"
                        rounded
                        siz="large"
                        @click="$emit('on:add')" />
                </div>
            </Dialog>
        </div>
    </div>
</template>
