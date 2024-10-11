export interface DiseaseSchedule {
    disease: string
    label: string
    vaccines: Vaccine[]
}

export interface Vaccine {
    name: string
    priority: number
    schedule: Schedule[]
    lastDose?: number
    lastDoseDate: any
    maxDose?: number
    vaccine_id?: string
}

export interface Schedule {
    dose: number
    daysFromBirth: number
    daysFromLastDose: number
    suggestedDate: string
    observedAt: string
    state: 'pending' | 'success'
    note?: string
}

export interface Vaccination {
    _id: string
    lastDose: number
    patient: string
    disease?: string
    vaccine?: string
    lastDoseDate: any
    createdBy?: string
    updatedBy?: string
    createdAt?: string
    updatedAt?: string
    __v: number
}
