import withSolid from "rollup-preset-solid";
import postcss from "rollup-plugin-postcss";
import path from "path";
import { fileURLToPath } from "url";

export default withSolid({
	input: "lib/index.tsx",
	targets: ['esm', 'cjs'],
	cache: true,
	plugins: [
		postcss({
			extract: true,
			use: [
				['sass', {
					data: "@import '../serenity-styles/lib/sass/mixin.scss';",
					includePaths: [path.join(fileURLToPath(import.meta.url), "lib")]
				}]
			],
			minimize: false,
			modules: true,
			sourceMap: true
		})
	],
	external: [
		"solid-js",
		"solid-js/web",
		"solid-js/store"
	]
});