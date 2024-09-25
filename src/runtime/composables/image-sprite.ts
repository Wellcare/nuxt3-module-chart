import { computed, isRef, useImage, type ComputedRef, type Ref } from '#imports'

interface SpriteOption {
    rows: number | ComputedRef<number> | Ref<number>
    cols: number | ComputedRef<number> | Ref<number>
}

interface ImageModifier {
    width?: number | ComputedRef<number> | Ref<number>
    height?: number | ComputedRef<number> | Ref<number>
}

export function useImageSprite(
    src: string | ComputedRef<string> | Ref<string>,
    options: SpriteOption,
    modifiers: ImageModifier,
) {
    const img = useImage()
    const computedSrc = isRef(src) ? src : computed(() => src)

    const { rows, cols } = options
    const { width, height } = modifiers
    const computedWidth = isRef(width) ? width : computed(() => width)
    const computedHeight = isRef(height) ? height : computed(() => height)
    const computedRows = isRef(rows) ? rows : computed(() => rows)
    const computedCols = isRef(cols) ? cols : computed(() => cols)
    const magnifier = 2
    const source = computed(() => {
        return img(computedSrc.value, {
            fit: 'inside',
            width: (computedWidth.value ?? 0) * magnifier,
            height: (computedHeight.value ?? 0) * magnifier,
            format: 'webp',
        })
    })

    const sprites = computed(() => {
        const styles: any = []

        for (let x = 0; x < computedRows.value; x++) {
            for (let y = 0; y < computedCols.value; y++) {
                const cellW = (computedWidth.value ?? 0) / computedCols.value
                const cellH = (computedHeight.value ?? 0) / computedRows.value
                const xC = y * cellW // Swapped x and y for proper grid calculation
                const yC = x * cellH // Swapped x and y for proper grid calculation
                styles.push({
                    width: cellW,
                    height: cellH,
                    url: source.value,
                    positions: [Math.round(xC), Math.round(yC)],
                    style: [
                        `width: ${cellW}px`,
                        `height: ${cellH}px`,
                        `background-image: url('${source.value}')`,
                        `background-position: -${Math.round(
                            xC,
                        )}px -${Math.round(yC)}px`,
                        `background-size: ${(computedWidth.value ?? 0)}px ${computedHeight.value}px`,
                    ].join('; '),
                })
            }
        }
        return styles
    })

    return {
        sprites,
        source,
    }
}
