/**
 * Resolve border value and try to resolve for css classes
 * @param border 
 * @returns 
 */
export const resolveBorder = (border?: boolean | string[]): string | undefined => {

	if(!border) {
		return undefined;
	}else if(typeof border === "boolean") {
		return border ? "trbl" : undefined;
	}

	return border.join("");
}