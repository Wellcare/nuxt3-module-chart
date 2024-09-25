import { ref, type Ref } from '#imports'
import type { VideoData } from '../models'

export default function useVideoEvents(data: VideoData) {
    const { currentTime, duration, videoUrl, videoTitle, event } = data

    const loggedMilestones: Ref<Record<string, boolean>> = ref({
        '10%': false,
        '25%': false,
        '50%': false,
        '75%': false,
    })
    const lastTimeUpdate: Ref<number> = ref(0)

    // VIDEO PLAYING
    const handleVideoProgress = () => {
        const percentComplete = (currentTime / duration) * 100
        if (
            percentComplete >= 10 &&
            percentComplete < 25 &&
            !loggedMilestones.value['10%']
        ) {
            sendProgressEvent('10%')
            loggedMilestones.value['10%'] = true
        } else if (
            percentComplete >= 25 &&
            percentComplete < 50 &&
            !loggedMilestones.value['25%']
        ) {
            sendProgressEvent('25%')
            loggedMilestones.value['25%'] = true
        } else if (
            percentComplete >= 50 &&
            percentComplete < 75 &&
            !loggedMilestones.value['50%']
        ) {
            sendProgressEvent('50%')
            loggedMilestones.value['50%'] = true
        } else if (
            percentComplete >= 75 &&
            percentComplete < 100 &&
            !loggedMilestones.value['75%']
        ) {
            sendProgressEvent('75%')
            loggedMilestones.value['75%'] = true
        }
    }

    const sendProgressEvent = (progress: string) => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'video_progress',
            video_title: videoTitle,
            video_progress: progress,
        })
    }

    // VIDEO COMPLETE
    const finishVideoPlay = () => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'video_complete',
            video_title: videoTitle,
            video_percent: (currentTime / duration) * 100,
        })
    }

    // RESET MILESTONES
    const resetMilestones = () => {
        loggedMilestones.value = {
            '10%': false,
            '25%': false,
            '50%': false,
            '75%': false,
        }
    }

    const handleVideoEvent = (eventName: string) => {
        switch (eventName) {
            case 'play':
            case 'playerReady':
                handleVideoStart()
                break
            case 'ended':
                finishVideoPlay()
                resetMilestones()
                break
            case 'timeupdate':
            case 'playing':
            case 'pause': {
                const now = Date.now()
                if (now - lastTimeUpdate.value > 1000) {
                    handleVideoProgress()
                    lastTimeUpdate.value = now
                }
                break
            }
            case 'seeked':
                resetMilestones()
                break
        }
    }

    const handleVideoStart = () => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'video_start',
            video_duration: duration,
            video_title: videoTitle,
            video_url: videoUrl,
        })
    }

    handleVideoEvent(event)
}
