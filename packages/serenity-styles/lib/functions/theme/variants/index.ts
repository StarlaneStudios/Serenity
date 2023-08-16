import { DEFAULT_COLORS } from "../../../constants/color";
import { darkenColor, resolveColorInput, setColorOpacity } from "../color";

export const resolveWhiteVariant = (color: string, defaultShade?: number) => ({
	"text-color": resolveColorInput(color, defaultShade),
	"background-color": "#ffffff"
});

export const resolveTransparentVariant = (color: string, defaultShade?: number) => ({
	"text-color": resolveColorInput(color, defaultShade)
});

/**
 * 
 * @param color 
 * @param defaultShade 
 * @returns
 */
export const resolveLightVariant = (color: string, defaultShade?: number) => {

	const output = resolveColorInput(color, defaultShade);

	return {
		"text-color": output,
		"background-color": setColorOpacity(output, 0.1, DEFAULT_COLORS),
		"hover-color": setColorOpacity(output, 0.12, DEFAULT_COLORS)
	};
};

export const resolveOutlineVariant = (color: string, defaultShade?: number) => {

	const output = resolveColorInput(color, defaultShade);

	return {
		"text-color": output,
		"border-color": output,
		"hover-color": setColorOpacity(output, 0.12, DEFAULT_COLORS),
	};
}

export const resolveFilledVariant = (color: string, defaultShade?: number) => {

	const output = resolveColorInput(color, defaultShade);

	return {
		"text-color": "#ffffff",
		"background-color": output,
		"hover-color": darkenColor(output, 12),
		"active-color": darkenColor(output, 15)
	};
};