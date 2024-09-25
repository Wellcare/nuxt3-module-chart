<script setup lang="ts">
// import { useToast } from '#imports'
// // const toast = useToast()

const showInfo = () => {
    // toast.add({
    //     severity: 'info',
    //     summary: 'Info Message',
    //     detail: 'The feature is in development',
    //     life: 3000,
    // })

    console.log('incoming')
}
</script>

<template>
    <div class="flex items-center justify-between">
        <div class="flex gap-2">
            <Button text icon="pi pi-thumbs-up" @click="showInfo" />
            <Button text icon="pi pi-comment" @click="showInfo" />
        </div>
        <div class="flex gap-2">
            <Button text icon="pi pi-bookmark" @click="showInfo" />
            <Button text icon="pi pi-share-alt" @click="showInfo" />
            <Button text icon="pi pi-ellipsis-v" @click="showInfo" />
        </div>
    </div>
</template>
