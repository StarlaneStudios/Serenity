import { resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSubtleVariant, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";

/** @deprecated use other one */
export type Variant = "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";

export const variants = new Map<Variant, (color: string) => Record<string, string>>([
	["default", (_: string) => ({})],
	["light", (color: string) => resolveLightVariant(color, 6)],
	["outline", (color: string) => resolveOutlineVariant(color, 6)],
	["transparent", (color: string) => resolveTransparentVariant(color!, 6)],
	["white", (color: string) => resolveWhiteVariant(color!, 6)],
	["filled", (color: string) => resolveFilledVariant(color, 6)],
	["subtle", (color: string) => resolveSubtleVariant(color, 6)]
]);