import withSolid from "@serenity-ui/rollup-preset-solid";

export default withSolid({
	input: "lib/index.ts",
	targets: ['esm', 'cjs'],
	tsCompilerOptions: {
		declarationMap: true
	}
});