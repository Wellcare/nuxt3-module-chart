export const toPascalCase = function (input?: string) {
    return (
        input
            // Replace hyphens, underscores, and spaces with a single space
            .replace(/[-_ ]+/g, ' ')
            // Split the string into words
            .split(' ')
            // Capitalize the first letter of each word and join them together
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
    )
}

// import { type ComputedRef, type Ref, computed, isRef, ref } from '#imports'

// export const useString = function (
//     str?: string | Ref<string> | ComputedRef<string>,
// ) {
//     const computedInput = isRef(str) ? str : computed(() => str)
//     const output = ref(str)
//     const toPascalCase = () => toPascalCase(transformPascal.value)
//     return { toPascalCase, output }
// }
