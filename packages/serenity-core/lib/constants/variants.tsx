import { Variant } from "../typings/values";
import { resolveColor } from "../utils/resolvers";

interface VariantResolver {
	(color: string, interactive: boolean): Record<string, string | undefined>;
}

const resolveWhiteVariant: VariantResolver = (color) => ({
	"text-color": resolveColor(color, 6),
	"background-color": "#ffffff"
});

const resolveTransparentVariant: VariantResolver = (color) => ({
	"text-color": resolveColor(color, 6)
});

const resolveLightVariant: VariantResolver = (color, interactive = true) => {
	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"background-color": setColorOpacity(output, 0.1, DEFAULT_COLORS), // TODO mix-color
	};

	if (interactive) {
		base['hover-color'] = setColorOpacity(output, 0.12, DEFAULT_COLORS); // TODO mix-color
	}

	return base;
};

const resolveOutlineVariant: VariantResolver = (color, interactive = true) => {
	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
		"border-color": output
	};

	if (interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS); // TODO mix-color
	}

	return base;
};

const resolveFilledVariant: VariantResolver = (color, interactive = true) => {
	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": "#fff",
		"background-color": output,
	};

	if (interactive) {
		Object.assign(base, {
			"hover-color": darkenColor(output, 12), // TODO mix-color
			"active-color": darkenColor(output, 15) // TODO mix-color
		});
	}

	return base;
};

const resolveSubtleVariant: VariantResolver = (color, interactive = true) => {
	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": output,
	};

	if (interactive) {
		base["hover-color"] = setColorOpacity(output, 0.12, DEFAULT_COLORS); // TODO mix-color
	}

	return base;
};

export const VARIANTS: Record<Variant, VariantResolver> = {
	default: () => ({}),
	light: resolveLightVariant,
	outline: resolveOutlineVariant,
	transparent: resolveTransparentVariant,
	white: resolveWhiteVariant,
	filled: resolveFilledVariant,
	subtle: resolveSubtleVariant
};