import { defineConfig } from 'astro/config'
import tokyoNight from 'shiki/dist/themes/tokyo-night.mjs'

export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: tokyoNight,
		},
	},
})
