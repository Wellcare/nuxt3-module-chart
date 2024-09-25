<script setup lang="ts">
import { type PropType } from '#imports'
import type { Contributor } from '../../../../models'

const { contributors } = defineProps({
    contributors: {
        type: Array as PropType<Contributor[]>,
        default: () => [],
    },
})

const getInitials = (fullName: string) => {
    return fullName
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
}
</script>

<template>
    <div class="flex justify-center items-center gap-2">
        <span v-for="(contributor, index) in contributors" :key="contributor.id"
            ><WTooltip :delay="100"
                >{{ contributor.properties.Name }}

                <template #body>
                    <div
                        :class="`bg-white p-2 p text-xs rounded-lg text-gray-800 font-medium transition-opacity duration-300 border border-gray-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);]`">
                        <div class="flex items-center gap-2">
                            <Avatar
                                v-if="contributor?.properties?.Avatar?.url"
                                :image="contributor?.properties?.Avatar?.url"
                                shape="circle"
                                class="border-2 border-primary" />
                            <Avatar
                                v-else
                                :label="
                                    getInitials(contributor?.properties?.Name)
                                "
                                shape="circle"
                                class="border-2 border-primary" />
                            <span>{{ contributor?.properties?.Name }}</span>
                        </div>
                    </div>
                </template>
            </WTooltip>
            <span v-show="index !== contributors.length - 1">,</span></span
        >
    </div>
</template>
