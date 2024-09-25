<script lang="ts" setup></script>

<template>
    <header class="my-4">
        <div class="flex animate-pulse items-center space-x-4">
            <Skeleton width="5rem" height="1rem"></Skeleton>
            <Skeleton width="4rem" height="1rem"></Skeleton>
            <Skeleton width="10rem" height="1rem"></Skeleton>
        </div>

        <div class="mt-4 flex animate-pulse flex-col gap-4">
            <Skeleton width="20rem" height="2rem"></Skeleton>
            <Skeleton width="50%" height="2rem"></Skeleton>
        </div>
    </header>

    <div>
        <div class="my-2 flex flex-wrap items-center gap-2">
            <Skeleton width="7rem" height="1.5rem"></Skeleton>
            <Skeleton width="5rem" height="1.5rem"></Skeleton>
        </div>

        <Skeleton width="100%" height="200px" class="aspect-ratio mt-4">
        </Skeleton>

        <div class="mt-4 animate-pulse space-y-3">
            <!-- Long paragraph -->
            <Skeleton width="100%" height="1rem"></Skeleton>
            <Skeleton width="90%" height="1rem"></Skeleton>
            <Skeleton width="95%" height="1rem"></Skeleton>

            <!-- Short paragraph -->
            <Skeleton
                class="mt-4 rounded-lg"
                width="50%"
                height="1rem"></Skeleton>

            <!-- Tags Skeleton -->
            <div class="mt-4 flex flex-wrap items-center gap-2">
                <Skeleton width="5rem" height="1.5rem"></Skeleton>
                <Skeleton width="4rem" height="1.5rem"></Skeleton>
                <Skeleton width="6rem" height="1.5rem"></Skeleton>
            </div>
        </div>
    </div>

    <footer class="mt-8 flex animate-pulse space-x-4">
        <Skeleton width="6rem" height="2.5rem"></Skeleton>
        <Skeleton width="6rem" height="2.5rem"></Skeleton>
        <Skeleton width="6rem" height="2.5rem"></Skeleton>
    </footer>
</template>
