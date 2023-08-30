import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid(), dts({
		entryRoot: './lib'
	})],
	build: {
		lib: {
			entry: './lib/index.tsx',
			name: 'serenity-core',
			fileName: 'serenity-core'
		},
		copyPublicDir: true,
		rollupOptions: {
			output: {
				assetFileNames: "serenity.[ext]",
			},
			external: [
				'solid-js',
				'solid-js/web',
				'solid-js/store',
				'@serenity-ui/styles',
				'@serenity-ui/utils',
				'@serenity-ui/primitives',
				"@kobalte/core"
			]
		}
	},
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				additionalData: `@import '../serenity-styles/lib/styles/mixins.scss';`
			}
		},
		modules: {
			generateScopedName(name) {
				return name == 'serenity-ui' ? name : `serenity-${name}`;
			},
		}
	}
});
