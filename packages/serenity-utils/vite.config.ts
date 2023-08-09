import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			name: "serenity-utils",
			fileName: "serenity-utils"
		},
		minify: false,
		emptyOutDir: false
	}
});