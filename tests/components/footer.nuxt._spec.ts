// footer.spec.ts

import { it, expect, describe } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import TheComponent from '../../src/runtime/components/global/footer.vue'

describe('footer', async () => {
    it('can render copyright block', async () => {
        // Render the component with only the copyright block
        await renderSuspended(TheComponent, {
            props: {
                blocks: ['copyright'],
                year: '2022', // You may need to adjust this according to your requirements
                brandName: 'Your Brand',
            },
        })

        // Assert that the copyright text is rendered
        expect(
            screen.getByText('All Rights Reserved', { exact: false }),
        ).toBeDefined()
    })

    it('can render brand block with logo and description', async () => {
        await renderSuspended(TheComponent, {
            props: {
                blocks: ['brand'],
                brandName: 'Your Brand',
                brandLogo: 'path/to/your/logo.png',
                brandDescription: 'Description of your brand',
            },
        })

        // expect(screen.getByText('Your Brand', { exact: false })).toBeDefined()
        expect(screen.getByAltText('Your Brand Logo')).toBeDefined()
        expect(
            screen.getByText('Description of your brand', { exact: false }),
        ).toBeDefined()
    })

    it('can render brand social links', async () => {
        // Render the component with only the brand social links block
        await renderSuspended(TheComponent, {
            props: {
                blocks: ['brand', 'brand-social-links'],
                socialLinks: [
                    {
                        icon: 'facebook',
                        label: 'Facebook',
                        route: 'facebook.com',
                    },
                    { icon: 'twitter', label: 'Twitter', route: 'twitter.com' },
                ],
            },
        })

        // Assert that social links are rendered
        expect(screen.getByLabelText('Facebook')).toBeDefined()
        expect(screen.getByLabelText('Twitter')).toBeDefined()
    })

    // it('can render sitemap block', async () => {
    //     // Render the component with only the sitemap block
    //     await renderSuspended(TheComponent, {
    //         props: {
    //             blocks: ['sitemap'],
    //             sitemapLinks: [
    //                 { label: 'Home', route: '/' },
    //                 { label: 'About', route: '/about' },
    //             ],
    //         },
    //     })

    //     // Assert that sitemap links are rendered
    //     expect(screen.getByText('Home')).toBeDefined()
    //     expect(screen.getByText('About')).toBeDefined()
    // })

    // it('can render appstores block', async () => {
    //     await renderSuspended(TheComponent, {
    //         props: {
    //             blocks: ['brand', 'appstores'],
    //             appstores: [
    //                 {
    //                     icon: 'https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg',
    //                     label: 'AppStore',
    //                     route: 'https://apple.com',
    //                 },
    //                 {
    //                     icon: 'https://www.svgrepo.com/show/303139/google-play-badge-logo.svg',
    //                     label: 'Playstore',
    //                     route: 'https://google.com',
    //                 },
    //             ],
    //         },
    //     })

    //     // Assert that appstore links are rendered
    //     expect(screen.getByAltText('AppStore', { exact: false })).toBeDefined()
    //     expect(screen.getByAltText('Playstore', { exact: false })).toBeDefined()
    // })

    it('can render contact block', async () => {
        // Render the component with only the contact block
        await renderSuspended(TheComponent, {
            props: {
                blocks: ['contact'],
                contact: [
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
                ],
            },
        })

        // Assert that contact links are rendered
        expect(screen.getByText('+84366905905', { exact: false })).toBeDefined()
        expect(
            screen.getByText('xinchao@wellcare.vn', { exact: false }),
        ).toBeDefined()
    })
})
