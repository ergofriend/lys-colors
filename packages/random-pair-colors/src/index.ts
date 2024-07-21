import { randomHex } from './color'
import { isValidRandomPairColor } from './validate'

type Config = {
	textColor: string
	backgroundColor: string
	threshold: number
}

type Result = {
	textColor: string
	backgroundColor: string
}

const initialConfig: Config = {
	textColor: '',
	backgroundColor: '',
	threshold: 70,
}

const MAX_RETRY_COUNT = 512

const generateRandomPairColor: (_?: Partial<Config>) => Result = (_config) => {
	const config: Config = { ...initialConfig, ..._config }

	const result: Result = {
		textColor: config.textColor || randomHex(),
		backgroundColor: config.backgroundColor || randomHex(),
	}

	let retryCount = 1

	while (!isValidRandomPairColor(result, config.threshold)) {
		retryCount++
		if (MAX_RETRY_COUNT < retryCount) {
			retryCount = 1
			config.threshold--

			if (config.threshold < 0) {
				console.warn('Failed to generate pair colors.')
				return result
			}
		}

		if (!config.textColor) {
			result.textColor = randomHex()
		}
		if (!config.backgroundColor) {
			result.backgroundColor = randomHex()
		}
	}

	return result
}

export { isValidRandomPairColor, generateRandomPairColor }
