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
 * Handles the style strategy wether it needs to be extended or replaced.
 * 
 * @param args 
 * @param strategy 
 * @returns The handled style 
 */
export function s(strategy: 'extend' | 'replace', ...args: (string | false | undefined)[]) {
	return strategy === 'extend' ? c(...args) : args.filter(Boolean).pop() || undefined;
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
	const variables: Record<string, any> = {};

	for (const key in map) {
		const value = map[key];

		if (value) {
			variables[`--${key}`] = value;
		}
	}

	return variables;
};

/**
 * Create a mix-color function that lightens a color.
 * 
 * @param color The color value
 * @param percentage The amount to lighten
 */
export function lighten(color: string, percentage: number) {
	return `color-mix(in srgb, ${color}, white ${percentage}%)`
}

/**
 * Create a mix-color function that darkens a color.
 * 
 * @param color The color value
 * @param percentage The amount to darken
 */
export function darken(color: string, percentage: number) {
	return `color-mix(in srgb, ${color}, black ${percentage}%)`
}

/**
 * Create a mix-color function that adds alpha to a color.
 * 
 * @param color The color value
 * @param percentage The amount to opacitize
 */
export function opacitize(color: string, percentage: number) {
	return `color-mix(in srgb, ${color}, transparent ${percentage}%)`
}