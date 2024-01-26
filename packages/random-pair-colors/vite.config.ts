import { terser } from 'rollup-plugin-terser'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		lib: {
			entry: 'src/index.ts',
			name: '@lys-42/random-pair-colors',
		},
	},
	plugins: [
		// @ts-expect-error
		terser(),
	],
})
