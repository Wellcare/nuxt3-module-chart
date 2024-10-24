<script setup lang="ts">
import {
    computed,
    onMounted,
    ref,
    useObservations,
    useUserInfo,
} from '#imports'

definePageMeta({
    middleware: 'auth',
})

const { user } = await useUserInfo({ scope: ['_id'], refresh: true })

const { observations, importCreate, refresh } = useObservations({
    userId: user.value._id || '',
    initialQuery: {
        filter: {
            user: user.value._id,
            name: [
                'Person Height',
                'Person Weight',
                'Person Head Circumference',
            ],
        },
        limit: 100,
        sort: '-observedAt',
    },
})

const observationsArray = computed(() => observations.value?.results || [])
const computedUserId = computed(() => user.value?._id || '')

const observationTypes = [
    { name: 'Person Height', key: 'height', unit: 'cm' },
    { name: 'Person Weight', key: 'weight', unit: 'kg' },
    { name: 'Person Head Circumference', key: 'headCircumference', unit: 'cm' },
]

const newObservation = ref({
    name: '',
    value: null as number | null,
})

const addObservation = async () => {
    if (newObservation.value.name && newObservation.value.value !== null) {
        const observationType = observationTypes.find(
            (type) => type.name === newObservation.value.name,
        )
        await importCreate([
            {
                name: newObservation.value.name,
                value: newObservation.value.value,
                unit: observationType?.unit || '',
                observedAt: new Date().toISOString(),
                user: user.value._id,
                key: observationType?.key || '',
            },
        ])
        // newObservation.value = { name: '', value: null }
        // updateQuery({ sort: '-observedAt' }) // Refresh to show the new observation
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
        refresh()
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
    <div class="mx-auto max-w-4xl p-4">
        <h1 class="mb-4 text-2xl font-bold">Observations for {{ user._id }}</h1>

        <DataTable
            :value="observationsArray"
            :paginator="true"
            :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 20, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}"
            responsive-layout="scroll"
            class="p-datatable-sm">
            <Column field="name" header="Name" sortable />
            <Column field="observedAt" header="Observed At" sortable>
                <template #body="slotProps">
                    {{ new Date(slotProps.data.observedAt).toLocaleString() }}
                </template>
            </Column>
            <Column field="value" header="Value" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.value }} {{ slotProps.data.unit }}
                </template>
            </Column>
        </DataTable>

        <div class="mt-8">
            <h2 class="mb-4 text-xl font-semibold">Add New Observation</h2>
            <form class="space-y-4" @submit.prevent="addObservation">
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <Dropdown
                        v-model="newObservation.name"
                        :options="observationTypes"
                        option-label="name"
                        option-value="name"
                        placeholder="Select Observation Type"
                        class="w-full" />
                </div>
                <div>
                    <label
                        for="value"
                        class="block text-sm font-medium text-gray-700"
                        >Value</label
                    >
                    <InputNumber
                        v-model="newObservation.value"
                        :min-fraction-digits="2"
                        :max-fraction-digits="2"
                        class="w-full" />
                </div>
                <Button type="submit" label="Add Observation" class="w-full" />
            </form>
        </div>
    </div>
</template>
