<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const { user } = await useUserInfo({ scope: '_id' })

const wBodyIndex = ref<any | null>(null)

const computedUserId = computed(() => user.value?._id || '')

const handleAdd = (key: string) => {
    console.log('click add', key)
}

const handleClick = (key: string) => {
    navigateTo(`/chart/${user.value._id}/${key}`)
}

const refreshSearch = () => {
    if (wBodyIndex.value) {
        wBodyIndex.value?.refreshSearch()
    }
}

const socketInput = computed(() => ({
    room: {
        channel: '/Observation',
        name: 'Observation',
        roomId: computedUserId.value,
    },
    user: computedUserId.value,
    debug: true,
}))

const { socket, leaveRoom, joinRoom } = useSocketIo(socketInput)

const setupSocketListeners = () => {
    const debouncedRefresh = useDebounceFn(() => {
        refreshSearch()
    }, 500)

    socket.on('created', debouncedRefresh)
    socket.on('updated', debouncedRefresh)
    socket.on('removed', debouncedRefresh)
}

const subscribe = () => {
    joinRoom()
    setupSocketListeners()
    return () => {
        leaveRoom()
        socket.removeAllListeners()
    }
}

onMounted(() => {
    subscribe()
})
</script>

<template>
    <div class="mx-auto w-full max-w-7xl flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <WBodyIndex
            v-if="user._id"
            ref="wBodyIndex"
            :user-id="user._id"
            @click="handleClick"
            @add="handleAdd" />
    </div>
</template>
