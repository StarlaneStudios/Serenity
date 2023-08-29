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
