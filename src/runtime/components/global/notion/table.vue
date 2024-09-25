<script setup lang="ts">
import { type PropType, computed } from '#imports'
import type { ITable } from '../../../models'
import RichText from './rich_text.vue'

const { table } = defineProps({
    table: {
        type: Object as PropType<ITable>,
        required: true,
    },
})
const rows = computed(() => (table as any)?.children)
const has_column_header = computed(() => table?.has_column_header)
const has_row_header = computed(() => table?.has_row_header)
</script>
<template>
    <table class="w-full text-sm">
        <tbody>
            <tr
                v-for="(row, rowIndex) in rows"
                :key="row.id"
                :class="[
                    'border',
                    {
                        'bg-gray-100 dark:bg-gray-800':
                            has_column_header && rowIndex === 0,
                    },
                ]">
                <td
                    v-for="(cell, index) in row.table_row.cells"
                    :key="index"
                    :class="[
                        'border px-6 py-4',
                        {
                            'bg-gray-100 dark:bg-gray-800':
                                has_row_header && index === 0,
                        },
                    ]">
                    <RichText :rich_text="cell" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
