<script lang="ts" setup>
import { ref } from '#imports'

const visible = ref<boolean>(false)
</script>

<template>
    <Button
        text
        icon="pi pi-align-justify"
        aria-label="Submit"
        @click="visible = true" />
    <Sidebar v-model:visible="visible">
        <template #container="{ closeCallback }">
            <div class="flex flex-col h-full gap-4 px-4 bg-white/40 dark:bg-black">
                <div class="flex items-center justify-between py-4 shrink-0">
                    <slot name="prepend" />

                    <Button
                        class="md:hidden xl:hidden"
                        type="button"
                        icon="pi pi-times"
                        rounded
                        link
                        @click="closeCallback" />
                </div>

                <div class="flex-1">
                    <slot />
                </div>

                <div class="mt-auto py-4">
                    <slot name="append"
                        >
<Button class="w-full" outlined block
                            >
SIGN OUT
</Button
                        >
</slot
                    >
                </div>
            </div>
        </template>
    </Sidebar>
</template>
