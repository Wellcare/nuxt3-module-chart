export const OBSERVATION_URL = {
    getId: (obsId: string) => `/phr/observation/${obsId}`,

    deleteId: (obsId: string) => `/phr/observation/${obsId}`,

    updateId: (obsId: string) => `/phr/observation/${obsId}`,

    searchAggregation: () => `/phr/observation/search-aggregation`,

    create: () => `phr/observation`,

    importCreate: () => `/phr/observation/import/create`,
}
