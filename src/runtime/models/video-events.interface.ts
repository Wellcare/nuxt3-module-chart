export type VideoEventType =
    | 'play'
    | 'pause'
    | 'ended'
    | 'loadeddata'
    | 'waiting'
    | 'playing'
    | 'timeupdate'
    | 'canplay'
    | 'canplaythrough'
    | 'statechanged'
    | 'playerReady'
    | 'stateChange'
    | 'error'
    | 'unstarted'

export interface IVideoEvent {
    type: VideoEventType
}

export const VIDEO_EVENTS: VideoEventType[] = [
    'play',
    'pause',
    'ended',
    'loadeddata',
    'waiting',
    'playing',
    'timeupdate',
    'canplay',
    'canplaythrough',
    'statechanged',
    'playerReady',
    'stateChange',
    'error',
]

export interface VideoData {
    currentTime: number
    duration: number
    videoUrl: string
    videoTitle: string
    event: string
}
