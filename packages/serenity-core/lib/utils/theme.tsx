import { Color } from "../typings/theme";
import { v } from "./css";

/**
 * When passed a color value, returns the CSS color pointing
 * to the specified color and shade.
 * 
 * @param name The serenity color name with optional shade
 * @param defaultShade A fallback shade
 * @return CSS color
 */
export function getThemeColor(name: Color, defaultShade: number = 6) {
	if (!name.includes('.')) {
		return v(`color-${name}-${defaultShade}`);
	}

	const [base, shade] = name.split('.');

	return v(`color-${base}-${shade}`);
}