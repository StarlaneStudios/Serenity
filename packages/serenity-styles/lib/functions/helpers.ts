import { SIZE_UNITS } from "../constants/values";
import { Size } from "../types/values";

/**
 * Returns whether the input is a valid size value
 */
export function isSize(input: any): input is Size {
	return SIZE_UNITS.includes(input);
}