<script setup lang="ts"></script>

<template>
    <div class="h-fit">
        <div
            class="card fixed top-0 left-0 right-0 z-10 shadow-lg shadow-indigo-500/40 bg-surface-50 dark:bg-surface-700">
            <Menubar class="rounded-none container mx-auto border-none">
                <template #start>
                    <div class="flex items-center gap-4">
                        <slot name="prepend" />
                    </div>
                </template>
                <template #end>
                    <slot name="append" />
                </template>
            </Menubar>
        </div>
    </div>
</template>
