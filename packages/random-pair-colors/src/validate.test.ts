import { describe, expect, it } from 'vitest'

import { isValidRandomPairColor } from './validate'

describe('isValidRandomPairColor', () => {
	it('true', () => {
		const result = isValidRandomPairColor(
			{
				textColor: '#32f339',
				backgroundColor: '#3a2de8',
			},
			50,
		)
		expect(result).toBe(true)
	})

	it('false', () => {
		const result = isValidRandomPairColor(
			{
				textColor: '#32f339',
				backgroundColor: '#32f339',
			},
			50,
		)
		expect(result).toBe(false)
	})
})
