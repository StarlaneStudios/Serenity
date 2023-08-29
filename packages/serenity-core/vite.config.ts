import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid(), dts()],
	build: {
		emptyOutDir: false,
		lib: {
			entry: './lib/index.tsx',
			name: 'serenity-core',
			fileName: 'serenity-core'
		},
		rollupOptions: {
			external: [
				'solid-js',
				'solid-js/web',
				'solid-js/store',
				'@serenity-ui/styles',
				'@serenity-ui/utils',
				'@serenity-ui/primitives',
			]
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import '../serenity-styles/lib/sass/mixin.scss';`
			}
		}
	}
});
