/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(num: number, min: number, max: number) {
	return Math.max(min, Math.min(num, max));
}

/**
 * Pads a hex value with a leading zero if it is only one character long.
 */
export function padZero(hex: string) {
	return hex.length === 1 ? `0${hex}` : hex;
}