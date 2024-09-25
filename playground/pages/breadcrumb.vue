<template>
    <div class="card flex justify-content-center">
        <WBreadcrumb :home="home" :model="items" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const home = ref({
    icon: 'pi pi-home',
    route: '/',
})
const items = ref([
    { label: 'Home' },
    { label: 'Components' },
    { label: 'Breadcrumb', route: '/breadcrumb' },
])
</script>
