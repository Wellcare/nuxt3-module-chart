<script setup lang="ts">
import type { PropType } from 'vue'
import { useI18n } from '#imports'

type SizeType = 'small' | 'normal'
const { size } = defineProps({
    size: {
        type: String as PropType<SizeType>,
        default: () => 'small',
    },
})
const { setLocale, locale } = useI18n()
</script>

<template>
    <div
        :class="
            'inline-flex gap-1 bg-slate-200 dark:bg-slate-800 rounded-lg ' +
            (size == 'normal' ? 'p-1.5' : 'p-1')
        ">
        <Button
            plain
            text
            :size="size == 'normal' ? null : 'small'"
            :class="
                'rounded-2xl dark:text-white ' +
                (locale == 'vi' ? 'bg-white dark:bg-slate-600' : '') +
                (size == 'normal' ? ' !p-2' : '')
            "
            @click="setLocale('vi')">
            VI
        </Button>
        <Button
            plain
            text
            :size="size == 'normal' ? null : 'small'"
            :class="
                'rounded-2xl dark:text-white ' +
                (locale == 'en' ? 'bg-white dark:bg-slate-600' : '') +
                (size == 'normal' ? ' !p-2' : '')
            "
            @click="setLocale('en')">
            EN
        </Button>
    </div>
</template>
