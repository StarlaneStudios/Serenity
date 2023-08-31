import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from 'node:path';
import ts from 'typescript';

export default defineConfig({
	plugins: [
		solid(),
		{
			name: 'solid-source',
			enforce: 'pre',
			writeBundle() {
				const program = ts.createProgram([resolve('./lib/index.tsx')], {
					target: ts.ScriptTarget.ESNext,
					module: ts.ModuleKind.ESNext,
					moduleResolution: ts.ModuleResolutionKind.Node10,
					jsx: ts.JsxEmit.Preserve,
					jsxImportSource: "solid-js",
					allowSyntheticDefaultImports: true,
					esModuleInterop: true,
					outDir: 'dist/source',
					declarationDir: 'dist/types',
					declaration: true,
					allowJs: true,
				});

				program.emit();
			}
		}
	],
	build: {
		lib: {
			entry: './lib/index.tsx',
			name: 'serenity-core',
			fileName: 'serenity-core'
		},
		copyPublicDir: true,
		emptyOutDir: false,
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
