<script setup lang="ts">
import { ref } from 'vue'

const allBlocks = [
    'copyright',
    'brand',
    'brand-social-links',
    'sitemap',
    'appstores',
    'contact',
    'certificates',
].map((i) => ({ name: i, code: i }))
const selectedBlocks = ref(allBlocks)
const sitemapLinks = [
    {
        label: 'For business',
        isSection: true,
        items: [
            {
                label: 'Remote Examination Benefits for Employees',
                route: '/',
            },
            {
                label: 'EAP Psychological Support Program',
                route: '/',
            },
            {
                label: 'Mental Health Screening',
                route: '/',
            },
            {
                label: 'HealthTalk',
                route: '/',
            },
            {
                label: 'Business Package',
                route: '/',
            },
        ],
    },
    {
        label: 'ABOUT US',
        isSection: true,
        items: [
            {
                label: 'Wellcare Story',
                route: '/',
            },
            {
                label: 'News',
                route: '/',
            },
            {
                label: 'Media',
                route: '/',
            },
            {
                label: 'Customer Testimonials',
                route: '/',
            },
            {
                label: 'Investors',
                route: '/',
            },
        ],
    },

    {
        label: 'SUPPORT',
        isSection: true,
        items: [
            {
                label: 'Frequently Asked Questions',
                route: '/',
            },
            {
                label: 'Contact Us',
                route: '/',
            },
            {
                label: 'Privacy Policy',
                route: '/',
            },
            {
                label: 'Terms of Service',
                route: '/',
            },
        ],
    },
    {
        label: 'FOR PATIENTS',
        isSection: true,
        items: [
            {
                label: 'Services',
                route: '/',
            },
            {
                label: 'Membership Program',
                route: '/',
            },
            {
                label: 'Healthy Living Blog',
                route: '/',
            },
        ],
    },
]
const socialLinks = [
    {
        icon: 'pi pi-facebook',
        route: 'https://facebook.com/wellcare',
    },
    {
        icon: 'pi pi-youtube',
        route: 'https://youtube.com/Wellcare',
    },
]

const appstores = [
    {
        icon: 'https://wellcare-vn.mhealthvn.com/images/download/en-app-store-badge.svg',
        label: 'AppStore',
        route: 'https://apple.com',
    },
    {
        icon: 'https://wellcare-vn.mhealthvn.com/images/download/en-google-play-badge.png',
        label: 'Playstore',
        route: 'https://google.com',
    },
]
const certificates = [
    {
        icon: 'https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png',
        label: 'TradeNotices',
        route: 'http://online.gov.vn/Home/WebDetails/17663?AspxAutoDetectCookieSupport=1',
    },
    {
        icon: 'https://www.dmca.com/img/dmca-website-logo-2022.png',
        label: 'DMCA',
        route: 'https://www.dmca.com/Protection/Status.aspx?ID=35164a4c-645c-418e-a444-07a90e495722&refurl=https://wellcare.vn/download',
    },
]

const contact = [
    {
        icon: 'pi pi-phone',
        label: '+84366905905',
    },
    {
        icon: 'pi pi-envelope',
        label: 'xinchao@wellcare.vn',
    },
    {
        icon: 'pi pi-map-marker',
        label: 'LA008 Lexington, 67 Mai Chi Tho, Vietnam',
    },
]
const description =
    'Chúng tôi giúp bạn duy trì một lối sống lành mạnh, và khi bạn cần tham vấn y tế, chúng tôi kết nối bạn với những bác sĩ chuyên khoa hàng đầu qua gọi thoại và gọi video.'
</script>

<template>
    <div>
        <Panel header="Option">
            <MultiSelect
                v-model="selectedBlocks"
                display="chip"
                :options="allBlocks"
                option-label="name"
                placeholder="Select Cities"
                class="md:w-20rem w-full" />
        </Panel>

        <WFooter
            year="2015"
            :sitemap-links="sitemapLinks"
            :social-links="socialLinks"
            brand-name="WELLCARE"
            :blocks="selectedBlocks.map((i) => i.name)"
            :brand-description="description"
            :appstores="appstores"
            :certificates="certificates"
            :contact="contact"
            brand-logo="https://play-lh.googleusercontent.com/AUherXUWkLae2gI959l-gP5fdxSzO0wvVLy8wSwXFpZfWfXbo9Cy7k1MQshFe4SGtA" />
    </div>
</template>
