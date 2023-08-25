import { Tuple } from "@serenity-ui/utils";
import { Size } from "../../types/theme";

/**
 * Combines multiple class names into a single string.
 * @param args 
 * @returns 
 */
export const cx = (...args: (string | false | undefined)[]) => {
	return args.filter(Boolean).join(' ');
};

/**
 * Converts a map of CSS variables into a string.
 * @param map
 */
export const cssvars = <T extends Record<string, string | undefined | null>>(map: T): T => {

	if (!map) {
		return {} as T;
	}

	const variables = {} as Record<string, any>;
	const keys = Object.keys(map);
	const length = keys.length;

	for (let i = 0; i < length; i++) {
		const key = keys[i];
		const value = map[key];

		if (value !== undefined) {
			variables[`--${key}`] = value;
		}
	}

	return variables as T;
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

/**
 * resolves the grid spacing input and returns a string.
 * @param spacing
 * @return string
 */
export const resolveGridSpacing = (spacing: Size | number | Tuple<Size | number, 2>, cssvariable: string, unit: "px" | "rem" | "em") => {

	if(typeof spacing === 'number') {
		return `${spacing}${unit}`;
	}

	if(Array.isArray(spacing)) {
		
		const x = resolveSize(spacing[0], cssvariable, unit);
		const y = resolveSize(spacing[1], cssvariable, unit);

		return `${x} ${y}`;
	}

	return `var(--${cssvariable}-${spacing})`;
}

/**
 * 
 */
export const resolveGridCols = (
	breakpoints: Record<Size, number>,
	cols: number,
	cssvariable: string
) => {

	const keys = Object.keys(breakpoints) as Size[];
	const variables = {} as Record<string, any>;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = breakpoints[key];

		if (value) {
			variables[`--${cssvariable}-${key}`] = value;
		}
	}

	return variables;
}