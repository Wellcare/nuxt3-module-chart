import type { ComputedRef, Ref } from '#imports'
import {
    computed,
    useAsyncData,
    useNuxtApp,
    useVaccinationStore,
} from '#imports'
import type { DiseaseSchedule, VaccinationHistory } from '../../models'

interface UseVaccinationScheduleOptions {
    userId: Ref<string> | ComputedRef<string>
}

interface UseVaccinationScheduleReturn {
    vaccinationSchedules: ComputedRef<DiseaseSchedule[] | null>
    isLoading: ComputedRef<boolean>
    refresh: () => Promise<void>
    updateVaccinationHistory: (
        historyId: string,
        updateData: VaccinationHistory,
    ) => Promise<void>
}

export const useVaccinationSchedule = ({
    userId,
}: UseVaccinationScheduleOptions): UseVaccinationScheduleReturn => {
    const { $fetchWellcare } = useNuxtApp()
    const store = useVaccinationStore()

    const cacheKey = computed<string>(
        () => `vaccination-schedule-${userId.value}`,
    )

    const { data, refresh } = useAsyncData<{
        code: number
        message: string
        results: DiseaseSchedule[]
    }>(
        cacheKey.value,
        async () => {
            store.setLoading(true)
            try {
                const data: any = await $fetchWellcare(
                    `/phr/vaccination/schedule/patient/${userId.value}`,
                )
                store.setSchedules(data.results)
                return data
            } finally {
                store.setLoading(false)
            }
        },
        {
            server: false,
            lazy: true,
            immediate: true,
            watch: [userId],
        },
    )

    const updateVaccinationHistory = async (
        historyId: string,
        updateData: VaccinationHistory,
    ): Promise<void> => {
        store.setLoading(true)
        try {
            await $fetchWellcare(`/phr/vaccination/history/${historyId}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
            })
            await refresh()
        } catch (error) {
            console.error('Error updating vaccination history:', error)
            throw error
        } finally {
            store.setLoading(false)
        }
    }

    return {
        vaccinationSchedules: computed(() => data.value?.results || null),
        isLoading: computed(() => store.isLoading),
        refresh,
        updateVaccinationHistory,
    }
}
