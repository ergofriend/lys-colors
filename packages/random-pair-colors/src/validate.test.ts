import { describe, expect, it } from 'vitest'

import { isValid } from './validate'

describe('isValid', () => {
	it('true', () => {
		const result = isValid(
			{
				textColor: '#32f339',
				backgroundColor: '#3a2de8',
			},
			50,
		)
		expect(result).toBe(true)
	})

	it('false', () => {
		const result = isValid(
			{
				textColor: '#32f339',
				backgroundColor: '#32f339',
			},
			50,
		)
		expect(result).toBe(false)
	})
})
