import { onMounted, reactive, ref } from '#imports'

interface Breakpoint {
    w: number
    h: number
    is: string
    isMobile: boolean
}

interface Browser {
    deviceIsIphoneOrIpodOrIpad: boolean
    isSafariMobile: boolean
    isSafariDesktop: boolean
    isSafari: boolean
    isOnlySafari: boolean
    isSafariAndSocialNetwork: boolean
    isInstagram: boolean
    isFacebook: boolean
    isSocialNetwork: boolean
    isChrome: boolean
}

interface Display {
    breakpoint: Breakpoint
    browser: Browser
}

const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

const display = reactive<Display>({
    breakpoint: {
        w: 0,
        h: 0,
        is: 'xs',
        isMobile: false,
    },
    browser: {
        deviceIsIphoneOrIpodOrIpad: false,
        isSafariMobile: false,
        isSafariDesktop: false,
        isSafari: false,
        isOnlySafari: false,
        isSafariAndSocialNetwork: false,
        isInstagram: false,
        isFacebook: false,
        isSocialNetwork: false,
        isChrome: false,
    },
})

const mobile = (val: number) => val < screens.sm
const sm = (val: number) => val >= screens.sm && val < screens.md
const md = (val: number) => val >= screens.md && val < screens.lg
const lg = (val: number) => val >= screens.lg && val < screens.xl
const xl = (val: number) => val >= screens.xl && val < screens['2xl']
const _2xl = (val: number) => val >= screens['2xl']

const getBreakpoint = (w: number) => {
    if (mobile(w)) return 'mobile'
    else if (sm(w)) return 'sm'
    else if (md(w)) return 'md'
    else if (lg(w)) return 'lg'
    else if (xl(w)) return 'xl'
    else if (_2xl(w)) return '2xl'
    return 'all'
}

const setBreakpoint = () => {
    const getResize = getBreakpoint(window.innerWidth)

    display.breakpoint.w = window.innerWidth
    display.breakpoint.h = window.innerHeight
    display.breakpoint.is = getResize
    display.breakpoint.isMobile = getResize === 'mobile'
}

const setBrowser = (userAgent: string) => {
    display.browser.deviceIsIphoneOrIpodOrIpad =
        /(i[PSa-z\s]+);.*?CPU\s([OSPa-z\s]+(?:[\d_]+|;))/g.test(userAgent)
    display.browser.isSafariMobile =
        /version\/([\w.]+) .*mobile\/\w+ safari/i.test(userAgent)
    display.browser.isSafariDesktop =
        /version\/([\w.]+) .*(mobile?safari|safari)/i.test(userAgent)
    display.browser.isInstagram = /(chromium|instagram)[/ ]([-\w.]+)/i.test(
        userAgent,
    )
    display.browser.isFacebook =
        /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w.]+);)/i.test(
            userAgent,
        )
    display.browser.isSafari =
        display.browser.isSafariMobile || display.browser.isSafariDesktop
    display.browser.isOnlySafari =
        display.browser.isSafari && !display.browser.isSocialNetwork
    display.browser.isSocialNetwork =
        display.browser.isInstagram || display.browser.isFacebook
    display.browser.isSafariAndSocialNetwork =
        display.browser.isOnlySafari || display.browser.isSocialNetwork
    display.browser.isChrome = /\b(?:Chrome|CriOS)[/ ]([\w.]+)/i.test(userAgent)
}

export const useDisplay = () => {
    onMounted(() => {
        if (process.client) {
            const userAgent = ref(window.navigator.userAgent)

            setBreakpoint()

            setBrowser(userAgent.value)

            window.addEventListener('resize', setBreakpoint)
        }
    })

    return {
        display,
    }
}
