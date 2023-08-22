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

	let c = color;

	if (c.startsWith('#')) {
		c = c.slice(1);
	}

	if (c.length === 3) {
		c = c.split('').map(v => v + v).join('');
	}

	const bigint = parseInt(c, 16);

	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	// clamp every value to 0 - 255
	r = clamp(r - amount, 0, 255);
	g = clamp(g - amount, 0, 255);
	b = clamp(b - amount, 0, 255);

	return `#${(r << 16 | g << 8 | b).toString(16)}`;
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
	const r = clamp(Number(rgb[1]) - amount, 0, 255);
	const g = clamp(Number(rgb[2]) - amount, 0, 255);
	const b = clamp(Number(rgb[3]) - amount, 0, 255);

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

	const hue = hsl[1];
	const saturation = hsl[2];
	const light = clamp(Number(hsl[3]) - amount, 0, 100);

	return `hsl(${hue}, ${saturation}%, ${light}%)`;
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

	let c = input;

	if (c.startsWith('#')) {
		c = c.slice(1);
	}

	if (c.length === 3) {
		c = c.split('').map(v => v + v).join('');
	}

	const bigint = parseInt(c, 16);
	
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	r = clamp(r + amount, 0, 255);
	g = clamp(g + amount, 0, 255);
	b = clamp(b + amount, 0, 255);

	return `#${(r << 16 | g << 8 | b).toString(16)}`;
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
	const r = clamp(Number(rgb[1]) + amount, 0, 255);
	const g = clamp(Number(rgb[2]) + amount, 0, 255);
	const b = clamp(Number(rgb[3]) + amount, 0, 255);

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
	const hue = hsl[1];
	const saturation = hsl[2];
	const lighten = clamp(Number(hsl[3]) + amount, 0, 100);

	return `hsl(${hue}, ${saturation}%, ${lighten}%)`;
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

	let c = color;

	if(c[0] === '#') {
		c = c.slice(1);
	}

	if(c.length === 3) {
		c = c.split('').map((v) => v + v).join('');
	}

	const bigint = parseInt(c, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

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

	const r = Number(rgb[1]);
	const g = Number(rgb[2]);
	const b = Number(rgb[3]);

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

	const h = Number(hsl[1]);
	const s = Number(hsl[2]);
	const l = Number(hsl[3]);

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
export const resolveColorInput = (input?: string, defaultShade: number = 6) => {

	if(!input) {
		return input;
	}

	if (input.startsWith('#') || input.startsWith('hsl') || input.startsWith('rgb')) {
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