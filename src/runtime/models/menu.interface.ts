export interface MenuItem {
    icon?: string
    isSection?: boolean
    label: string
    route: string
    items?: MenuItem[]
}
