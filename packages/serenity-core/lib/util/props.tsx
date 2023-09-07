/**
 * Converts a boolean value to a HTML attribute
 * 
 * @param value The boolean value
 * @returns Empty string or undefined
 */
export function bool(value: boolean | undefined | null) {
	return value ? '' : undefined;
}