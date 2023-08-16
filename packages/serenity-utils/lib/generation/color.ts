import type { Tuple } from "../types/tuple";

/**
 * generate color variables for the provider to use in the theme
 * @param colors
 */
export function* generateColorVariables(colors: Record<string, Tuple<string, 10>>, scope: string = 'serenity') {

	for(const color in colors) {

		for(const [index, value] of colors[color].entries()) {
			yield [`--${scope}-${color}-${index}`, value];
		}
	}
}