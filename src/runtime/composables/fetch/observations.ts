import type { Ref, ComputedRef } from '#imports'
import { computed, ref, unref, useAsyncData, useNuxtApp } from '#imports'
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
    observations: Ref<Observation[]> | ComputedRef<Observation[]>
    query: Ref<QueryObs>
    updateQuery: (newParams: Partial<QueryObs>) => void
    importCreate: (data: Observation[]) => Promise<void>
    getObservation: (_id: string) => Promise<void>
    deleteObservation: (_id: string) => Promise<void>
    updateObservation: (
        _id: string,
        data: Partial<Observation>,
    ) => Promise<void>
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

    // Helper function to check if query has meaningful search parameters
    const hasSearchParams = computed(() => {
        return (
            Object.keys(query.value.filter || {}).length > 0 ||
            query.value.sort ||
            query.value.limit !== 10 // Assuming 10 is the default limit
        )
    })

    const cacheKey = computed<string>(
        () =>
            `observations-${computedUserId.value}-${JSON.stringify(query.value)}`,
    )

    const isLoading = ref(false)

    const { data, refresh, execute } = useAsyncData<ResponseObs>(
        cacheKey.value,
        async () => {
            // Only proceed with search if there's a userId and either search parameters exist
            if (!computedUserId.value || !hasSearchParams.value) {
                return { results: [] }
            }

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
            immediate: !!userId, // Changed to false to prevent automatic execution
            deep: true,
            watch: [computedUserId],
        },
    )

    const updateQuery = (newParams: Partial<QueryObs>) => {
        query.value = { ...query.value, ...newParams }
        // Only execute if there are search parameters after update
        if (hasSearchParams.value) {
            execute()
        }
    }

    const performAction = async (
        action: () => Promise<any>,
        shouldRefresh: boolean = true,
    ) => {
        isLoading.value = true
        try {
            await action()
            if (shouldRefresh && hasSearchParams.value) {
                await refresh()
            }
        } catch (error) {
            console.error('Error performing action:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const importCreate = (data: Partial<Observation[]>) =>
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

    const updateObservation = (_id: string, data: Partial<Observation>) =>
        performAction(() =>
            $fetchWellcare(OBSERVATION_URL.updateId(_id), {
                method: 'PUT',
                body: JSON.stringify(data),
            }),
        )

    return {
        observations: computed<Observation[]>(() => data.value?.results || []),
        query,
        updateQuery,
        importCreate,
        getObservation,
        deleteObservation,
        updateObservation,
        isLoading,
        refresh,
    }
}
