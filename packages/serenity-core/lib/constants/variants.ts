import { Color, Variant, resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSubtleVariant, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";

export const variants: Record<
	Variant,
	(color: Color, interactive: boolean) => Record<string, any>
> = {
	default: (_) => ({}),
	light: (color, interactive) => resolveLightVariant(color, 6, interactive),
	outline: (color, interactive) => resolveOutlineVariant(color, 6, interactive),
	transparent: (color) => resolveTransparentVariant(color!, 6),
	white: (color) => resolveWhiteVariant(color, 6),
	filled: (color, interactive) => resolveFilledVariant(color, 6, interactive),
	subtle: (color, interactive) => resolveSubtleVariant(color, 6, interactive)
};