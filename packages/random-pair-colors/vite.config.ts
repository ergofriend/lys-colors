import terser from '@rollup/plugin-terser'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		lib: {
			entry: 'src/index.ts',
			name: '@ergofriend/random-pair-colors',
			fileName: 'main',
		},
	},
	plugins: [terser(), dts({ rollupTypes: true })],
})
