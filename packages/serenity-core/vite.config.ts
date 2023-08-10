import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const srcPath = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			name: "serenity-core",
			fileName: "serenity-core"
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