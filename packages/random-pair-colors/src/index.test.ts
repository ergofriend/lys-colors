import { describe, expect, it } from 'vitest'
import { randomHex } from './color'
import { generateRandomPairColor } from './index'
import { isValidRandomPairColor } from './validate'

describe('generateRandomPairColor', () => {
	it('should return a pair of colors', () => {
		const result = generateRandomPairColor()
		expect(isValidRandomPairColor(result)).toBe(true)
	})

	it('should return a pair of colors with custom config', () => {
		const textColor = randomHex()
		const result = generateRandomPairColor({
			textColor,
		})
		expect(result.textColor).toBe(textColor)
		expect(isValidRandomPairColor(result)).toBe(true)
	})
})
