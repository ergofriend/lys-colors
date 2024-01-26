import { describe, expect, it } from 'vitest'
import { randomHex } from './color'
import { getPairColor } from './index'
import { isValid } from './validate'

describe('getPairColor', () => {
	it('should return a pair of colors', () => {
		const result = getPairColor()
		expect(isValid(result)).toBe(true)
	})

	it('should return a pair of colors with custom config', () => {
		const textColor = randomHex()
		const result = getPairColor({
			textColor,
		})
		expect(result.textColor).toBe(textColor)
		expect(isValid(result)).toBe(true)
	})
})
