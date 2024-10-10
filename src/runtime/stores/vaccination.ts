import { acceptHMRUpdate, defineStore } from '#imports'
import type { DiseaseSchedule } from '../models'

interface VaccinationState {
    schedules: DiseaseSchedule[] | null
    isLoading: boolean
}

export const useVaccinationStore = defineStore('vaccination', {
    state: (): VaccinationState => ({
        schedules: null,
        isLoading: false,
    }),
    actions: {
        setSchedules(schedules: DiseaseSchedule[]) {
            this.schedules = schedules
        },
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useVaccinationStore, import.meta.hot),
    )
}
