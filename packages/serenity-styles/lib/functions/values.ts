import { SIZE_UNITS } from "../constants/values";
import { Color } from "../types/theme";
import { Length } from "../types/values";
import { resolveColorInput } from "./theme/color";
import { $var } from "./theme/css";

export function rem(value: number): string {
	return `${value}rem`;
}

export function parseLength(value: Length): string {

	if (typeof value == 'number') {
		return rem(value);
	}

	if (SIZE_UNITS.includes(value as any)) {
		return $var(`size-${value}`); 

	}

	return value;
}

export function parseColor(value: Color): string | undefined {
	return resolveColorInput(value);
}