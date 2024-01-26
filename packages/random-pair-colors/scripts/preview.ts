import { generateRandomPairColor } from '../src/index.ts'

for (let i = 0; i < 10; i++) {
	const result = generateRandomPairColor({
		backgroundColor: '#3f2697',
		threshold: 70,
	})

	console.log(
		`%cHello Deno ${result.textColor}(${result.backgroundColor}) !!!`,
		`color: ${result.textColor}; background-color: ${result.backgroundColor}`,
	)
}
