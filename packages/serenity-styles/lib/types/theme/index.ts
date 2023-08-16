import { Tuple } from "../tuple";

// ==============================
// Colors
// ==============================

export type DefaultThemeColor = | "dark" | "gray" | "red" | "pink" | "grape" | "violet" | "indigo" | "blue" | "cyan" | "teal" | "green" | "lime" | "yellow" | "orange" | (string & {});
export type ColorPaletteOverride = {};
export type ColorPalette = ColorPaletteOverride extends {
	colors: Record<infer CustomColors, Tuple<string, 10>>;
}
	? Record<CustomColors, Tuple<string, 10>>
	: Record<DefaultThemeColor, Tuple<string, 10>>;

export type Color = keyof ColorPalette;

// ==============================
// ThemeScheme
// ==============================

export type DefaultColorScheme = "light" | "dark";
export type ColorSchemeOverride = {};

export type ColorScheme = ColorSchemeOverride extends {
	theme: Record<infer CustomColorScheme, ColorPalette>;
} ? Record<CustomColorScheme, ColorPalette> : Record<DefaultColorScheme, ColorPalette>;

export type ThemeScheme = keyof ColorScheme;

export * from "./sizes";