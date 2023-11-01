import { resolveColor, resolveLength } from "../utils/resolvers";
import { Color } from "../typings/theme";
import { Length } from "../typings/values";

export function parseSpacing(value: Length): string | undefined {
	return resolveLength('spacing', value);
}

export function parseColor(value: Color): string | undefined {
	return resolveColor(value);
}