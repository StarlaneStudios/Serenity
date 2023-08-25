import withSolid from "@serenity-ui/rollup-preset-solid";
import postcss from "rollup-plugin-postcss";

export default withSolid({
	input: "lib/index.tsx",
	targets: ['esm', 'cjs'],
	cache: true,
	plugins: [
		postcss({
			extract: true,
			use: [
				['sass', {
					data: "@import '../serenity-styles/lib/sass/mixin.scss';"
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
	],
	tsCompilerOptions: {
		declarationMap: true
	}
});