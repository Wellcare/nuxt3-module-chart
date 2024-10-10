export interface Observation {
    _id: string
    user?: string
    key?: string
    name?: string
    value?: string
    observedAt?: string
    updatedAt?: string
    label?: string[]
    unit?: string
}

export interface QueryObs {
    filter?: any
    limit: number | string | any
    sort?: string
}
