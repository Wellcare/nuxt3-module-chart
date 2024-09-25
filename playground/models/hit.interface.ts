// hit.interface.ts
import type { NotionPage } from '../../src/runtime/models'

export interface Hit<T = NotionPage> {
    _id: string
    html?: string
    page: T
    _highlight?: any
    blockstring?: string
}
