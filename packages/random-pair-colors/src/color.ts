const randomNumber = (from = 0, to = 255) => {
	return Math.floor(Math.random() * (to - from + 1) + from)
}

export const _randomRGB = (): Color => {
	return [randomNumber(), randomNumber(), randomNumber()]
}

export const _colorToHex = (color: Color) => {
	const hex = color.map((c) => c.toString(16).padStart(2, '0')).join('')
	return `#${hex}`
}

export const randomHex = () => {
	return _colorToHex(_randomRGB())
}
