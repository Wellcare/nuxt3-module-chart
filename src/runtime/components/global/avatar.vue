<script lang="ts" setup>
import { computed, useImage } from '#imports'

const props = defineProps({
    url: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: 'Female',
    },
    fallback: {
        type: String,
        default: null,
    },
})
const img = useImage()

const src = computed(() => {
    if (props.url) {
        const avatarUrl = img(
            props.url,
            { format: 'webp' },
            {
                preset: 'avatar',
            },
        )
        return avatarUrl
    } else {
        const femaleAvatar = img(
            'https://storage.googleapis.com/cms-gallery/61e64af5003d0a9e5b2ed091/8ca19fbe-f6ff-5c84-9a7f-44ab52ce7cdf.png',
            { width: 216, format: 'webp' },
        )

        const maleAvatar = img(
            'https://storage.googleapis.com/cms-gallery/61e64af4a5fbe579b6491310/82360227-a55b-5450-a884-41a082398a49.png',
            { width: 221, format: 'webp' },
        )

        switch (props.gender.substring(0).toUpperCase()) {
            case 'F':
                return femaleAvatar
            case 'M':
                return maleAvatar
            default:
                return props.fallback || femaleAvatar // Fallback to femaleAvatar if no fallback is provided
        }
    }
})
</script>

<template>
    <Avatar
        shape="circle"
        size="normal"
        v-bind="$attrs"
        :image="src"
        alt="profile image" />
</template>
