import { DEFAULT_COLORS } from "../constants/colors";
import type { Color } from "../types/theme";
import type { Tuple } from "@serenity-ui/utils";

/**
 * Retrieves the rgb values from a rgb or rgba color
 * @param rgb
 * @return number[]
 */
export function getRGBValues(rgb: string) {
	return rgb.replace(/(rgb|rgba)|\(|\)/g, '').split(',').map(parseFloat);
}

/**
 * Retrieves the hsl values from a hsl or hsla color
 * @param hsl 
 * @returns 
 */
export function getHSLValues(hsl: string) {
	return hsl.replace(/(hsl|hsla)|\(|\)/g, '').split(',').map(parseFloat);
}

/**
 * Converts a hex color to rgb
 * @param hex
 * @return number[]
 */
export function convertHexToRGB(hex: string) {

	let c = hex.slice(1);

	if (c.length === 3) {
		c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
	}

	const rgb = parseInt(c, 16);

	const r = (rgb >> 16) & 255;
	const g = (rgb >> 8) & 255;
	const b = rgb & 255;

	return [r, g, b];
}

/**
 * Converts a rgb color to hex color
 * @param hsl 
 */
export function convertHSLToRGB(hsl: string) {
	const [hue, saturation, lightness] = getHSLValues(hsl);
	const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
	const prime = hue / 60;
	const x = chroma * (1 - Math.abs(prime % 2 - 1));
	const m = lightness - chroma / 2;

	let red = 0, green = 0, blue = 0;

	if (0 <= prime && prime < 1) {
		red = chroma;
		green = x;
	} else if (1 <= prime && prime < 2) {
		red = x;
		green = chroma;
	} else if (2 <= prime && prime < 3) {
		green = chroma;
		blue = x;
	} else if (3 <= prime && prime < 4) {
		green = x;
		blue = chroma;
	} else if (4 <= prime && prime < 5) {
		red = x;
		blue = chroma;
	} else {
		red = chroma;
		blue = x;
	}

	red = Math.round((red + m) * 255);
	green = Math.round((green + m) * 255);
	blue = Math.round((blue + m) * 255);

	return [red, green, blue];
}

/**
 * Converts a hex color to hsl
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
export function buildHexFromRGB(r: number, g: number, b: number) {
	return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

/**
 * darkens a hex color supporting 3 and 6 digit hex values
 * 
 * @param color string
 * @param amount number
 * @return string
 */
export function darkenHex(color: string, amount: number) {
  
	let [r, g, b] = convertHexToRGB(color);

	r = Math.max(0, r - amount);
	g = Math.max(0, g - amount);
	b = Math.max(0, b - amount);

	return buildHexFromRGB(r, g, b);
}

/**
 * darkens a rgb or rgba color
 * 
 * @param color 
 * @param amount 
 */
export function darkenRGB(color: string, amount: number) {

	let [r, g, b] = getRGBValues(color);

	r = Math.max(0, r - amount);
	g = Math.max(0, g - amount);
	b = Math.max(0, b - amount);

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
	const [hue, saturation, lightness] = getHSLValues(color);
	const light = Math.max(0, lightness - amount);

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
  
	if (!color) {
		return color;
	}
	else if (color.startsWith('#')) {
		return darkenHex(color, amount);
	}
	else if (color.startsWith('rgb')) {
		return darkenRGB(color, amount);
	}
	else if (color.startsWith('hsl')) {
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

	let [r, g, b] = convertHexToRGB(input);

	r = Math.min(255, r + amount);
	g = Math.min(255, g + amount);
	b = Math.min(255, b + amount);

	return buildHexFromRGB(r, g, b);
}

/**
 * lightens a rgb or rgba color
 * 
 * @param input
 * @param amount
 * @returns
 */
export function lightenRGB(input: string, amount: number) {
  
	let [r, g, b] = getRGBValues(input);

	r = Math.min(255, r + amount);
	g = Math.min(255, g + amount);
	b = Math.min(255, b + amount);

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
	let [hue, saturation, lightness] = getHSLValues(input);
	const lighten = Math.min(255, lightness + amount);
  
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
	else if (color.startsWith('rgb')) {
		return lightenRGB(color, amount);
	}
	else if (color.startsWith('hsl')) {
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
	const [r, g, b] = convertHexToRGB(color);
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
	const [r, g, b] = getRGBValues(color);
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
	const [h, s, l] = getHSLValues(color);
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

	if (!color) {
		return color;
	}
	else if (color.startsWith('#')) {
		return setHexOpacity(color, opacity);
	}
	else if (color.startsWith('rgb')) {
		return setRGBOpacity(color, opacity);
	}
	else if (color.startsWith('hsl')) {
		return setHSLOpacity(color, opacity);
	}
	else if (color.includes('.')) {
		const [base, shade] = color.split('.') as [Color, string];
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
		return DEFAULT_COLORS?.[name]?.[shade];
	}

	const [base, _shade] = name.split('.');

	return DEFAULT_COLORS[base][+_shade];
}

/**
 * Returns if the color is a light color or not.
 * @param input 
 * @param shade 
 * @returns boolean
 */
export function isColorLight(color: string) {

	let r, g, b;

	if (color.startsWith('#')) {
		[r, g, b] = convertHexToRGB(color);
	}
	else if (color.startsWith('rgb')) {
		[r, g, b] = getRGBValues(color);
	}
	else if (color.startsWith('hsl')) {
		[r, g, b] = convertHSLToRGB(color);
	}
	else if (color.includes('.')) {
		const [base, shade] = color.split('.') as [Color, string];
		[r, g, b] = convertHexToRGB(DEFAULT_COLORS[base][+shade]);
	}
	else {
		console.warn('invalid color', color);
		return false;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	const hsp = Math.sqrt(
		0.299 * (r * r) +
		0.587 * (g * g) +
		0.114 * (b * b)
	);

	// Using the HSP value, determine whether the color is light or dark
	return hsp > 130;
}