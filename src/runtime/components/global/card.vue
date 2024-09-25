<script lang="ts" setup></script>

<template>
    <v-card elevation="0" class="d-flex">
        <v-img
            class="bg-grey-lighten-2 mr-2"
            max-width="150"
            max-height="80"
            rounded="lg"
            src="https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2021/8/10/jack01gtpf-1-16286070458251002756678.jpg" />

        <NuxtLink class="title">
            Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
            convallis tellus.aosdmkjlsandklasdnkj
        </NuxtLink>
    </v-card>
</template>

<style scoped>
.title {
    width: 60%;
    height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* limit to 2 lines */
    cursor: pointer;

    &:hover {
        color: rgb(var(--v-theme-primary));
    }
}
</style>
