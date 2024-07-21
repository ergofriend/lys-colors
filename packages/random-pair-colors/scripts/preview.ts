import { generateRandomPairColor } from '../src/index'

const TEST_COLOR = '#808080'

const log = (result: { textColor: string; backgroundColor: string }) => {
	console.log(
		`%c text: ${result.textColor} background: ${result.backgroundColor}`,
		`color: ${result.textColor}; background-color: ${result.backgroundColor}`,
	)
}

for (let i = 0; i < 10; i++) {
	const result = generateRandomPairColor({
		textColor: TEST_COLOR,
		threshold: 70,
	})

	log(result)
}

for (let i = 0; i < 10; i++) {
	const result = generateRandomPairColor({
		backgroundColor: TEST_COLOR,
		threshold: 70,
	})

	// TODO: fix the text color output
	log(result)
}
