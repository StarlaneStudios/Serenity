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
	return Object.entries(map).reduce((acc, [key, value]) => {

		if(!value) {
			return acc;
		}

		acc[`--${key}`] = value;
		return acc;
	}, {} as Record<string, any>);
};