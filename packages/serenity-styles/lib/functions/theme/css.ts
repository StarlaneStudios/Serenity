import { Size } from "../../types/theme";

/**
 * Combines multiple class names into a single string.
 * @param args 
 * @returns 
 */
export const cx = (...args: (string | undefined)[]) => {
	return args.filter(Boolean).join(' ');
};

/**
 * Converts a map of CSS variables into a string.
 * @param map
 */
export const cssvars = (map: Record<string, string | undefined>): Record<string, any> => {

	if (!map) {
		return {};
	}

	const variables: Record<string, any> = {};
	const keys = Object.keys(map);
	const length = keys.length;

	for (let i = 0; i < length; i++) {
		const key = keys[i];
		const value = map[key];

		if (value !== undefined) {
			variables[`--${key}`] = value;
		}
	}

	return variables;
};

/**
 * resolves the size input and returns a string.
 * @param size string | number
 * @return string
 */
export const resolveSize = (
	size: Size | number | string,
	cssvariable: string,
	unit: "rem" | "em" | "px"
) => {

	if (typeof size === 'number') {
		return `${size}${unit}`;
	}

	return `var(--${cssvariable}-${size})`;
};

/**
 * Resolves the shadow input and returns a css variable.
 * @param shadow
 * @returns string
 */
export const resolveShadow = (shadow: Size | undefined): string | undefined => {

	if(!shadow) {
		return undefined;
	}

	return `var(--serenity-shadow-${shadow})`;
}