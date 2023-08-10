import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const srcPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			fileName: "serenity-styles",
			name: "serenity-styles"
		},
		minify: false,
		emptyOutDir: false
	},
	resolve: {
		alias: {
			"~/": srcPath
		}
	}
});