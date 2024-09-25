<template>
    <div
        class="relative z-10 mx-auto sm:mx-0 border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-full sm:h-[600px] w-full max-w-[300px] overflow-hidden">
        <div
            class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
        <div
            class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
        <div
            class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
        <div
            class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
        <div
            class="rounded-[2rem] overflow-hidden w-full sm:w-[272px] h-full sm:h-[572px] bg-white dark:bg-gray-800">
            <slot name="image" />
        </div>
    </div>
</template>
