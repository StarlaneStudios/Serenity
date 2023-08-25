import { Variant, resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSubtleVariant, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";

export const variants = new Map([
	["default", (_: string) => ({})],
	["light", (color: string) => resolveLightVariant(color, 6)],
	["outline", (color: string) => resolveOutlineVariant(color, 6)],
	["transparent", (color: string) => resolveTransparentVariant(color!, 6)],
	["white", (color: string) => resolveWhiteVariant(color, 6)],
	["filled", (color: string) => resolveFilledVariant(color, 6)],
	["subtle", (color: string) => resolveSubtleVariant(color, 6)]
]) as Map<Variant, (color: string) => any>;