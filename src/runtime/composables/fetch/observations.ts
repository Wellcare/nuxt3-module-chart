import type { Ref } from '#imports'
import {
    computed,
    ref,
    unref,
    useAsyncData,
    useDebounceFn,
    useNuxtApp,
    useSocketIo,
} from '#imports'
import { OBSERVATION_URL } from '../../constants'
import type { Observation, QueryObs } from '../../models'

interface ObservationOptions {
    userId?: string | Ref<string>
    initialQuery?: Partial<QueryObs>
}

interface ResponseObs {
    results: Observation[]
}

interface UseObservationsReturn {
    observations: Ref<ResponseObs | null>
    query: Ref<QueryObs>
    updateQuery: (newParams: Partial<QueryObs>) => void
    importCreate: (data: Observation[]) => Promise<void>
    getObservation: (_id: string) => Promise<void>
    deleteObservation: (_id: string) => Promise<void>
    putObservation: (_id: string, data: Partial<Observation>) => Promise<void>
    subscribe: () => () => void
    isLoading: Ref<boolean>
    refresh: () => Promise<void>
}

export const useObservations = ({
    userId,
    initialQuery = {},
}: ObservationOptions): UseObservationsReturn => {
    const { $fetchWellcare } = useNuxtApp()

    const computedUserId = computed<string>(() => (userId ? unref(userId) : ''))

    const query = ref<QueryObs>({
        filter: initialQuery.filter ?? {},
        limit: initialQuery.limit ?? 10,
        sort: initialQuery.sort,
    })

    const cacheKey = computed<string>(
        () =>
            `observations-${computedUserId.value}-${JSON.stringify(query.value)}`,
    )

    const isLoading = ref(false)

    const {
        data: observations,
        refresh,
        execute,
    } = useAsyncData<ResponseObs>(
        cacheKey.value,
        async () => {
            isLoading.value = true
            try {
                return await $fetchWellcare(
                    OBSERVATION_URL.searchAggregation(),
                    {
                        params: {
                            ...query.value,
                            userId: computedUserId.value,
                        },
                    },
                )
            } finally {
                isLoading.value = false
            }
        },
        {
            server: false,
            lazy: true,
            immediate: !!userId,
            deep: true,
            watch: [computedUserId, query],
        },
    )

    const updateQuery = (newParams: Partial<QueryObs>) => {
        query.value = { ...query.value, ...newParams }
        execute()
    }

    const performAction = async (
        action: () => Promise<any>,
        shouldRefresh: boolean = true,
    ) => {
        isLoading.value = true
        try {
            await action()
            if (shouldRefresh) {
                await refresh()
            }
        } catch (error) {
            console.error('Error performing action:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const importCreate = (data: Observation[]) =>
        performAction(() =>
            $fetchWellcare(OBSERVATION_URL.importCreate(), {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        )

    const getObservation = (_id: string) =>
        performAction(() => $fetchWellcare(OBSERVATION_URL.getId(_id)))

    const deleteObservation = (_id: string) =>
        performAction(() =>
            $fetchWellcare(OBSERVATION_URL.deleteId(_id), {
                method: 'DELETE',
            }),
        )

    const putObservation = (_id: string, data: Partial<Observation>) =>
        performAction(() =>
            $fetchWellcare(OBSERVATION_URL.updateId(_id), {
                method: 'PUT',
                body: JSON.stringify(data),
            }),
        )

    const socketInput = computed(() => ({
        room: {
            channel: '/Observation',
            name: 'Observation',
            roomId: computedUserId.value,
        },
        user: computedUserId.value,
        debug: true,
    }))

    const { socket, joinRoom, leaveRoom } = useSocketIo(socketInput)

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

    return {
        observations,
        query,
        updateQuery,
        importCreate,
        getObservation,
        deleteObservation,
        putObservation,
        subscribe,
        isLoading,
        refresh,
    }
}
