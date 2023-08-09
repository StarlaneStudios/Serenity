import { defineConfig } from "vite";

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
	}
});