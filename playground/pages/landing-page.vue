<script lang="ts" setup>
const partners = [
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
    {
        src: 'https://coloropedia.com/wp-content/uploads/2021/10/Manulife.png',
        alt: 'Manulife',
    },
    {
        src: 'https://storage.googleapis.com/cms-gallery/61e64af5a5fbe50a4a491312/711a22ef-b263-4512-abb7-9a946090db34.png',
        alt: 'Wellcare',
    },
]

const features = [
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

const products: any = [
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'Bác sĩ riêng',
        subTitle: 'Cho người ta thương yêu',
    },
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'Khám từ xa',
        subTitle: 'Khám gần khám xa, cốt là khám kỹ!',
    },
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'EduHub',
        subTitle: 'Hỏi kiến thức, Healthtalk, Video trainings',
    },
]

const plans = [
    {
        name: 'Beginner',
        price: 'Free',
        per: 'forever',
        benefits: ['Use your superpowers', 'Key blocks collection'],
        actionName: 'Join now',
        descriptionBottom: '$159 USD per month, paid annually'
    },
    {
        name: 'Pro',
        price: '$100',
        per: 'per month',
        benefits: [
            'Entire collection of blocks',
            'Custom domain',
            'Google Analytics',
            'Favicon',
            'Custom fonts',
        ],
        actionName: 'Join now',
        highlightName: 'Most popular',
        descriptionBottom: '$159 USD per month, paid annually'
    },
    {
        name: 'Enterprise',
        price: '$2000',
        per: 'per year',
        benefits: [
            'All superpowers',
            'Source code export',
            'White label',
            'Premium support',
        ],
        actionName: 'Join now',
        descriptionBottom: '$159 USD per month, paid annually'
    },
]

const providers = [
    {
        title: 'Nguyễn Trí Đoàn',
        image: {
            src: 'https://storage.googleapis.com/cms-gallery/61e64aefe0ab54e82fc38eef/e0b8dfd9-a409-434a-beef-edaa7accb800.jpg',
            alt: 'Nguyễn Trí Đoàn',
        },
        description:
            'Bs Trí Đoàn là một bác sĩ Nhi nổi tiếng với phong cách tư vấn bệnh không lạm dụng thuốc và xét nghiệm, dựa trên y học chứng cứ. Cách tiếp cận vấn đề đặc biệt của bác sĩ được tóm lược trong cuốn “Để con được ốm” và đã truyền cảm hứng cho hàng triệu phụ huynh và hàng ngàn bác sĩ khác thực hành theo.',
    },
    {
        title: 'Trương Hữu Khanh',
        image: {
            src: 'https://storage.googleapis.com/wellcare-user-profile/614a8075af355fbb79033ed5/4o57dnx9szgc5afo.jpg',
            alt: 'Trương Hữu Khanh',
        },
        description:
            'Bs Khanh là một người có tầm ảnh hưởng lớn trong ngành y, đặc biệt về bệnh truyền nhiễm. Được biết tới với một phong cách mộc mạc và nhân hậu, bác sĩ dành nhiều thời gian của mình để đào tạo sức khỏe cộng đồng thông qua trang “Hỏi bác sĩ Nhi đồng” với gần 300 ngàn người theo dõi.',
    },
    {
        title: 'Phan Quốc Bảo',
        image: {
            src: 'https://storage.googleapis.com/wellcare-user-profile/614a8075af355ff8a2033ed4/68d26a97-b09e-514c-a9c0-5370dd5adbee.jpeg',
            alt: 'Phan Quốc Bảo',
        },
        description:
            'Bác sĩ công tác tại Bệnh viện Đại học Y Dược Tp.HCM, có kinh nghiệm trên 20 năm trong tư vấn và điều trị các bệnh lý Tai Mũi Họng.',
    },
    {
        title: 'Trần Thị Hồng An',
        image: {
            src: 'https://storage.googleapis.com/cms-gallery/61e64af1e0ab549317c38ef5/453b9a52-94d6-46d9-86ca-9fd2777f6ba9.png',
            alt: 'Trần Thị Hồng An',
        },
        description:
            'Thạc sĩ Y khoa chuyên ngành Nội tổng quát, có gần 30 năm kinh nghiệm trong nghề. Hoàn thành khóa học tại Sanford Medical Center bang South Dakota Hoa Kỳ về: Nội Khoa, Hô hấp, Khớp, Cấp cứu.',
    },
]

