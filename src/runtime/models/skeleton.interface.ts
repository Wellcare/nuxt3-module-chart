export type SkeletonType =
    | 'avatar'
    | 'button'
    | 'chip'
    | 'divider'
    | 'heading'
    | 'image'
    | 'text'
    | 'sentences'
    | 'paragraph'
    | 'ossein'
    | 'actions'
    | 'article'
    | 'card'
    | 'card-avatar'
    | 'date-picker'
    | 'date-picker-options'
    | 'date-picker-days'
    | 'list-item'
    | 'list-item-avatar'
    | 'list-item-two-line'
    | 'list-item-avatar-two-line'
    | 'list-item-three-line'
    | 'list-item-avatar-three-line'
    | 'subtitle'
    | 'table'
    | 'table-heading'
    | 'table-thead'
    | 'table-tbody'
    | 'table-row-divider'
    | 'table-row'
    | 'table-foot'

export interface ISkeletonLoader {
    boilerplate?: boolean
    color?: string
    elevation?: string | number
    height?: string | number
    loading?: boolean
    loadingText?: string
    maxHeight?: string | number
    maxWidth?: string | number
    minHeight?: string | number
    minWidth?: string | number
    theme?: string
    type?: SkeletonType | SkeletonType[]
}
