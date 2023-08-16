import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		dts({
			exclude: ['node_module/**'],
			outDir: resolve(__dirname, "dist")
		})
	],
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			fileName: "serenity-styles",
			name: "serenity-styles"
		},
		minify: false,
		emptyOutDir: false
	}
});