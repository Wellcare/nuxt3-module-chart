import { ref, watch, type Ref, type ComputedRef } from '#imports'
import type { INotionBlock, BlockType } from '../models'

// Function to build tree structure from flat array
const buildTreeFromFlatArray = ({
    input,
    include,
}: {
    input: INotionBlock[]
    include: BlockType[]
}) => {
    // Object to store item mappings
    const map = {}
    // Array to store final tree structure
    const output = []

    // First pass to build the map
    input.forEach((item) => {
        // Initialize item in map with default values and children array
        map[item.id] = {
            ...item,
            isIncluded: false, // Default include status
            [item.type]: { ...item[item?.type], children: [] },
        }
    })

    // Second pass to populate children and mark includes
    input.forEach((item) => {
        // Check if the item has a parent
        const parentId = item?.parent?.block_id
        if (parentId) {
            // Retrieve parent item from map
            const parent = map[parentId]
            if (parent) {
                // Get the type of the parent item
                const type = parent.type
                // Check if the parent type should be included
                const childInclude = include.includes(type)
                // Add child item to parent's children array with include status
                parent[type].children.push({
                    ...map[item.id],
                    isIncluded: childInclude,
                })
            } else {
                output.push(map[item.id])
            }
        } else {
            // If item has no parent, add it to the output array
            output.push(map[item.id])
        }
    })

    // Return the final tree structure
    return output
}

// Example output:
// If input is
// [
//     { id: '1', type: 'paragraph', parent: null },
//     { id: '2', type: 'paragraph', parent: { block_id: '1' } },
// ]
// and include is ["paragraph"],
// the output would be:
// [
//     {
//         id: '1',
//         type: 'paragraph',
//         isIncluded: false,
//         paragraph: {
//             children: [{ id: '2', type: 'paragraph', isIncluded: true }],
//         },
//     },
// ]

// Function to add item to the last list
export const addToLastList = (type, accumulator, block) => {
    const [lastItem] = accumulator.slice(-1)
    if (!lastItem || lastItem.type !== type) {
        accumulator.push({ type, [type]: [block[type]] })
    } else {
        lastItem[type].push(block[type])
    }
}

// Function to adapt Notion blocks
export const adaptNotionBlocks = (input: INotionBlock[]): INotionBlock[] => {
    return input.reduce((accumulator: INotionBlock[], block: INotionBlock) => {
        switch (block.type) {
            case 'bulleted_list_item':
            case 'numbered_list_item':
                addToLastList(block.type, accumulator, block)
                break
            default:
                accumulator.push(block)
                break
        }
        return accumulator
    }, [])
}

export const useNotionBlockAdapter = (
    source: Ref<INotionBlock[]> | ComputedRef<INotionBlock[]>,
) => {
    const data = ref<INotionBlock[]>([])

    watch(
        source,
        (newValue) => {
            data.value = adaptNotionBlocks(
                buildTreeFromFlatArray({
                    input: newValue,
                    include: ['toggle', 'heading_1', 'heading_2', 'heading_3'],
                }),
            )
        },
        {
            immediate: true,
        },
    )

    return {
        data,
    }
}
