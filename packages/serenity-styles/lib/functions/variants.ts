import { DEFAULT_COLORS } from "../constants/colors";
import { darkenColor, setColorOpacity } from "./colors";
import { resolveColor } from "./resolvers";

export const resolveWhiteVariant = (
	color: string, 
	defaultShade?: number
) => ({
	"text-color": resolveColor(color, defaultShade),
	"background-color": "#ffffff"
});

export const resolveTransparentVariant = (
	color: string, 
	defaultShade?: number
) => ({
	"text-color": resolveColor(color, defaultShade)
});

/**
 * 
 * @param color 
 * @param defaultShade 
 * @returns
 */
export const resolveLightVariant = (
	color: string, 
	defaultShade?: number, 
	interactive = true
) => {

	const output = resolveColor(color, defaultShade);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"background-color": setColorOpacity(output, 0.1, DEFAULT_COLORS),
	};

	if (interactive) {
		base['hover-color'] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};

export const resolveOutlineVariant = (
	color: string,
	defaultShade?: number,
	interactive = true
) => {

	const output = resolveColor(color, defaultShade);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"border-color": output
	};

	if (interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};

export const resolveFilledVariant = (
	color: string,
	defaultShade?: number,
	interactive = true
) => {

	const output = resolveColor(color, defaultShade);
	const base: Record<string, string | undefined> = {
		"text-color": "#ffffff",
		"background-color": output,
	};

	if (interactive) {
		Object.assign(base, {
			"hover-color": darkenColor(output, 12),
			"active-color": darkenColor(output, 15)
		});
	}

	return base;
};

export const resolveSubtleVariant = (
	color: string, 
	defaultShade?: number,
	interactive = true
) => {

	const output = resolveColor(color, defaultShade);
	const base: Record<string, string | undefined> = {
		"text-color": output,
	};

	if(interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};