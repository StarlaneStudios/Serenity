import { Tuple } from "@serenity-ui/utils";
import { Length, Size, UnitType } from "../types/values";
import { JSX } from "solid-js/jsx-runtime";
import { Color } from "../types/theme";
import { DEFAULT_COLORS } from "../constants/colors";
import { v } from "./css";
import { isSize } from "./helpers";

/**
 * Resolve the input as a length value
 * 
 * @param varName The variable name to use for Size values
 * @param length The size value
 * @param unit The unit type
 */
export function resolveLength(varName: string, length: Length | undefined, unit: UnitType = 'rem') {
	if (length == undefined) {
		return undefined;
	}

	if (typeof length === 'number') {
		return length + unit;
	}

	if (isSize(length)) {
		return resolveSize(varName, length);
	}

	return length;
}

/**
 * Returns a modifier variable with a name and value
 * 
 * @param name The variable name
 * @param size The variable value
 * @return string
 */
export function resolveSize(name: string, size: Size) {
	return v(`${name}-${size}`);
}

/**
 * Resolves the shadow input and returns a css variable.
 * @param value
 * @returns string
 */
export function resolveShadow(value: Size | undefined): string | undefined {

	if(!value) {
		return undefined;
	}

	return resolveSize('shadow', value);
}

/**
 * resolves the grid spacing input and returns a string.
 * @param spacing
 * @return string
 */
export function resolveGridSpacing(
	spacing: Size | number | Tuple<Size | number, 2>,
	varName: string,
	unit: UnitType
) {

	if(typeof spacing === 'number') {
		return spacing + unit;
	}

	if(Array.isArray(spacing)) {
		
		const block = resolveLength(varName, spacing[0], unit);
		const inline = resolveLength(varName, spacing[1], unit);

		return `${block} ${inline}`;
	}

	return resolveSize(varName, spacing);
}

/**
 * Resolves the grid columns input and returns a string.
 * @param breakpoints
 * @returns string
 */
export function resolveGridCols(breakpoints: Record<Size, number>): JSX.CSSProperties {

	const variables = {} as Record<string, any>;

	for (const key in breakpoints) {
		const value = breakpoints[key as Size];

		if (value) {
			variables[`--cols-${key}`] = value;
		}
	}

	return variables;
}

/**
 * Resolves the color input and returns a string.
 * 
 * @param input string
 * @param defaultShade number
 * @return string
 */
export function resolveColor(input: string, defaultShade: number = 6) {

	if (input.startsWith('#') || input.startsWith('hsl') || input.startsWith('rgb')) {
		return input;
	}

	const [color, shade] = input.split('.');
	const base = DEFAULT_COLORS[color];

	if (!base) {
		return input;
	}
	else if (!shade) {
		return base[defaultShade];
	}

	return base[+shade];
};