// notion.block.interface.ts
export type Color =
    | 'blue'
    | 'blue_background'
    | 'brown'
    | 'brown_background'
    | 'default'
    | 'gray'
    | 'gray_background'
    | 'green'
    | 'green_background'
    | 'orange'
    | 'orange_background'
    | 'pink'
    | 'pink_background'
    | 'purple'
    | 'purple_background'
    | 'red'
    | 'red_background'
    | 'yellow'
    | 'yellow_background'

export interface IAnnotations {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    code?: boolean
    color?: Color
}

export type ParentType = 'page_id' | 'database_id' | 'block_id' | 'workspace'

export type BlockType =
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'bookmark'
    | 'breadcrumb'
    | 'bulleted_list_item'
    | 'callout'
    | 'child_database'
    | 'child_page'
    | 'code'
    | 'column_list'
    | 'column'
    | 'divider'
    | 'embed'
    | 'equation'
    | 'file'
    | 'image'
    | 'link_preview'
    | 'mention'
    | 'numbered_list_item'
    | 'paragraph'
    | 'pdf'
    | 'quote'
    | 'synced_block'
    | 'table'
    | 'table_row'
    | 'table_of_contents'
    | 'template'
    | 'to_do'
    | 'toggle'
    | 'video'

export type ColorType =
    | 'blue'
    | 'blue_background'
    | 'brown'
    | 'brown_background'
    | 'default'
    | 'gray'
    | 'gray_background'
    | 'green'
    | 'green_background'
    | 'orange'
    | 'orange_background'
    | 'yellow'
    | 'pink'
    | 'pink_background'
    | 'purple'
    | 'purple_background'
    | 'red'
    | 'red_background'
    | 'yellow_background'
    | 'default'

export type MentionType = 'database' | 'date' | 'link_preview' | 'page' | 'user'

export interface IRichText {
    type?: 'text' | 'mention' | 'equation'
    text?: {
        content: string
        link: null | { url: string }
    }
    mention?: IMention
    equation?: IEquation
    annotations?: IAnnotations
    plain_text: string
    href?: null | string
}

export interface IParagraph {
    rich_text: IRichText[]
    color: ColorType
    children?: INotionBlock[]
}

export interface IHeading extends IParagraph {
    is_toggleable: boolean
}

interface IPerson {
    object: 'user'
    id: string
}
export interface IBookmark {
    caption: IRichText[]
    url: string
}

export interface IBreadcrumb {} // Breadcrumb block objects do not contain any information within the breadcrumb property.

export interface IBulletedListItem extends IParagraph {
    children?: INotionBlock[]
}

export interface ICallout extends IParagraph {
    icon: {
        emoji: string
    }
}

export interface IChildPage {
    title: string
}
export interface IChildDatabase extends IChildPage {}

export interface ICode {
    caption: IRichText[]
    rich_text: IRichText[]
    language: string
}

export interface IColumnList {} // Column lists are parent blocks for columns. They do not contain any information within the column_list property.

export interface IColumn {} // Columns are parent blocks for any block types listed in this reference except for other columns. They do not contain any information within the column property. They can only be appended to column_lists.

export interface IDivider {}

export interface IEmbed {
    url: string
    expiry_time?: string
    caption?: IRichText[]
}

export interface IEquation {
    expression: string
}

export interface IFileObject {
    type: 'external' | 'file'
    external?: IEmbed
    file?: IEmbed
}

export interface IFile {
    caption: IRichText[]
    type: 'external' | 'file'
    file?: IFileObject // A file object that details information about the file contained in the block.
    name?: string //The name of the file block, as shown in the Notion UI. Note that the UI may auto-append .pdf or other extensions.
    external?: null | {
        url: null | string
    }
}

export interface IImage extends IFile {}

export interface ILinkPreview extends IEmbed {}

export interface IMention {
    type: MentionType
    database?: any
    date?: any
    link_preview?: any
    page?: any
    user?: any
}

export interface INumberedListItem extends IParagraph {}

export interface IPdf {
    type: 'external'
    external?: IFile
}

export interface IQuote extends IParagraph {
    children: INotionBlock[]
}

export interface ISyncedBlock {
    synced_from: boolean
    children: INotionBlock[]
}

export interface ITable {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
}

export interface ITableOfContents {
    color: ColorType
}

export interface IToDo extends IParagraph {
    checked?: boolean
    children: INotionBlock[]
}

export interface IToggle extends IParagraph {
    children: INotionBlock[]
}

export interface IVideo extends IImage {}

export interface INotionBlock {
    object: 'block'
    id: string
    parent: {
        type: ParentType
        page_id?: string
        database_id?: string
        workspace?: boolean
        block_id?: string
    }
    request_id?: string
    created_time: string
    last_edited_time: string
    created_by: IPerson
    last_edited_by: IPerson
    has_children: boolean
    archived: boolean
    type: BlockType
    heading_1?: IHeading
    heading_2?: IHeading
    heading_3?: IHeading
    bookmark?: IBookmark
    breadcrumb?: IBreadcrumb
    bulleted_list_item?: IBulletedListItem
    callout?: ICallout
    child_database?: IChildDatabase
    child_page?: IChildPage
    code?: ICode
    column_list?: IColumnList
    column?: IColumn
    divider?: IDivider
    embed?: IEmbed
    equation?: IEquation
    file?: IFile
    image?: IImage
    link_preview?: ILinkPreview
    mention?: IMention
    numbered_list_item?: INumberedListItem
    paragraph?: IParagraph
    pdf?: IPdf
    quote?: IQuote
    synced_block?: ISyncedBlock
    table?: ITable
    table_of_contents?: ITableOfContents
    to_do?: IToDo
    toggle?: IToggle
    video?: IVideo
    isIncluded?: boolean
}
