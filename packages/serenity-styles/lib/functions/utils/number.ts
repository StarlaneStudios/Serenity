/**
 * Clamps a number between a minimum and maximum value.
 * @param num 
 * @param min 
 * @param max 
 * @returns number
 */
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(min, num), max);