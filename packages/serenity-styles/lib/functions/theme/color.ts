import { clamp, padZero } from "../utils/number";
import { DEFAULT_COLORS } from "../../constants/color";
import type { Color } from "../../types/theme";
import type { Tuple } from "@serenity-ui/utils";

/**
 * darkens a hex color supporting 3 and 6 digit hex values
 * @param color string
 * @param amount number
 * @return string
 */
export const darkenHex = (color: string, amount: number) => {

	// support #fff and #ffffff
	const regex = color.length === 4 ? /^#?([a-f\d])([a-f\d])([a-f\d])$/i : /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const hex = regex.exec(color);

	if (!hex) {
		console.warn('invalid hex color', color);
		return color;
	}

	// convert hex to rgb
	let r: number | string = parseInt(hex[1], 16);
	let g: number | string = parseInt(hex[2], 16);
	let b: number | string = parseInt(hex[3], 16);

	// clamp every value to 0 - 255
	r = clamp(r - amount, 0, 255);
	g = clamp(g - amount, 0, 255);
	b = clamp(b - amount, 0, 255);

	// round and convert to hex
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	// pad with leading zeros
	r = padZero(r);
	g = padZero(g);
	b = padZero(b);
	
	return `#${r}${g}${b}`;
};

/**
 * darkens a rgb or rgba color
 * @param color 
 * @param amount 
 */
export const darkenRGB = (color: string, amount: number) => {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(color);

	if (!rgb) {
		console.warn('invalid rgb color', color);
		return color;
	}

	// clamp every value to 0 - 255
	const r = clamp(parseInt(rgb[1]) - amount, 0, 255);
	const g = clamp(parseInt(rgb[2]) - amount, 0, 255);
	const b = clamp(parseInt(rgb[3]) - amount, 0, 255);

	return `rgb(${r}, ${g}, ${b})`;
};

/**
 * darkens a hsl or hsla color
 * @param color
 * @param amount
 * 
 */
