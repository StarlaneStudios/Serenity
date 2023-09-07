import { DEFAULT_COLORS } from "../constants/colors";
import { darkenColor, setColorOpacity } from "./colors";
import { resolveColor } from "./resolvers";

export const resolveWhiteVariant = (color: string, defaultShade?: number) => ({
	"text-color": resolveColor(color, defaultShade),
	"background-color": "#ffffff"
});

export const resolveTransparentVariant = (color: string, defaultShade?: number) => ({
	"text-color": resolveColor(color, defaultShade)
});

/**
 * 
 * @param color 
 * @param defaultShade 
 * @returns
 */
export const resolveLightVariant = (color: string, defaultShade?: number) => {

	const output = resolveColor(color, defaultShade);

	return {
		"text-color": output,
		"background-color": setColorOpacity(output, 0.1, DEFAULT_COLORS),
		"hover-color": setColorOpacity(output, 0.12, DEFAULT_COLORS)
	};
};

export const resolveOutlineVariant = (color: string, defaultShade?: number) => {

	const output = resolveColor(color, defaultShade);

	return {
		"text-color": output,
		"border-color": output,
		"hover-color": setColorOpacity(output, 0.12, DEFAULT_COLORS),
	};
}

export const resolveFilledVariant = (color: string, defaultShade?: number) => {

	const output = resolveColor(color, defaultShade);

	return {
		"text-color": "#ffffff",
		"background-color": output,
		"hover-color": darkenColor(output, 12),
		"active-color": darkenColor(output, 15)
	};
};

export const resolveSubtleVariant = (color: string, defaultShade?: number) => {

	const output = resolveColor(color, defaultShade);

	return {
		"text-color": output,
		"hover-color": setColorOpacity(output, 0.12, DEFAULT_COLORS)
	};
}