import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import pkg from "./package.json";

export default defineConfig(({ command, mode, ssrBuild }) => ({
	plugins: [
		solid()
	],
	root: "lib",
	build: {
		lib: {
			entry: "index.ts",
			formats: ["es", "umd"],
			name: "serenity-core",
			fileName: "serenity-core"
		},
		minify: false,
		emptyOutDir: false,
		outDir: resolve(__dirname, "dist"),
		target: "esnext",
		cssCodeSplit: true,
		cssMinify: true,
		rollupOptions: {
			external: [
				"solid-js",
				"solid-js/web",
				"solid-js/store",
				...Object.keys(pkg.peerDependencies ?? {})
			]
		}
	},
	esbuild: {
		sourcemap: true,
		target: "esnext"
	},
	css: {
		preprocessorOptions: {
			scss: {
				
			}
		},
		modules: {
			hashPrefix: "serenity",
			localsConvention: 'camelCaseOnly'
		}
	}
}));