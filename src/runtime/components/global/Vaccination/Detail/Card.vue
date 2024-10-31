<script setup lang="ts">
import { useI18n } from '#imports'
import Button from 'primevue/button'
import Card from 'primevue/card'

const { t } = useI18n()

defineProps({
    label: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
        required: true,
    },
    vaccineStatus: {
        type: String,
        default: null,
    },
    isFullyVaccinated: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['edit'])
</script>

<template>
    <Card
        :class="[
            'min-w-60 border-2 border-gray-200 shadow-none dark:border-gray-800',
            {
                '!border-primary': isFullyVaccinated,
            },
        ]">
        <template #title>
            <div class="flex items-start justify-between">
                <div>{{ label }}</div>
                <div class="w-[40%] text-right">
                    <Tag
                        rounded
                        :severity="isFullyVaccinated ? 'success' : 'warning'"
                        :value="vaccineStatus" />
                </div>
            </div>
        </template>
        <template #subtitle>
            {{ disease }}
        </template>
        <template #content> </template>
        <template #footer>
            <div class="flex items-center justify-end">
                <Button
                    icon="pi pi-pencil"
                    severity="secondary"
                    aria-label="Edit"
                    :label="t('edit')"
                    @click="emit('edit')" />
            </div>
        </template>
    </Card>
</template>

<i18n lang="yaml">
vi:
    vaccination:
        last-dose: 'Liều cuối'
        last-injected: 'Liều đã lên lịch'
        none: 'Không có'
en:
    vaccination:
        last-dose: 'Last Dose'
        last-injected: 'Last Injected'
        none: 'None'
</i18n>
