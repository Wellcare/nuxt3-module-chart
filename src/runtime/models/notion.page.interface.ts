import type { INotionBlock } from './index'

export interface Contributor {
    cover: {
        url: string | null
    }
    public_url: null
    created_time: Date
    archived: boolean
    last_edited_time: Date
    id: string
    properties: Properties
    url: string
}

export interface Properties {
    Status: string
    Locale: string | null
    Cover: any[]
    'Meta Description': string
    Website: Website[]
    Title: string | null
    Gender: null
    _id: string
    Joined: null
    Profile: string | null
    Created: Date
    Name: string
    Avatar: {
        url: string | null
    }
}

export interface Website {
    id: string
}

interface PageProperties {
    Contributors: Contributor[]
    Created: string
    Keywords: any[]
    Labels: any[]
    Locale: string
    Name: string
    Sapo: string
    Site: string
    Slug: string
    Status: string
    SubItem: any[]
    Translation: any[]
    Type: string
    'Last edited time': string
    'Meta Description': string
    'Parent item': ParentItem[]
}

interface ParentItem {
    Cover: any
    PublicUrl: any
    CreatedTime: string
    Archived: boolean
    LastEditedTime: string
    Icon: any
    Id: string
    Properties: ParentItemProperties
    Url: string
}

interface ParentItemProperties {
    Status: string
    Locale: string
    Site: string
    SubItem: SubItem[]
    Translation: any[]
    Keywords: any[]
    LastEditedTime: string
    ParentItem: ParentItem[]
    MetaDescription: string
    Sapo: string
    Labels: any[]
    Slug: string
    URL: any
    Created: string
    Name: string
    Type: string
    Contributors: any[]
}

interface SubItem {
    Id: string
}

interface Cover {
    url: string | null | any
}

export interface NotionPage {
    id: string
    cover?: Cover
    properties: PageProperties
    blocks: INotionBlock[]
}
