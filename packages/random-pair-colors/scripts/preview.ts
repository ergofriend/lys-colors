import { getPairColor } from '../src/index.ts'

for (let i = 0; i < 10; i++) {
	const result = getPairColor({ backgroundColor: '#3f2697' })

	console.log(
		'%cHello Deno !!!',
		`color: ${result.textColor}; background-color: ${result.backgroundColor}`,
	)
}
