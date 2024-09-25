<script lang="ts" setup>
import { reactive, ref } from '#imports'
import dataTest from './bai-viet-test.json'

const page: any = reactive(dataTest)

const home = ref({
    icon: 'pi pi-home',
    route: '/',
})
const items = ref<any>([
    { label: 'Home', route: '/test' },
    { label: 'Components nhaaaa' },
    { label: page.properties.Name, route: '/breadcrumb' },
])

const loading = ref(false)
</script>
<template>
    <div class="relative overflow-x-hidden py-16">
        <div
            class="grid grid-cols-1 gap-6 pt-4 md:grid-cols-12 xl:grid-cols-12">
            <div
                class="px-5 sm:px-5 md:col-span-10 md:col-start-2 md:px-5 xl:col-span-8 xl:col-start-3 xl:px-0 2xl:px-0">
                <WBreadcrumb
                    :home="home"
                    :model="items"
                    :loading="loading"
                    class="mb-4 border-none !bg-transparent !px-0" />
                <WArticleHeader :page="page" :loading="loading" />
                <WArticle
                    :blocks="page.blocks"
                    :page="page"
                    :loading="loading"
                    body />
            </div>
        </div>
    </div>

    <!-- Second grid -->
</template>
