import { resolve } from 'node:path';
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";
import ts from 'typescript';

export default defineConfig({
	plugins: [
		solid(),
		{
			name: 'solid-source',
			enforce: 'pre',
			generateBundle() {
				const libDir = resolve('lib');
				// const destDir = resolve('dist/source');

				const program = ts.createProgram([resolve(libDir, 'index.tsx')], {
					target: ts.ScriptTarget.ESNext,
					module: ts.ModuleKind.ESNext,
					moduleResolution: ts.ModuleResolutionKind.Node10,
					jsx: ts.JsxEmit.Preserve,
					jsxImportSource: "solid-js",
					allowSyntheticDefaultImports: true,
					esModuleInterop: true,
					// outDir: 'dist/source',
					declarationDir: 'dist/types',
					declaration: true,
					allowJs: true,
					// TEMP
					emitDeclarationOnly: true,
				});

				program.emit();

				// globSync('**/*.scss', {
				// 	cwd: libDir
				// }).forEach((filePath) => {
				// 	const srcPath = join(libDir, filePath);
				// 	const destPath = join(destDir, filePath);
				// 	const destDirPath = dirname(destPath);

				// 	mkdirSync(destDirPath, { recursive: true });
				// 	copyFileSync(srcPath, destPath);
				// });
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
		rollupOptions: {
			output: {
				assetFileNames: "serenity.[ext]",
			},
			external: [
				'solid-js',
				'solid-js/web',
				'solid-js/store',
				"@kobalte/core"
			]
		}
	},
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				additionalData: (content, path) => {
					const mixins = `@import './lib/styles/mixins.scss';`;

					if (path.endsWith('global.scss')) {
						return `${mixins} ${content}`;
					} else {
						return `${mixins} @layer serenity { ${content} };`
					}
				}
			}
		},
		modules: {
			generateScopedName(name) {
				return name == 'serenity-ui' ? name : `serenity-${name}`;
			},
		}
	}
});
