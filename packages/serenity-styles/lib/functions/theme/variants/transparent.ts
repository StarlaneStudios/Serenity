import { resolveColorInput } from "../color";

export const resolveTransparentVariant = (color: string, shade: number | undefined) => ({
	"text-color": resolveColorInput(color, shade)
});