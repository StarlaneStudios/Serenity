import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [solid({ ssr: false })],
	build: {
		minify: "esbuild",
		cssMinify: "esbuild",
		sourcemap: false,
		target: "esnext"
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					$button-radius: 4px;
				`
			}
		}
	}
});
