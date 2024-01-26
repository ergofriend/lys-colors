import { randomHex } from './color'
import { isValid } from './validate'

type Config = {
	textColor?: string
	backgroundColor?: string
	threshold?: number
}

const getPairColor = (config?: Config) => {
	const result = {
		textColor: config?.textColor || randomHex(),
		backgroundColor: config?.backgroundColor || randomHex(),
	}

	while (!isValid(result, config?.threshold)) {
		if (!config?.textColor) {
			result.textColor = randomHex()
		}
		if (!config?.backgroundColor) {
			result.backgroundColor = randomHex()
		}
	}

	return result
}

export { isValid, getPairColor }
