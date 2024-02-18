import { defineConfig } from 'astro/config'
import tokyoNight from 'shiki/dist/themes/tokyo-night.mjs'

export default defineConfig({
	site: 'https://ergofriend.github.io',
	base: '/lys-colors',
	markdown: {
		shikiConfig: {
			theme: tokyoNight,
		},
	},
})
