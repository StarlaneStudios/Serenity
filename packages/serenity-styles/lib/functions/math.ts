/**
 * Clamps a number between a minimum and maximum value.
 * 
 * @param num 
 * @param min 
 * @param max 
 * @returns number
 */
export function clamp(num: number, min: number, max: number) {
	return (num < min) ? min : (num > max) ? max : num;
}

/**
 * Pads a hex value with a leading zero if it is only one character long.
 * 
 * @param hex
 * @returns string
 */
export function padZero(hex: string) {
	return hex.length === 1 ? `0${hex}` : hex;
}