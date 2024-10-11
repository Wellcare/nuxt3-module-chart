export const OBSERVATION_URL = {
    getId: (obsId: string) => `/phr/observation/${obsId}`,

    deleteId: (obsId: string) => `/phr/observation/${obsId}`,

    updateId: (obsId: string) => `/phr/observation/${obsId}`,

    searchAggregation: () => `/phr/observation/search-aggregation`,

    create: () => `phr/observation`,

    importCreate: () => `/phr/observation/import/create`,
}

export const VACCINATION_URL = {
    history: (vaccineId: string): string =>
        `/phr/vaccination/history/${vaccineId}`,

    historyFindOrCreate: (): string =>
        '/phr/vaccination/history/find-or-create',

    schedulePatient: (userId: string): string =>
        `/phr/vaccination/schedule/patient/${userId}`,
}
