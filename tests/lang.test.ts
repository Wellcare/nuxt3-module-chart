import { describe, expect, it } from 'vitest'
import EN from '../src/runtime/lang/en.json'
import VI from '../src/runtime/lang/vi.json'

type TranslationValue = string | { [key: string]: string }
type TranslationObject = Record<string, TranslationValue>

const compareLanguageObjects = (
  en: TranslationObject,
  vi: TranslationObject,
): boolean => {
  const flattenObject = (obj: TranslationObject, prefix = ''): Record<string, string> => {
    return Object.entries(obj).reduce((acc: Record<string, string>, [key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'string') {
        acc[newKey] = value
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, flattenObject(value as Record<string, string>, newKey))
      }
      return acc
    }, {})
  }

  const flatEn = flattenObject(en)
  const flatVi = flattenObject(vi)

  const missingKeysInEnglish: string[] = Object.keys(flatVi).filter(
    (key) => !(key in flatEn),
  )
  const missingKeysInVietnamese: string[] = Object.keys(flatEn).filter(
    (key) => !(key in flatVi),
  )

  if (missingKeysInEnglish.length > 0) {
    console.error('--------------------------')
    console.error('Missing keys in en.json:')
    missingKeysInEnglish.forEach((key) => {
      console.error(`- Missing key: ${key}`)
    })
  }

  if (missingKeysInVietnamese.length > 0) {
    console.error('--------------------------')
    console.error('Missing keys in vi.json:')
    missingKeysInVietnamese.forEach((key) => {
      console.error(`- Missing key: ${key}`)
    })
  }

  return (
    missingKeysInEnglish.length === 0 &&
    missingKeysInVietnamese.length === 0
  )
}

describe('i18n lang files', async () => {
  const getFlatKeys = (obj: TranslationObject): string[] => {
    const flatObj = Object.entries(obj).reduce((acc: string[], [key, value]) => {
      if (typeof value === 'string') {
        acc.push(key)
      } else if (typeof value === 'object' && value !== null) {
        acc.push(...Object.keys(value as Record<string, string>).map(k => `${key}.${k}`))
      }
      return acc
    }, [])
    return flatObj.sort()
  }

  const enKeys = getFlatKeys(EN)

  it('should have all keys translated', () => {
    expect(compareLanguageObjects(EN, VI)).toBe(true)
  })

  it('should have keys as a-z or 0-9 hyphen or colon', () => {
    enKeys.forEach((key) => {
      const keyParts = key.split('.')
      keyParts.forEach(part => {
        expect(part).toMatch(/^[a-z0-9:-]+$/)
      })
    })
  })
})
