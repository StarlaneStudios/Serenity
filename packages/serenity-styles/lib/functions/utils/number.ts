/**
 * Clamps a number between a minimum and maximum value.
 * @param num 
 * @param min 
 * @param max 
 * @returns number
 */
export const clamp = (num: number, min: number, max: number) => {
	return (num < min) ? min : (num > max) ? max : num;
};

/**
 * Pads a hex value with a leading zero if it is only one character long.
 * @param hex
 * @returns string
 */
export const padZero = (hex: string) => hex.length === 1 ? `0${hex}` : hex;