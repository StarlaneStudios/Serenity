import { resolveColor, resolveLength } from "../functions/resolvers";
import { Color } from "../types/theme";
import { Length } from "../types/values";

export function parseSpacing(value: Length): string | undefined {
	return resolveLength('spacing', value);
}

export function parseColor(value: Color): string | undefined {
	return resolveColor(value);
}