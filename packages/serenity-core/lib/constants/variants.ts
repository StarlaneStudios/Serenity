import { Variant, VariantResolver, resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSubtleVariant, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";

export const variants: Record<Variant, VariantResolver> = {
	default: () => ({}),
	light: resolveLightVariant,
	outline: resolveOutlineVariant,
	transparent: resolveTransparentVariant,
	white: resolveWhiteVariant,
	filled: resolveFilledVariant,
	subtle: resolveSubtleVariant
};