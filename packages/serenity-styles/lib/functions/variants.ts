import { DEFAULT_COLORS } from "../constants/colors";
import { darkenColor, isColorLight, setColorOpacity } from "./colors";
import { resolveColor } from "./resolvers";

export interface VariantResolver {
	(color: string, interactive: boolean): Record<string, string | undefined>;
}

export const resolveWhiteVariant: VariantResolver = (color) => ({
	"text-color": resolveColor(color, 6),
	"background-color": "#ffffff"
});

export const resolveTransparentVariant: VariantResolver = (color) => ({
	"text-color": resolveColor(color, 6)
});

export const resolveLightVariant: VariantResolver = (color, interactive = true) => {

	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"background-color": setColorOpacity(output, 0.1, DEFAULT_COLORS),
	};

	if (interactive) {
		base['hover-color'] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};

export const resolveOutlineVariant: VariantResolver = (color, interactive = true) => {

	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"border-color": output
	};

	if (interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};

export const resolveFilledVariant: VariantResolver = (color, interactive = true) => {

	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": isColorLight(output) ? "#000" : "#fff",
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

export const resolveSubtleVariant: VariantResolver = (color, interactive = true) => {

	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
	};

	if (interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS);
	}

	return base;
};
