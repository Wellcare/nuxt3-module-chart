import {
    addToLastList,
    adaptNotionBlocks,
} from '../../src/runtime/composables/notion-block-adapter'
import { describe, it, expect } from 'vitest'

describe('addToLastList', () => {
    it('should add block to a new list if type does not match', () => {
        const type = 'bulleted_list_item'
        const accumulator = []
        const block = { bulleted_list_item: { content: 'test' } }
        addToLastList(type, accumulator, block)
        expect(accumulator).toEqual([
            { type, bulleted_list_item: [block.bulleted_list_item] },
        ])
    })

    it('should add block to the last list if type matches', () => {
        const type = 'bulleted_list_item'
        const accumulator = [{ type, bulleted_list_item: [] }]
        const block = { bulleted_list_item: { content: 'test' } }
        addToLastList(type, accumulator, block)
        expect(accumulator).toEqual([
            { type, bulleted_list_item: [block.bulleted_list_item] },
        ])
    })
})

describe('adaptNotionBlocks', () => {
    it('should adapt notion blocks correctly', () => {
        const input = [
            { type: 'paragraph', content: 'paragraph' },
            {
                type: 'bulleted_list_item',
                bulleted_list_item: { content: 'item 1' },
            },
            {
                type: 'bulleted_list_item',
                bulleted_list_item: { content: 'item 2' },
            },
        ]
        const output = adaptNotionBlocks(input)
        expect(output).toEqual([
            { type: 'paragraph', content: 'paragraph' },
            {
                type: 'bulleted_list_item',
                bulleted_list_item: [
                    { content: 'item 1' },
                    { content: 'item 2' },
                ],
            },
        ])
    })

    it('should handle empty input', () => {
        const input = []
        const output = adaptNotionBlocks(input)
        expect(output).toEqual([])
    })
})
