import withSolid from "rollup-preset-solid";

export default withSolid({
	input: "lib/index.ts",
	targets: ['esm', 'cjs']
});