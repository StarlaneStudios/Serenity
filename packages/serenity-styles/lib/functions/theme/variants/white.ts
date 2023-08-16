import { resolveColorInput } from "../color";

export const resolveWhiteVariant = (color: string, defaultShade: number) => {

	return {
		"text-color": resolveColorInput(color, defaultShade),
		"background-color": "#ffffff"
	};
};