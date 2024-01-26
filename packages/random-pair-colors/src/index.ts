import { randomHex } from './color'
import { isValidRandomPairColor } from './validate'

type Config = {
	textColor?: string
	backgroundColor?: string
	threshold?: number
}

const generateRandomPairColor = (config?: Config) => {
	const result = {
		textColor: config?.textColor || randomHex(),
		backgroundColor: config?.backgroundColor || randomHex(),
	}

	while (!isValidRandomPairColor(result, config?.threshold)) {
		if (!config?.textColor) {
			result.textColor = randomHex()
		}
		if (!config?.backgroundColor) {
			result.backgroundColor = randomHex()
		}
	}

	return result
}

export { isValidRandomPairColor, generateRandomPairColor }