export const darkenHSL = (color: string, amount: number) => {

	const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
	const hsl = regex.exec(color);

	if (!hsl) {
		console.warn('invalid hsl color', color);
		return color;
	}

	// clamp every value to 0 - 100
	const h = clamp(parseInt(hsl[1]), 0, 100);
	const s = clamp(parseInt(hsl[2]), 0, 100);
	const l = clamp(parseInt(hsl[3]) - amount, 0, 100);

	return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * darkens the hex, rgba or hsl values
 * @param color string
 * @param amount number
 * @return string 
 */
export const darkenColor = (color: string, amount: number) => {

	if (color.startsWith('#')) {
		return darkenHex(color, amount);
	}

	if (color.startsWith('rgb')) {
		return darkenRGB(color, amount);
	}

	if (color.startsWith('hsl')) {
		return darkenHSL(color, amount);
	}

	return color;
};

/**
 * lightens a hex color supporting 3 and 6 digit hex values
 * @param input 
 * @param defaultShade 
 * @returns 
 */
export const lightenHex = (input: string, amount: number) => {

	// regex that supports 3 and 6 digit hex values
	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const hex = regex.exec(input);

	if (!hex) {
		console.warn('invalid hex color', input);
		return input;
	}

	// clamp every value to 0 - 255
	const r = clamp(parseInt(hex[1], 16) + amount, 0, 255).toString(16);
	const g = clamp(parseInt(hex[2], 16) + amount, 0, 255).toString(16);
	const b = clamp(parseInt(hex[3], 16) + amount, 0, 255).toString(16);

	return `#` + r + g + b;
};

/**
 * lightens a rgb or rgba color
 * @param input
 * @param amount
 * @returns
 */
export const lightenRGB = (input: string, amount: number) => {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(input);

	if (!rgb) {
		console.warn('invalid rgb color', input);
		return input;
	}

	// clamp every value to 0 - 255
	const r = clamp(parseInt(rgb[1]) + amount, 0, 255);
	const g = clamp(parseInt(rgb[2]) + amount, 0, 255);
	const b = clamp(parseInt(rgb[3]) + amount, 0, 255);

	return `rgb(${r}, ${g}, ${b})`;
};

/**
 * lightens a hsl or hsla color
 * @param input
 * @param amount
 * @returns string
 */
export const lightenHSL = (input: string, amount: number) => {

	const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
	const hsl = regex.exec(input);

	if (!hsl) {
		console.warn('invalid hsl color', input);
		return input;
	}

	// clamp every value to 0 - 100
	const h = clamp(parseInt(hsl[1]), 0, 100);
	const s = clamp(parseInt(hsl[2]), 0, 100);
	const l = clamp(parseInt(hsl[3]) + amount, 0, 100);

	return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * lightens the hex, rgba or hsl values
 * @param color string
 * @param amount number
 * @return string
 */
export const lightenColor = (color: string, amount: number) => {

	if (color.startsWith('#')) {
		return lightenHex(color, amount);
	}

	if (color.startsWith('rgb')) {
		return lightenRGB(color, amount);
	}

	if (color.startsWith('hsl')) {
		return lightenHSL(color, amount);
	}

	return color;
};

/**
 * Sets the opacity of a hex color
 * @param color 
 * @param opacity 
 * @returns string
 */
export const setHexOpacity = (color: string, opacity: number) => {

	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const hex = regex.exec(color);

	if (!hex) {
		console.warn('invalid hex color', color);
		return color;
	}

	const r = parseInt(hex[1], 16);
	const g = parseInt(hex[2], 16);
	const b = parseInt(hex[3], 16);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Sets the opacity of a rgb or rgba color
 * @param color 
 * @param opacity 
 * @returns string
 */
export const setRGBOpacity = (color: string, opacity: number) => {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(color);

	if (!rgb) {
		console.warn('invalid rgb color', color);
		return color;
	}

	const r = parseInt(rgb[1]);
	const g = parseInt(rgb[2]);
	const b = parseInt(rgb[3]);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Sets the opacity of a hsl or hsla color
 * @param color 
 * @param opacity 
 * @returns string
 */
export const setHSLOpacity = (color: string, opacity: number) => {

	const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
	const hsl = regex.exec(color);

	if (!hsl) {
		console.warn('invalid hsl color', color);
		return color;
	}

	const h = parseInt(hsl[1]);
	const s = parseInt(hsl[2]);
	const l = parseInt(hsl[3]);

	return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
};

/**
 * Sets the opacity of a hex, rgb or hsl color
 * @param color string
 * @param opacity number
 * @return string
 */
export const setColorOpacity = (
	color: string,
	opacity: number,
	themeColors: Record<Color, Tuple<string, 10>>
) => {

	if (color.startsWith('#')) {
		return setHexOpacity(color, opacity);
	}

	if (color.startsWith('rgb')) {
		return setRGBOpacity(color, opacity);
	}

	if (color.startsWith('hsl')) {
		return setHSLOpacity(color, opacity);
	}

	if (color.includes('.')) {
		const output = color.split('.');

		const base = output[0] as Color;
		const shade = output[1];

		const hex = themeColors[base][parseInt(shade)];

		return setHexOpacity(hex, opacity);
	}

	console.warn('invalid color', color);
	return color;
};

/**
 * Resolves the color input and returns a string.
 * @param input string
 * @param defaultShade number
 * @return string
 */
export const resolveColorInput = (input: string, defaultShade: number = 6) => {

	if (input.startsWith('#') || input.startsWith('hsl') || input.startsWith('rgba')) {
		return input;
	}

	const base = input.split('.');

	const color = base[0];
	const shade = base[1];

	if (!shade) {
		return DEFAULT_COLORS[color][defaultShade];
	}

	return DEFAULT_COLORS[color][parseInt(shade)];
};

/**
 * Returns hex color for the theme color
 * @param name 
 * @param shade 
 * @return hex color
 */
export const getThemeColor = (name: string, shade: number = 6): string => {

	if (name.includes('.')) {
		return DEFAULT_COLORS[name][shade];
	}

	const [base, _shade] = name.split('.');
	return DEFAULT_COLORS[base][parseInt(_shade)];
};