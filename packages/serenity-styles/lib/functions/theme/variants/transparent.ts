import { resolveColorInput } from "../color";

export const resolveTransparentVariant = (color: string, defaultShade: number) => ({
	"text-color": resolveColorInput(color, defaultShade)
});