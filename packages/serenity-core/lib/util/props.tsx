/**
 * Converts any value to a boolean HTML attribute
 * 
 * @param value The value value
 * @returns Empty string or undefined
 */
export function bool(value: any) {
	return value ? '' : undefined;
}