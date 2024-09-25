<template>
    <div
        class="border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded border p-6">
        <div class="mb-4 flex">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="mt-4 flex justify-between">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</template>
