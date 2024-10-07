import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Observation } from '../models'

export const useObservationsStore = defineStore('observations', {
    state: () => ({
        observations: [] as Observation[],
        loading: false,
    }),
    actions: {
        add(items: Observation | Observation[]) {
            const itemsArray = Array.isArray(items) ? items : [items]
            this.observations.push(...itemsArray)
        },
        remove(items: Observation | Observation[]) {
            const itemsArray = Array.isArray(items) ? items : [items]
            this.observations = this.observations.filter(
                (obs) => !itemsArray.some((item) => item._id === obs._id),
            )
        },
        update(items: Observation | Observation[]) {
            const itemsArray = Array.isArray(items) ? items : [items]
            itemsArray.forEach((item) => {
                const index = this.observations.findIndex(
                    (obs) => obs._id === item._id,
                )
                if (index !== -1) {
                    this.observations[index] = {
                        ...this.observations[index],
                        ...item,
                    }
                }
            })
        },
        setLoading(value: boolean) {
            this.loading = value
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useObservationsStore, import.meta.hot),
    )
}
