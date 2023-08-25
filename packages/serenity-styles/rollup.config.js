import withSolid from "@serenity-ui/rollup-preset-solid";
import postcss from "rollup-plugin-postcss";

export default withSolid({
	input: "lib/index.ts",
	targets: ['esm', 'cjs'],
	plugins: [
		postcss({
			extract: true,
			use: ['sass'],
			minimize: true,
			modules: true
		})
	],
	tsCompilerOptions: {
		declarationMap: true
	}
});