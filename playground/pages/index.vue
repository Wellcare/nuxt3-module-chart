<script setup lang="ts">
import { useRouter } from '#imports'
const { options } = useRouter()
const routes = options.routes
// .sort((a, b) => a.path.length - b.path.length)
</script>

<template>
    <div class="container mx-auto w-full px-16 py-20 text-left">
        <h1 class="mb-10 text-4xl font-bold text-black dark:text-white">
            Pages in this Repo
        </h1>

        <Button label="Check" icon="pi pi-check" />

        <div v-for="route in routes" :key="route.path" class="my-2">
            <Button
                :label="route.path"
                link
                @click="$router.push(route.name as string)" />
        </div>
    </div>
</template>
