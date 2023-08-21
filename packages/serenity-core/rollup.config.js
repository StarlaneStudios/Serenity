import withSolid from "rollup-preset-solid";
import postcss from "rollup-plugin-postcss";

export default withSolid({
	input: "lib/index.tsx",
	targets: ['esm', 'cjs'],
	plugins: [
		postcss({
			extract: true,
			use: ['sass'],
			minimize: false,
			modules: true
		})
	],
	external: [
		"solid-js",
		"solid-js/web",
		"solid-js/store"
	]
});