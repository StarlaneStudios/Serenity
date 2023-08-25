/**
 * Returns a CSS variable name.
 * @param name 
 * @returns 
 */
export function $var(name: string, scope?: string) {	
	return `var(--${name})`;
}