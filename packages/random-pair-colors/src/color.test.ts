import { describe, expect, it } from 'vitest'

import { _colorToHex, _randomRGB } from './color'

describe('_randomRGB', () => {
	it('valid number', () => {
		const color = _randomRGB()
		for (let i = 0; i < color.length; i++) {
			expect(color[i]).toBeGreaterThanOrEqual(0)
			expect(color[i]).toBeLessThanOrEqual(255)
		}
	})
})

describe('_colorToHex', () => {
	it('convert static color', () => {
		const hex = _colorToHex([101, 248, 159])
		expect(hex).toBe('#65f89f')
	})
})
