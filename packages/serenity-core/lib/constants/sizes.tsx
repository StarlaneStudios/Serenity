import { Size } from "../typings/values";

export const SIZE_UNITS: Size[] = [
	'xl',
	'lg',
	'md',
	'sm',
	'xs'
]

/**
 * Returns whether the input is a valid size value
 */
export function isSize(input: any): input is Size {
	return SIZE_UNITS.includes(input);
}