import type { OmitByValue } from "../../types/helper";
import type { Size } from "../../types/theme/sizes";

function convertToSixDigitHex(hexColor: string): string {
    // Handle both 3-digit and 6-digit hex values
    if (hexColor.length === 4) { // 3-digit hex color
        const r = hexColor[1];
        const g = hexColor[2];
        const b = hexColor[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }
    return hexColor;
}

/**
 * darkens a hex color supporting 3 and 6 digit hex values
 * @param color string
 * @param amount number
 * @return string
 */
export const darkenHex = (color: string, amount: number) => {
    
	color = convertToSixDigitHex(color);
    const colorValue = parseInt(color.slice(1), 16);

    const r = (colorValue >> 16) & 0xFF;
    const g = (colorValue >> 8) & 0xFF;
    const b = colorValue & 0xFF;

    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);

    const newColorValue = (newR << 16) | (newG << 8) | newB;

    return `#${newColorValue.toString(16).padStart(6, '0')}`;
}

/**
 * darkens a rgb or rgba color
 * @param color 
 * @param amount 
 */
export const darkenRGB = (color: string, amount: number) => {
	const rgb = color.replace('rgba(', '').replace('rgb(', '').replace(')', '').split(',');
	const r = parseInt(rgb[0]) - amount;
	const g = parseInt(rgb[1]) - amount;
	const b = parseInt(rgb[2]) - amount;
	return `rgba(${r}, ${g}, ${b})`;
}

/**
 * 
 */
export const darkenHSL = (color: string, amount: number) => {
	const hsl = color.replace('hsla(', '').replace('hsl(', '').replace(')', '').split(',');
	const h = parseInt(hsl[0]) - amount;
	const s = parseInt(hsl[1]) - amount;
	const l = parseInt(hsl[2]) - amount;
	return `hsla(${h}, ${s}, ${l})`;
}

/**
 * darkens the hex, rgba or hsl values
 * @param color string
 * @param amount number
 * @return string 
 */
export const darkenColor = (color: string, amount: number) => {

	if(color.startsWith('#')) {
		return darkenHex(color, amount);
	}

	if(color.startsWith('rgb')) {
		return darkenRGB(color, amount);
	}

	if(color.startsWith('hsl')) {
		return darkenHSL(color, amount);
	}

	return color;
}

type ResolveColorComputations = 'color' | 'hover' | 'press';

/**
 * resolves if the input is a color or not and returns a boolean.
 * @param input string
 * @param defaultShade number
 * @return string
 */
export const resolveColorInput = (input: string, ignoreComputation: Partial<Record<ResolveColorComputations, boolean>> = {
	color: false,
	hover: false,
	press: false
}): Record<ResolveColorComputations, string> => {

	// result with the type that returns the color, hover and press values as strings.
	// exclude the types that are excluded from the computation.
	const result: Record<string, string> = {};

	if(input.startsWith('#') || input.startsWith('rgb') || input.startsWith('hsl') || input.startsWith('var')) {
		
		if(!ignoreComputation.color) {
			result.color = input;
		}

		if(!ignoreComputation.hover) {
			result.hover = darkenColor(input, 11);
		}

		if(!ignoreComputation.press) {
			result.press = darkenColor(input, 22);
		}

		return result;
	}

	if(!input.includes('.')) {

		if(!ignoreComputation.color) {
			result.color = `var(--color-${input}-6)`;
		}

		if(!ignoreComputation.hover) {
			result.hover = `var(--color-${input}-7)`;
		}

		if(!ignoreComputation.press) {
			result.press = `var(--color-${input}-8)`;
		}

		return result;
	}

	const [color, shade] = input.split('.') as [string | undefined, string | undefined];
	const colorShade = shade ? parseInt(shade) : 6;
	const cssVariable = `var(--color-${color}-${colorShade})`;

	if(!ignoreComputation.color) {
		result.color = cssVariable;
	}

	if(!ignoreComputation.hover) {
		result.hover = colorShade < 9 ? `var(--color-${color}-${colorShade + 1})` : cssVariable;
	}

	if(!ignoreComputation.press) {
		result.press = colorShade < 8 ? `var(--color-${color}-${colorShade + 2})` : cssVariable;
	}

	return result;
}

/**
 * resolves the size input and returns a string.
 * @param size string | number
 * @return string
 */
export const resolveSize = (
	size: Size | number | string,
	cssvariable: string, 
	suffix: "rem" | "em" | "px"
) => {

	if(typeof size === 'number') {
		return `${size}${suffix}`;
	}

	if(['xs', 'sm', 'md', 'lg', 'xl'].includes(size)) {
		return `var(--${cssvariable}-${size})`;
	}

	return size;
}