const handleClickPlan = (item: any) => {
    console.log('🚀 ~ handleClick ~ item:', item)
}

const partnersWithGrayscale = ref(
    partners.map((partner) => ({ ...partner, grayscale: 100 })),
)
</script>

<template>
    <div>
        <WHeroSection
            class="h-screen"
            :blocks="['background-image', 'overlay', 'title', 'sub-title']"
            :background-image="{
                src: 'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
                alt: '12A1',
            }"
            title="Sức khỏe"
            sub-title="Là Tài sản quý giá nhất"
            seo-title-tag="h1" />

        <WPartnerSection
            class="h-[500px]"
            :blocks="['title', 'sub-title', 'under']"
            title="Tự hào là đối tác của thương hiệu hàng đầu"
            sub-title="Đối tác, khách hàng doanh nghiệp"
            :items="partnersWithGrayscale"
            small-header
            slide-item>
            <template #default="{ partner }">
                <Image
                    class="hover:cursor-pointer"
                    :src="partner.src"
                    :alt="partner.alt"
                    width="150"
                    height="100"
                    :grayscale="partner.grayscale"
                    @mouseover="partner.grayscale = 0"
                    @mouseout="partner.grayscale = 100" />
            </template>
        </WPartnerSection>

        <WFeatureSection
            class="h-[1000px] sm:h-[800px] md:h-[700px]"
            :blocks="[
                'background-image',
                'overlay',
                'title',
                'sub-title',
                'under',
            ]"
            :background-image="{
                src: 'https://storage.googleapis.com/cms-gallery/66384b1e97e48f5ee5acdc6b/danh-sach-bac-si-5.png',
                alt: 'feature',
            }"
            title="Đội ngũ bác sĩ cho bạn gửi gắm niềm tin"
            sub-title="Làm nên sự khác biệt của Wellcare chính là các bác sĩ cùng chia sẻ một niềm tin... Rằng: Y tế và Chăm sóc sức khỏe phải đồng thời được diễn ra ở TRONG và NGOÀI khuôn khổ bệnh viện & phòng mạch; và rằng: BỆNH NHÂN mới chính là trung tâm của hệ thống y tế."
            :items="features"
            small-header
            wrap-item>
            <template #default="{ feature }">
                <div
                    :class="`
                        w-60
                        min-h-40
                        sm:w-[42%]
                        sm:min-h-[180px]
                        md:w-[44%]
                        lg:min-h-[196px]
                        2xl:w-[20%]
                        2xl:min-h-[224px]
                        mx-4
                        flex
                        flex-col
                        text-center
                        text-white
                    `">
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

        <WCtaSection
            class="py-8"
            :blocks="['even-reverse', 'title']"
            title="Dịch vụ y tế từ xa"
            :items="products" />

        <WPricingTable
            :blocks="['title', 'sub-title']"
            title="Our Plans"
            sub-title="Your website will look brilliant as well as will be functional"
            :items="plans"
            mode="highlight"
            :button-passthrough="{
                root: {},
            }"
            @on-click="handleClickPlan" />

        <WMemberSection
            class="h-[1640px] sm:h-[980px] md:h-[900px]"
            :blocks="['title', 'sub-title', 'under']"
            title="Bác sĩ nổi bật"
            sub-title="Niềm tự hào của Wellcare"
            :items="providers"
            small-header
            wrap-item>
            <template #default="{ member }">
                <div
                    :class="`
                        min-h-[300px]
                        sm:min-h-[400px]
                        md:min-h-[380px]
                        lg:min-h-[344px]
                        sm:max-w-[42%]
                        md:max-w-[44%]
                        mt-6
                        first:mt-0
                        sm:mt-0
                        mx-4
                        flex
                        flex-col
                        items-center
                        
                    `">
                    <Image
                        :class="`
                            overflow-hidden
                            rounded-full
                            border
                            border-stone-200
                            dark:border-stone-500
                            hover:cursor-pointer
                            hover:border-teal-500
                            dark:hover:border-teal-500
                        `"
                        :src="member.image.src"
                        :alt="member.title"
                        width="200"
                        height="200"
                        image-class="transition ease-linear hover:scale-105" />
                    <h2
                        class="py-2 font-semibold text-xl text-dark dark:text-white">
                        {{ member.title }}
                    </h2>
                    <p class="text-sm text-stone-500 dark:text-stone-400">
                        {{ member.description }}
                    </p>
                </div>
            </template>
        </WMemberSection>
    </div>
</template>
