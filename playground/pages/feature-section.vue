<script lang="ts" setup>
import { ref } from '#imports'

const layouts = [
    'Default feature list',
    'Image with feature list and CTAs',
    'Feature list with CTAs',
    'Feature list with icons',
    'Feature icons and CTA',
    'Description with feature list icons',
    'Feature list cards',
    'Alternate image with feature list',
    'Comparison cards',
    'Feature section with rounded icons',
]

const alignments = ['left', 'center', 'right']

const blocks = [
    'background-image',
    'overlay',
    'above',
    'title',
    'sub-title',
    'under',
]

const selectedLayout = ref(layouts[0])
const selectedBlocks = ref(blocks)
const selectedAlignment = ref(alignments[1])

// const items1 = [
//     {
//         image: {
//             src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
//             alt: 'Manulife',
//         },
//     },
//     {
//         image: {
//             src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
//             alt: 'Wellcare',
//         },
//     },
// ]

const items2 = [
    {
        data: '16.7',
        unit: 'năm',
        description: 'Số năm kinh nghiệm bình quân',
    },
    {
        data: '13.7',
        unit: 'phút',
        description: 'Thời lượng tư vấn bình quân / lần',
    },
    {
        data: '40',
        unit: 'chuyên khoa',
        description: 'Đáp ứng mọi nhu cầu tư vấn sức khỏe trực tuyến',
    },
    {
        data: '100',
        unit: 'bác sĩ',
        description:
            'Wellcare tuyển chọn bác sĩ có kinh nghiệm & năng lực xử lý tốt các tình huống khám từ xa',
    },
]
</script>

<template>
    <div class="mt-16">
        <div class="grid grid-cols-2 gap-2 mb-4">
            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Layout
                </div>
                <Dropdown
                    v-model="selectedLayout"
                    :options="layouts"
                    placeholder="Select a layout"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Alignment
                </div>
                <Dropdown
                    v-model="selectedAlignment"
                    :options="alignments"
                    placeholder="Select a alignment"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>
        </div>

        <Panel header="Option">
            <MultiSelect
                v-model="selectedBlocks"
                display="chip"
                :options="blocks"
                placeholder="Select blocks"
                class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
        </Panel>

        <WFeatureSection
            class="h-[900px] md:h-[700px]"
            :blocks="[
                'background-image',
                'overlay',
                'title',
                'sub-title',
                'under',
            ]"
            :background-image="{
                src: 'https://static.tildacdn.com/tild3765-6334-4331-b366-653361303037/erikheddema1380.jpg',
                alt: 'feature',
            }"
            title="Đội ngũ bác sĩ cho bạn gửi gắm niềm tin"
            sub-title="Làm nên sự khác biệt của Wellcare chính là các bác sĩ cùng chia sẻ một niềm tin... Rằng: Y tế và Chăm sóc sức khỏe phải đồng thời được diễn ra ở TRONG và NGOÀI khuôn khổ bệnh viện & phòng mạch; và rằng: BỆNH NHÂN mới chính là trung tâm của hệ thống y tế."
            :items="items2">
            <template #default="{ feature }">
                <div
                    class="w-60 sm:w-64 md:w-80 lg:w-[500px] mx-4 flex flex-col text-white text-center">
                    <div class="flex items-end justify-center">
                        <div
                            class="text-5xl sm:text-6xl lg:text-7xl font-semibold">
                            {{ feature.data }}
                        </div>
                        <div class="text-base sm:text-lg lg:text-xl">
                            {{ feature.unit }}
                        </div>
                    </div>
                    <Divider type="solid" />
                    <div
                        class="sm:min-h-[84px] lg:min-h-14 text-base sm:text-lg lg:text-xl">
                        {{ feature.description }}
                    </div>
                </div>
            </template>
        </WFeatureSection>

        <!-- <WFeatureSection
            class="h-[300px]"
            :layout="selectedLayout"
            :blocks="selectedBlocks"
            sub-title="Đối tác, khách hàng doanh nghiệp"
            :text-alignment="selectedAlignment" /> -->
    </div>
</template>
