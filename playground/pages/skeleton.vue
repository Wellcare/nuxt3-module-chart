<script lang="ts" setup></script>
<template>
    <div class="max-w-5xl mx-auto w-full my-8">
        <!-- Skeleton with default -->
        <div>
            <h3>Skeleton with default</h3>
            <WSkeleton :max-width="700" :type-block="['card-avatar', 'article']"></WSkeleton>
        </div>

        <!--  Card Skeleton -->
        <div class="mt-8">
            <h3>Card Skeleton</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <WSkeleton v-for="i in 3" :key="i" block="card"></WSkeleton>
            </div>
        </div>

        <!--  List Skeleton -->
        <div class="mt-8">
            <h3>List Skeleton</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <WSkeleton v-for="i in 2" :key="i" block="list"></WSkeleton>
            </div>
        </div>

        <!--  Article Skeleton -->
        <div class="mt-8">
            <h3>List Skeleton</h3>
            <WSkeleton block="article"></WSkeleton>
        </div>
    </div>
</template>