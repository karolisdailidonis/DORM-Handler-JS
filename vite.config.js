import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [],
	server: {
		port: 3000,
	},
	build: {
		manifest: true,
		minify: false,
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			name: 'dorm-js',
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			input: {
				index: './src/index.js',
			},
			output: {
				format: 'umd',
				dir: 'dist',
			},
		},
	},
});
