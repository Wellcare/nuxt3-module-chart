export interface MenuItem {
    key: string
    icon?: string
    isSection?: boolean
    description?: string
    subDescription?: string
    route: string
    children?: MenuItem[]
}

export const top: MenuItem[] = [
    {
        key: 'menu:home',
        route: '/',
    },
    {
        key: 'menu:dich-vu',
        route: '/dich-vu',
        children: [
            {
                key: 'menu:dich-vu:dich-vu-wellcare',
                route: '#',
                children: [
                    {
                        key: 'menu:dich-vu:kham-tu-xa',
                        route: '/dich-vu/kham-tu-xa',
                        description: 'menu:dich-vu:kham-tu-xa:description',
                        subDescription:
                            'Hỗ trợ giao thuốc, xét nghiệm tại nhà  ',
                    },
                    {
                        key: 'menu:dich-vu:healthgpt',
                        route: '/dich-vu/healthgpt',
                        description: 'menu:dich-vu:healthgpt:description',
                        subDescription: 'Trợ lý AI phản hồi tức thì 24/7',
                    },
                    {
                        key: 'menu:dich-vu:bac-si-rieng',
                        route: '/dich-vu/bac-si-rieng',
                        description: 'menu:dich-vu:bac-si-rieng:description',
                        subDescription:
                            'Trợ lý AI phản hồi kho trí thức được kiểm chứng',
                    },
                    {
                        key: 'menu:dich-vu:giai-dap-suc-khoe',
                        route: '/dich-vu/giai-dap-suc-khoe',
                        description:
                            'menu:dich-vu:giai-dap-suc-khoe:description',
                        subDescription: 'Đặt câu hỏi & nhận câu trả lời 24h',
                    },
                    {
                        key: 'menu:dich-vu:y-kien-chuyen-gia',
                        route: '/dich-vu/y-kien-chuyen-gia',
                        description:
                            'menu:dich-vu:y-kien-chuyen-gia:description',
                    },
                ],
            },
            {
                key: 'menu:dich-vu:membership',
                route: '#',
                children: [
                    {
                        key: 'menu:dich-vu:subscription',
                        route: '/dich-vu/dang-ky-thanh-vien',
                        description: 'menu:dich-vu:subscription:description',
                        subDescription: 'Ưu đãi phí và đặt quyền dịch vụ',
                    },
                    {
                        key: 'menu:dich-vu:doanh-nghiep',
                        route: '/doanh-nghiep',
                        description: 'menu:dich-vu:doanh-nghiep:description',
                        subDescription:
                            'Phúc lợi sức khoẻ cao cấp dành cho nhân viên, khách hàng',
                    },
                ],
            },
        ],
    },
]

export const sitemapLinks: MenuItem[] = [
    {
        key: 'menu:danh-cho-doanh-nghiep',
        route: '#',
        isSection: true,
        children: [
            {
                key: 'menu:phuc-loi-kham-tu-xa-cho-nhan-vien',
                route: '/doanh-nghiep/phuc-loi-kham-tu-xa-cho-nhan-vien',
            },
            {
                key: 'menu:chuong-trinh-ho-tro-tam-ly-eap',
                route: '/doanh-nghiep/chuong-trinh-ho-tro-tam-ly-eap',
            },
            {
                key: 'menu:tam-soat-suc-khoe-tinh-than',
                route: '/doanh-nghiep/tam-soat-suc-khoe-tinh-than',
            },
            {
                key: 'menu:healthtalk',
                route: '/doanh-nghiep/healthtalk',
            },
            {
                key: 'menu:goi-doanh-nghiep',
                route: '/doanh-nghiep/goi-doanh-nghiep',
            },
        ],
    },
    {
        key: 'menu:danh-cho-benh-nhan',
        route: '#',
        isSection: true,
        children: [
            {
                key: 'menu:dich-vu',
                route: '/dich-vu',
            },
            {
                key: 'menu:chuong-trinh-thanh-vien',
                route: '/thanh-vien',
            },
            {
                key: 'menu:blog-song-khoe',
                route: '/song-khoe',
            },
        ],
    },
    {
        key: 'menu:ho-tro',
        isSection: true,
        route: '#',
        children: [
            {
                key: 'menu:cau-hoi-thuong-gap',
                route: '/ho-tro/cau-hoi-thuong-gap',
            },
            {
                key: 'menu:lien-he-chung-toi',
                route: '/ho-tro/lien-he',
            },
            {
                key: 'menu:chinh-sach-bao-mat',
                route: '/ho-tro/chinh-sach-bao-mat',
            },
            {
                key: 'menu:dieu-khoan-su-dung',
                route: '/ho-tro/dieu-khoan-su-dung',
            },
        ],
    },
]

export const socialLinks: MenuItem[] = [
    {
        key: 'zalo',
        route: 'https://zalo.me/2727084330920973261',
    },
    {
        key: 'facebook',
        route: 'https://www.facebook.com/wellcare.vn',
    },
    {
        key: 'youtube',
        route: 'https://www.youtube.com/@WellcareVn',
    },
    {
        key: 'linkedin',
        route: 'https://www.linkedin.com/company/mhealth-technologies-jsc',
    },
]

export const aboutus: MenuItem[] = [
    {
        key: 'menu:doi-net-ve-chung-toi',
        route: '#',
        isSection: true,
        children: [
            {
                key: 'menu:cau-chuyen-wellcare',
                route: '/gioi-thieu/cau-chuyen-wellcare',
            },
            {
                key: 'menu:tin-tuc',
                route: '/tin-tuc',
            },
            {
                key: 'menu:truyen-thong',
                route: '/gioi-thieu/truyen-thong',
            },
            {
                key: 'menu:khach-hang-noi-ve-chung-toi',
                route: '/gioi-thieu/khach-hang-noi-ve-chung-toi',
            },
            {
                key: 'menu:nha-dau-tu',
                route: '/gioi-thieu/nha-dau-tu',
            },
        ],
    },
]

export const legalLinks = [
    {
        key: 'menu:about-us',
        route: '/about-us',
    },
    {
        key: 'menu:terms-and-conditions',
        route: '/terms-and-conditions',
    },
    {
        key: 'menu:privacy',
        route: '/privacy',
    },
]
export function useMenu() {
    return { aboutus, legalLinks, top, socialLinks, sitemapLinks }
}
