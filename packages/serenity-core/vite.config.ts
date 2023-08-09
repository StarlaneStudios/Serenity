import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
	],
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			name: "serenity-core"
		},
		minify: false
	}
});