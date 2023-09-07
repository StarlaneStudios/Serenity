import { Tuple } from "@serenity-ui/utils";
import { Size, UnitType } from "../../types/values";
import { JSX } from "solid-js/jsx-runtime";

/**
 * Returns a namespaced CSS variable
 * 
 * @param name The variable name
 * @returns The CSS value
 */
export function $var(name: string, namespace = 'serenity') {	
	return `var(--${namespace}-${name})`;
}

/**
 * Combines multiple class names into a single string.
 * @param args 
 * @returns 
 */
export function cx(...args: (string | false | undefined)[]) {
	return args.filter(Boolean).join(' ');
}

/**
 * Converts a map of CSS variables into a string.
 * @param map
 */
export function cssvars<T extends Record<string, string | undefined | number | null>>(map: T): JSX.CSSProperties {

	if (!map) {
		return {};
	}

	const variables: Record<string, any> = {};

	for (const key in map) {
		const value = map[key];

		if (value) {
			variables["--" + key] = value;
		}
	}

	return variables;
};

/**
 * resolves the size input dynamically or as constant and returns a string.
 * 
 * @param size Size | number | undefined
 * @return string | undefined
 */
export function resolveSize(varName: string, size: Size | number | undefined, unit: UnitType) {
	if (size == undefined) {
		return undefined;
	}

	if (typeof size === 'number') {
		return size + unit;
	}

	return resolveModifier(varName, size);
}

/**
 * Returns a modifier variable with a name and value
 * 
 * @param name The variable name
 * @param value The modifier value
 * @return string
 */
export function resolveModifier(name: string, value: string) {
	return $var(`${name}-${value}`);
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

	return resolveModifier('shadow', value);
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
		
		const block = resolveSize(varName, spacing[0], unit);
		const inline = resolveSize(varName, spacing[1], unit);

		return `${block} ${inline}`;
	}

	return resolveModifier(varName, spacing);
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
			variables["--cols-" + key] = value;
		}
	}

	return variables;
}