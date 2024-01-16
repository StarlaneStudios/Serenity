import { Variant } from "../typings/values";
import { darken, opacitize } from "../utils/css";
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
		"background-color": opacitize(output, 90)
	};

	if (interactive) {
		base['hover-color'] = opacitize(output, 88);
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
		base["hover-color"] = opacitize(output, 12);
	}

	return base;
};

const resolveFilledVariant: VariantResolver = (color, interactive = true) => {
	const output = resolveColor(color, 6);
	const base: Record<string, string | undefined> = {
		"text-color": "#fff",
		"background-color": output
	};

	if (interactive) {
		Object.assign(base, {
			"hover-color": darken(output, 12),
			"active-color": darken(output, 15)
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
		base["hover-color"] = opacitize(output, 88);
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