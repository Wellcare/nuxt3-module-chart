import type {
    SeoTagType,
    AlignmentType,
    BackgroundPositionType,
    BackgroundAttachmentType,
    HorizontalAlignType,
    VerticalAlignType,
} from '../types/common'

export const transformAlignment = (
    textAlignment: AlignmentType = 'center',
): string => {
    const mapping: Record<AlignmentType, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return mapping[textAlignment] || mapping['center']
}

export const transformSeoTag = (tag: SeoTagType = 'h1'): SeoTagType => {
    return tag
}

export const transformBackgroundAttachment = (
    attachment: BackgroundAttachmentType = 'fixed',
): string => {
    const mapping: Record<BackgroundAttachmentType, string> = {
        fixed: 'bg-fixed',
        local: 'bg-local',
        scroll: 'bg-scroll',
    }

    return mapping[attachment] || mapping['fixed']
}

export const transformBackgroundPosition = (
    position: BackgroundPositionType = 'center center',
): string => {
    const mapping: Record<BackgroundPositionType, string> = {
        'top left': 'bg-left-top',
        'top center': 'bg-top',
        'top right': 'bg-right-top',
        'center left': 'bg-left',
        'center center': 'bg-center',
        'center right': 'bg-right',
        'bottom left': 'bg-left-bottom',
        'bottom center': 'bg-bottom',
        'bottom right': 'bg-right-bottom',
    }

    return mapping[position] || mapping['center center']
}

export const transformHorizontalAlign = (
    horizontalAlign: HorizontalAlignType = 'center',
): string => {
    const mapping: Record<HorizontalAlignType, string> = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }

    return mapping[horizontalAlign] || mapping['center']
}

export const transformVerticalAlign = (
    verticalAlign: VerticalAlignType = 'middle',
): string => {
    const mapping: Record<VerticalAlignType, string> = {
        top: 'items-start',
        middle: 'items-center',
        bottom: 'items-end',
    }

    return mapping[verticalAlign] || mapping['middle']
}
