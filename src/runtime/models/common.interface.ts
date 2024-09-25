export interface IBackground {
    type?: 'image' | 'video' | 'pattern'
    src: string
    alt: string
    width?: number
}

export interface IPricingTableItem {
    per?: string
    name?: string
    price?: string
    actionName?: string
    highlightName?: string
    descriptionTop?: string
    benefits?: Array<string>
    descriptionBottom?: string
}