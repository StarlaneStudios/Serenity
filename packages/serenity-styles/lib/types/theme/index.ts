import { Tuple } from "@serenity-ui/utils";
import { ColorNames, ColorValue, ThemeNames } from "./values";

export * from "./values";

// ==============================
// Colors
// ==============================

export type DefaultThemeColor = ColorNames | (string & {});
export type ColorPaletteOverride = {};
export type ColorPalette = ColorPaletteOverride extends {
	colors: Record<infer CustomColors, Tuple<string, 10>>;
}
	? Record<CustomColors, Tuple<string, 10>>
	: Record<DefaultThemeColor, Tuple<string, 10>>;

export type Color = keyof ColorPalette;
export type AnyColor = Color | ColorValue;

// ==============================
// ThemeScheme
// ==============================

export type DefaultColorScheme = ThemeNames | (string & {});
export type ColorSchemeOverride = {};

export type ColorScheme = ColorSchemeOverride extends {
	theme: Record<infer CustomColorScheme, ColorPalette>;
} ? Record<CustomColorScheme, ColorPalette> : Record<DefaultColorScheme, ColorPalette>;

export type ThemeScheme = keyof ColorScheme;