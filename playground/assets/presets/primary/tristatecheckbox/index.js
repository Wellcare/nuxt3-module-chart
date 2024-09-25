export default {
    root: {
        class: [
            'cursor-pointer inline-flex relative select-none align-bottom',
            'w-6 h-6',
        ],
    },
    input: {
        class: [
            'peer',

            // Size
            'w-full ',
            'h-full',

            // Position
            'absolute',
            'top-0 left-0',
            'z-10',

            // Spacing
            'p-0',
            'm-0',

            // Shape
            'opacity-0',
            'rounded-md',
            'outline-none',
            'border-2 border-surface-200 dark:border-surface-700',

            // Misc
            'appearance-none',
            'cursor-pointer',
        ],
    },
    box: ({ props, context }) => ({
        class: [
            // Alignment
            'flex',
            'items-center',
            'justify-center',

            // Size
            'w-6',
            'h-6',

            // Shape
            'rounded-md',
            'border-2',

            // Colors
            {
                'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900':
                    !context.active && !props.invalid,
                'border-primary bg-primary dark:border-primary dark:bg-primary':
                    context.active,
            },

            // Invalid State
            { 'border-red-500 dark:border-red-400': props.invalid },

            // States
            {
                'peer-hover:border-primary dark:peer-hover:border-primary':
                    !props.disabled && !context.active && !props.invalid,
                'peer-hover:bg-primary dark:peer-hover:bg-primary peer-hover:border-primary dark:peer-hover:border-primary':
                    !props.disabled && context.active,
                'peer-focus-visible:border-primary dark:peer-focus-visible:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 dark:peer-focus-visible:ring-primary/20':
                    !props.disabled,
                'cursor-default opacity-60': props.disabled,
            },

            // Transitions
            'transition-colors',
            'duration-200',
        ],
    }),
    checkicon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200',
        ],
    },
    uncheckicon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200',
        ],
    },
}
