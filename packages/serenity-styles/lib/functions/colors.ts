import { clamp } from "./math";
import { DEFAULT_COLORS } from "../constants/colors";
import type { Color } from "../types/theme";
import type { Tuple } from "@serenity-ui/utils";

/**
 * darkens a hex color supporting 3 and 6 digit hex values
 * 
 * @param color string
 * @param amount number
 * @return string
 */
export function darkenHex(color: string, amount: number) {
	let c = color.slice(1);

	if (c.length === 3) {
		c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
	}

	const bigint = parseInt(c, 16);

	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	// clamp every value to 0 - 255
	r = clamp(r - amount, 0, 255);
	g = clamp(g - amount, 0, 255);
	b = clamp(b - amount, 0, 255);

	return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

/**
 * darkens a rgb or rgba color
 * 
 * @param color 
 * @param amount 
 */
export function darkenRGB(color: string, amount: number) {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(color);

	if (!rgb) {
		console.warn('invalid rgb color', color);
		return color;
	}

	// clamp every value to 0 - 255
	const r = clamp(+rgb[1] - amount, 0, 255);
	const g = clamp(+rgb[2] - amount, 0, 255);
	const b = clamp(+rgb[3] - amount, 0, 255);

	return `rgb(${r}, ${g}, ${b})`;
}

/**
 * darkens a hsl or hsla color
 * 
 * @param color
 * @param amount
 * 
 */
export function darkenHSL(color: string, amount: number) {

	const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
	const hsl = regex.exec(color);

	if (!hsl) {
		console.warn('invalid hsl color', color);
		return color;
	}

	const hue = hsl[1];
	const saturation = hsl[2];
	const light = clamp(+hsl[3] - amount, 0, 100);

	return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

/**
 * darkens the hex, rgba or hsl values
 * 
 * @param color string
 * @param amount number
 * @return string 
 */
export function darkenColor(color: string | undefined, amount: number) {

	if(!color) {
		return color;
	}

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
}

/**
 * lightens a hex color supporting 3 and 6 digit hex values
 * 
 * @param input 
 * @param defaultShade 
 * @returns 
 */
export function lightenHex(input: string, amount: number) {
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

	return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

/**
 * lightens a rgb or rgba color
 * 
 * @param input
 * @param amount
 * @returns
 */
export function lightenRGB(input: string, amount: number) {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(input);

	if (!rgb) {
		console.warn('invalid rgb color', input);
		return input;
	}

	// clamp every value to 0 - 255
	const r = clamp(+rgb[1] + amount, 0, 255);
	const g = clamp(+rgb[2] + amount, 0, 255);
	const b = clamp(+rgb[3] + amount, 0, 255);

	return `rgb(${r}, ${g}, ${b})`;
}

/**
 * lightens a hsl or hsla color
 * 
 * @param input
 * @param amount
 * @returns string
 */
export function lightenHSL(input: string, amount: number) {

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
}

/**
 * lightens the hex, rgba or hsl values
 * 
 * @param color string
 * @param amount number
 * @return string
 */
export function lightenColor(color: string, amount: number) {

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
}

/**
 * Sets the opacity of a hex color
 * 
 * @param color 
 * @param opacity 
 * @returns string
 */
export function setHexOpacity(color: string, opacity: number) {

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
}

/**
 * Sets the opacity of a rgb or rgba color
 * 
 * @param color 
 * @param opacity 
 * @returns string
 */
export function setRGBOpacity(color: string, opacity: number) {

	const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/g;
	const rgb = regex.exec(color);

	if (!rgb) {
		console.warn('invalid rgb color', color);
		return color;
	}

	const r = +rgb[1];
	const g = +rgb[2];
	const b = +rgb[3];

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Sets the opacity of a hsl or hsla color
 * 
 * @param color 
 * @param opacity 
 * @returns string
 */
export function setHSLOpacity(color: string, opacity: number) {

	const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
	const hsl = regex.exec(color);

	if (!hsl) {
		console.warn('invalid hsl color', color);
		return color;
	}

	const h = +hsl[1];
	const s = +hsl[2];
	const l = +hsl[3];

	return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
}

/**
 * Sets the opacity of a hex, rgb or hsl color
 * 
 * @param color string
 * @param opacity number
 * @return string
 */
export function setColorOpacity(
	color: string | undefined,
	opacity: number,
	themeColors: Record<Color, Tuple<string, 10>>
) {

	if(!color) {
		return color;
	}

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

		const hex = themeColors[base][+shade];

		return setHexOpacity(hex, opacity);
	}

	console.warn('invalid color', color);
	
	return color;
}

/**
 * Returns hex color for the theme color
 * 
 * @param name 
 * @param shade 
 * @return hex color
 */
export function getThemeColor(name: string, shade: number = 6) {

	if (name.includes('.')) {
		return DEFAULT_COLORS[name][shade];
	}

	const [base, _shade] = name.split('.');

	return DEFAULT_COLORS[base][+_shade];
}