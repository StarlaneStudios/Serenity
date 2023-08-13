import { Tuple } from "../tuple";

export type DefaultThemeColor =
	| "dark"
	| "gray"
	| "red"
	| "pink"
	| "grape"
	| "violet"
	| "indigo"
	| "blue"
	| "cyan"
	| "teal"
	| "green"
	| "lime"
	| "yellow"
	| "orange"
	| (string & {});

export type ThemeColorPaletteOverride = {};

export type ThemeColorPalette = ThemeColorPaletteOverride extends {
	colors: Record<infer CustomColors, Tuple<string, 10>>;
}
	? Record<CustomColors, Tuple<string, 10>>
	: Record<DefaultThemeColor, Tuple<string, 10>>;

export type ThemeColor = keyof ThemeColorPalette;

export * from "./sizes";