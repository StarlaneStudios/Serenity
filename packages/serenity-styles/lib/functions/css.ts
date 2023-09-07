import { JSX } from "solid-js/jsx-runtime";

/**
 * Returns a namespaced CSS variable
 * 
 * @param name The variable name
 * @returns The CSS value
 */
export function v(name: string, namespace = 'serenity') {
	return `var(--${namespace}-${name})`;
}

/**
 * Combines multiple class names into a single string.
 * 
 * @param args The class names
 * @returns The combined class names
 */
export function c(...args: (string | false | undefined)[]) {
	return args.filter(Boolean).join(' ');
}

/**
 * Converts any value to a boolean HTML attribute
 * 
 * @param value The value value
 * @returns Empty string or undefined
 */
export function b(value: any) {
	return value ? '' : undefined;
}

/**
 * Converts a map of CSS variables into a style object
 * 
 * @param map The CSS variables
 */
export function localVars<T extends Record<string, string | undefined | number | null>>(map: T): JSX.CSSProperties {
	if (!map) {
		return {};
	}

	const variables: Record<string, any> = {};

	for (const key in map) {
		const value = map[key];

		if (value) {
			variables[`--${key}`] = value;
		}
	}

	return variables;
};