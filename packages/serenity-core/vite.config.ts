import { resolve } from "path";
import { defineConfig } from "vite";

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
	}
});