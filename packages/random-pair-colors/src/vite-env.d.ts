/// <reference types="vite/client" />

type Color = [number, number, number]

declare module 'apca-w3' {
	export function calcAPCA(
		color1: Color,
		color2: Color,
		places?: number,
		round?: boolean,
	): number
}

declare module 'colorparsley' {
	export function colorParsley(color: string): Color
}
