import { describe, expect, it } from 'vitest'
import { randomHex } from './color'
import { isValid } from './config'
import { getPairColor } from './index'

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