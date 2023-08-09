import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"]
		},
		minify: false
	}
});