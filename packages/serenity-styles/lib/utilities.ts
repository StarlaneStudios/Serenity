import { type JSX, splitProps } from 'solid-js';
import { parseLength } from './functions/values';
import { UtilityStyleProps } from './types/props';
import { $var } from './functions/theme/css';

type UtilityParsers = Partial<Record<keyof UtilityStyleProps, (arg: any) => string>>;

const UTILITY_NAMES = [
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

const UTILITY_PARSERS: UtilityParsers  = {
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
};

export type SplitPropsWithStyle<T, K extends (readonly (keyof T)[])[]> = [
	JSX.CSSProperties,
    ...{
        [P in keyof K]: P extends `${number}` ? Pick<T, Extract<K[P], readonly (keyof T)[]>[number]> : never;
    },
    Omit<T, K[number][number]> & { 'data-style': string }
];

/**
 * Modified version of `splitProps` which returns the style object as the first element in the tuple.
 * 
 * @param props The props to split
 * @param keys The keys to split the props by
 * @returns A tuple containing the style object, the split props, and rest of the props
 */
export function splitPropsWithStyle<
	T extends Record<any, any>,
	K extends [readonly (keyof T)[], ...(readonly (keyof T)[])[]]
>(props: T, ...keys: K): SplitPropsWithStyle<T, K> {
	const [utils, ...rest] = splitProps(props, UTILITY_NAMES, ...keys);
	const style: Record<string, string> = {};
	const ids: string[] = [];

	for (const [key, value] of Object.entries(utils)) {
		const parser = UTILITY_PARSERS[key as keyof UtilityParsers];
		const parsed = parser ? parser(value) : value as string;
		
		style[`--serenity-util-${key}`] = parsed;

		ids.push(key);
	}

	const attr = `-${ids.join('-')}-`;
	const other = {
		...rest.pop(),
		'data-style': attr,
	}

	return [style, ...rest, other] as any;
}