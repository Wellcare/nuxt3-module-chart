import { joinURL, withoutLeadingSlash, encodeQueryItem, parseURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator({
    keyMap: {
        format: 'type',
        blur: 'sigma',
    },
    valueMap: {},
    joinWith: '&',
    formatter: (key, val) => {
        return encodeQueryItem(key, val)
    },
})

const defaultModifiers = {}

export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL = '/' } = {},
    { options = { format: ['webp'] } as any },
) => {
    let url = src

    // support alias
    Object.keys(options.alias)
        .filter((key) => url.startsWith(withoutLeadingSlash(key)))
        .forEach((key) => {
            url = url.replace(withoutLeadingSlash(key), options.alias[key])
        })
    // validate domains

    if (!options.domains.includes(parseURL(url).host)) return { url }

    let imageOperation = 'resize' // default without modifier
    // process fit
    if (modifiers['fit']) {
        switch (modifiers['fit']) {
            case 'cover':
                // Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit
                imageOperation = 'crop'
                break
            case 'contain':
                // Preserving aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.
                if (!modifiers['extend']) modifiers['extend'] = 'background' // black, copy, mirror, white, lastpixel or background
                if (!modifiers['background']) modifiers['background'] = '0,0,0'
                break
            case 'fill':
                //  Ignore the aspect ratio of the input and stretch to both provided dimensions.
                imageOperation = 'convert'
                if (!modifiers['type'])
                    modifiers['type'] = options.format[0] || 'webp'
                break
            case 'inside':
                // Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
                imageOperation = 'enlarge'
                break
            case 'outside':
                //  Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
                imageOperation = 'fit'
                break
            default:
                imageOperation = 'fit'
        }
        delete modifiers['fit']
    }
    // process quality
    if (modifiers['quality']) {
        modifiers['type'] = 'jpeg'
    }

    const mergeModifiers = { ...defaultModifiers, ...modifiers }

    const operations = operationsGenerator(mergeModifiers as any)

    // image processing operations
    url = operations
        ? joinURL(baseURL, imageOperation) + `?${operations}&url=${url}`
        : joinURL(baseURL, 'convert') + `?type=${options.format[0]}&url=${url}`

    return {
        url,
    }
}
// export const validateDomains = true
// export const supportsAlias = true
