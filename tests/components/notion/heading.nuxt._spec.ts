// notion/heading.spec.ts
import { it, expect, describe } from 'vitest'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import Heading1 from '../../../src/runtime/components/global/notion/heading_1.vue'
import Heading2 from '../../../src/runtime/components/global/notion/heading_2.vue'
import Heading3 from '../../../src/runtime/components/global/notion/heading_3.vue'

describe('NotionHeading', async () => {
    it('renders heading_1 text correctly', async () => {
        await renderSuspended(Heading1, {
            props: {
                heading_1: {
                    rich_text: [{ type: 'text', plain_text: 'Test Heading 1' }],
                },
            },
        })
        expect(screen.getByText('Test Heading 1')).toBeDefined()
    })
    it('renders heading_2 text correctly', async () => {
        await renderSuspended(Heading2, {
            props: {
                heading_2: {
                    rich_text: [{ type: 'text', plain_text: 'Test Heading 2' }],
                },
            },
        })
        expect(screen.getByText('Test Heading 2')).toBeDefined()
    })
    it('renders heading_3 text correctly', async () => {
        await renderSuspended(Heading3, {
            props: {
                heading_3: {
                    rich_text: [{ type: 'text', plain_text: 'Test Heading 3' }],
                },
            },
        })
        expect(screen.getByText('Test Heading 3')).toBeDefined()
    })
})
