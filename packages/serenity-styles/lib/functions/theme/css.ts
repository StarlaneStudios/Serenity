import { Tuple } from "@serenity-ui/utils";
import { Size, UnitType, UnitValue } from "../../types/theme";

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
export function cssvars<T extends Record<string, string | undefined | null>>(map: T): T {

	if (!map) {
		return {} as T;
	}

	const variables = {} as Record<string, any>;
	const keys = Object.keys(map);
	const length = keys.length;

	for (let i = 0; i < length; i++) {
		const key = keys[i];
		const value = map[key];

		if (value) {
			variables[`--${key}`] = value;
		}
	}

	return variables as T;
};

/**
 * resolves the size input dynamically or as constant and returns a string.
 * 
 * @param size Size | number
 * @return string
 */
export function resolveSize(varName: string, size: Size | number, unit: UnitType) {

	if (typeof size === 'number') {
		return `${size}${unit}`;
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
		return `${spacing}${unit}`;
	}

	if(Array.isArray(spacing)) {
		
		const x = resolveSize(varName, spacing[0], unit);
		const y = resolveSize(varName, spacing[1], unit);

		return `${x} ${y}`;
	}

	return resolveModifier(varName, spacing);
}

/**
 * Resolves the grid columns input and returns a string.
 * @param breakpoints
 * @returns string
 */
export function resolveGridCols(breakpoints: Record<Size, number>) {

	const keys = Object.keys(breakpoints) as Size[];
	const variables = {} as Record<string, any>;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = breakpoints[key];

		if (value) {
			variables[`--cols-${key}`] = value;
		}
	}

	return variables;
}