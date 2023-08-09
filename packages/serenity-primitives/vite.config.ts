import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "lib/index.ts",
			formats: ["es", "umd"],
			name: "serenity-primitives",
			fileName: "serenity-primitives"
		},
		minify: false,
		emptyOutDir: false
	}
});