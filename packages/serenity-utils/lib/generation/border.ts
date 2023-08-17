/**
 * Resolve border value and try to resolve for css classes
 * @param border 
 * @returns 
 */
export const resolveBorder = (border?: boolean | Record<string, any>): string | undefined => {

	if(!border) {
		return undefined;
	}

	if(typeof border === "boolean") {
		return border ? "true" : undefined;
	}

	return Object.keys(border).join("");
}