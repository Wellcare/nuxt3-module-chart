<script setup lang="ts">
import { navigateTo, useRoute, useRouter, ref } from '#imports'

const props = defineProps({
    defaultSlug: {
        type: String,
        default: '',
    },
})

const route = useRoute()
const router = useRouter()

const keyword = ref<string>('')

function onCloseSearch() {
    if (keyword.value.trim() === '') router.push({ query: {} })
    else keyword.value = ''
}

function onSearch() {
    if (keyword.value.trim() === '') return
    const target = route.query?.target ?? props.defaultSlug
    if (target === route.fullPath) {
        router.push({
            query: {
                q: keyword.value,
            },
        })
    } else {
        router.push({ query: {} })
        navigateTo({
            path: target,
            query: {
                q: keyword.value,
            },
        })
    }
    keyword.value = ''
}
</script>

<template>
    <div class="z-50 sticky">
        <div class="p-3 flex bg-white/[0.6] dark:bg-black/[0.6]">
            <IconField icon-position="left" class="mr-2 flex-grow">
                <InputIcon class="pi pi-search" />
                <InputText
                    id="search_input_el"
                    v-model="keyword"
                    @keypress.enter="onSearch" />
            </IconField>
            <Button
                icon="pi pi-times"
                text
                plain
                rounded
                @click="onCloseSearch" />
        </div>
    </div>
</template>
