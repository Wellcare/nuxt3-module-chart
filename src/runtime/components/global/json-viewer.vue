<script setup lang="ts">
defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})
</script>
<template>
    <Panel header="Data" toggleable collapsed v-bind="$attrs">
        <pre class="text-start">{{ data }}</pre>
    </Panel>
</template>
