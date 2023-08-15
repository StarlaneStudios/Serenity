import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import pkg from "./package.json";
import dts from "vite-plugin-dts";

export default defineConfig(({ command, mode, ssrBuild }) => ({
	plugins: [
		solid(),
		dts({ 
			rollupTypes: true, 
			exclude: ['node_module/**'],
			tsconfigPath: resolve(__dirname, "tsconfig.json"),
			insertTypesEntry: true,
			outDir: resolve(__dirname, "dist")
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			formats: ["es", "umd"],
			name: "serenity-core",
			fileName: "serenity-core"
		},
		minify: false,
		emptyOutDir: false,
		outDir: resolve(__dirname, "dist"),
		target: "esnext",
		cssCodeSplit: false,
		cssMinify: false,
		rollupOptions: {
			external: [

				// exclude solid dependencies from the bundle
				"solid-js",
				"solid-js/web",
				"solid-js/store",

				// exclude all serenity packages from the bundle
				"@serenity-ui/utils",
				"@serenity-ui/styles",
				"@serenity-ui/primitives",

				// exclude peer dependencies from the bundle
				...Object.keys(pkg.peerDependencies ?? {})
			]
		}
	},
	esbuild: {
		sourcemap: true,
		target: "esnext"
	},
	css: {
		devSourcemap: true,
		modules: {
			hashPrefix: "serenity",
			localsConvention: 'camelCaseOnly'
		}
	}
}));