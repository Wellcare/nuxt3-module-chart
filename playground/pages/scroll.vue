<template>
    <div class="grid grid-cols-3 gap-4">
        <div class="...">01</div>
        <div class="...">02</div>
        <div class="...">03</div>
        <div class="... col-span-2">04</div>
        <div class="...">05</div>
        <div class="...">06</div>
        <div class="... col-span-2">07</div>
    </div>
</template>

<style scoped>
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}

.box {
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    border-radius: 50% !important;
    color: var(--primary-color-text);
}
</style>
