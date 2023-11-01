import { Tuple } from "./helpers";
import { ColorNames, ThemeNames } from "./values";

// ==============================
// Colors
// ==============================

export type DefaultColorNames = ColorNames | (string & {});
export type ColorOverride = {};
export type ColorMap = ColorOverride extends {
	colors: Record<infer CustomColors, Tuple<string, 10>>;
}
	? Record<CustomColors, Tuple<string, 10>>
	: Record<DefaultColorNames, Tuple<string, 10>>;

export type Color = keyof ColorMap;
export type ColorValue = "accent" | Color | (string & {});

// ==============================
// Themes
// ==============================

export type DefaultThemeNames = ThemeNames | (string & {});
export type ThemeOverride = {};

export type ThemeMap = ThemeOverride extends {
	theme: Record<infer CustomColorScheme, ColorMap>;
} ? Record<CustomColorScheme, ColorMap> : Record<DefaultThemeNames, ColorMap>;

export type Theme = keyof ThemeMap;