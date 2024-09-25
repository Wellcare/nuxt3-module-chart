declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void
        dataLayer: any[]
        YT: {
            Player: any
            PlayerState: {
                PLAYING: number
                PAUSED: number
                ENDED: number
                UNSTARTED: number
                BUFFERING: number
            }
        }
    }
}
export {}
