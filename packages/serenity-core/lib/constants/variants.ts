import { Variant, resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSubtleVariant, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";

export const variants: Record<
	Variant,
	(color: string, interactive: boolean) => Record<string, any>
> = {
	default: () => ({}),
	light: resolveLightVariant,
	outline: resolveOutlineVariant,
	transparent: resolveTransparentVariant,
	white: resolveWhiteVariant,
	filled: resolveFilledVariant,
	subtle: resolveSubtleVariant
};