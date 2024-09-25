// internal/flowbite/hero-section

import { it, expect, describe } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import TheComponent from '../../src/runtime/components/global/sheet.vue'

describe('CustomHeading', () => {
    it('renders h1 when tag is provided as "h1"', async () => {
        await renderSuspended(TheComponent, {
            props: {
                tag: 'h1',
            },
            slots: {
                default: () => 'Test Content',
            },
        })
        expect(screen.getByText('Test Content').tagName).toBe('H1')
    })

    it('renders h2 when tag is provided as "h2"', async () => {
        await renderSuspended(TheComponent, {
            props: {
                tag: 'h2',
            },
            slots: {
                default: () => 'Test Content',
            },
        })
        expect(screen.getByText('Test Content').tagName).toBe('H2')
    })

    it('renders h3 when tag is provided as "h3"', async () => {
        await renderSuspended(TheComponent, {
            props: {
                tag: 'h3',
            },
            slots: {
                default: () => 'Test Content',
            },
        })
        expect(screen.getByText('Test Content').tagName).toBe('H3')
    })
})
