import { calcAPCA } from 'apca-w3'
import { colorParsley } from 'colorparsley'

const defaultThreshold = 45

type Config = {
	textColor: string
	backgroundColor: string
}

export const isValidRandomPairColor = (
	{ textColor, backgroundColor }: Config,
	threshold = defaultThreshold,
) => {
	return (
		threshold <=
		Math.abs(calcAPCA(colorParsley(textColor), colorParsley(backgroundColor)))
	)
}
