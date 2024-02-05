import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		build: {
			lib: {
				entry: 'src/focus-pair-reader.ts',
				formats: ['es'],
			},
			rollupOptions: {
				external: mode === 'production' ? '' : /^lit/,
			},
		},
	}
})
