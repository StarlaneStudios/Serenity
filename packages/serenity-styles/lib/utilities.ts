import { parseColor, parseLength } from './functions/values';
import type { JSX } from 'solid-js';
import type { UtilityStyleProps } from './types/props';

type UtilityParsers = Partial<Record<keyof UtilityStyleProps, (arg: any) => string | undefined>>;

export const UTILITY_NAMES = [
	'm', 'my', 'mx', 'mt', 'mb', 'mr', 'ml',
	'p', 'py', 'px', 'pt', 'pb', 'pl', 'pr',
	'bg',
	'tc',
	'w', 'miw', 'maw',
	'h', 'mih', 'mah',
	'pos',
	'top', 'left', 'bottom', 'right',
	'inset',
	'flex',
	'display',
	'cursor',
	'z',
] as const;

export const UTILITY_PARSERS: UtilityParsers  = {
	'm': parseLength,
	'mt': parseLength,
	'mb': parseLength,
	'ml': parseLength,
	'mr': parseLength,
	'mx': parseLength,
	'my': parseLength,
	'p': parseLength,
	'pt': parseLength,
	'pb': parseLength,
	'pl': parseLength,
	'pr': parseLength,
	'px': parseLength,
	'py': parseLength,
	'w': parseLength,
	'miw': parseLength,
	'maw': parseLength,
	'h': parseLength,
	'mih': parseLength,
	'mah': parseLength,
	'top': parseLength,
	'left': parseLength,
	'bottom': parseLength,
	'right': parseLength,
	'inset': parseLength,
	'bg': parseColor,
	'tc': parseColor
};

/**
 * Build style related props for a component. The resulting object
 * is expected to be spread into the component's root element.
 * 
 * @param utils Provided utility props
 * @param style Additional styles to merge and apply
 * @returns Spreadable props
 */
export function buildStyles<
	S extends string | JSX.CSSProperties | undefined,
	U extends UtilityStyleProps
>(utils: U, ...style: S[]) {
	const variables: Record<string, string | undefined> = {};
	const keys: string[] = [];

	for (const key in utils) {

		const value = utils[key] as string;
		const parser = UTILITY_PARSERS[key as keyof UtilityParsers];

		variables[`--serenity-util-${key}`] = parser ? parser(value) : value;
		keys.push(key);
	}

	return {
		style: Object.assign(variables, ...style),
		'data-style': keys.length > 0 ? `-${keys.join('-')}-` : undefined
	};
}