import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid(), dts()],
	build: {
		emptyOutDir: false,
		lib: {
			entry: './lib/index.ts',
			name: 'serenity-styles',
			fileName: 'serenity-styles'
		},
		rollupOptions: {
			external: [
				"@serenity-ui/utils",
				"@serenity-ui/styles"
			]
		}
	}
});
