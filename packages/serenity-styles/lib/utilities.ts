import { type JSX, splitProps } from 'solid-js';
import { parseLength } from './functions/values';
import { UtilityStyleProps } from './types/props';

export const UTILITY_STYLE_PROPS = [
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

function use<T, R>(value: T | undefined, parse?: (arg: T) => R): any {
	return value === undefined ? undefined : (parse ? parse(value) : value);
}

function makeBaseStyle(utils: UtilityStyleProps): JSX.CSSProperties {
	return {
		'margin': use(utils.m, parseLength),
		'margin-top': use(utils.mt, parseLength),
		'margin-bottom': use(utils.mb, parseLength),
		'margin-left': use(utils.ml, parseLength),
		'margin-right': use(utils.mr, parseLength),
		'margin-inline': use(utils.mx, parseLength),
		'margin-block': use(utils.my, parseLength),
		'padding': use(utils.p, parseLength),
		'padding-top': use(utils.pt, parseLength),
		'padding-bottom': use(utils.pb, parseLength),
		'padding-left': use(utils.pl, parseLength),
		'padding-right': use(utils.pr, parseLength),
		'padding-inline': use(utils.px, parseLength),
		'padding-block': use(utils.py, parseLength),
		'background-color': use(utils.bg),
		'color': use(utils.tc),
		'width': use(utils.w, parseLength),
		'min-width': use(utils.miw, parseLength),
		'max-width': use(utils.maw, parseLength),
		'height': use(utils.h, parseLength),
		'min-height': use(utils.mih, parseLength),
		'max-height': use(utils.mah, parseLength),
		'position': utils.pos,
		'top': use(utils.top, parseLength),
		'left': use(utils.left, parseLength),
		'bottom': use(utils.bottom, parseLength),
		'right': use(utils.right, parseLength),
		'inset': use(utils.inset, parseLength),
		'flex': use(utils.flex),
		'display': use(utils.display),
		'cursor': use(utils.cursor),
		'z-index': use(utils.z)
	} satisfies JSX.CSSProperties;
}

export type SplitPropsWithStyle<T, K extends (readonly (keyof T)[])[]> = [
	JSX.CSSProperties,
    ...{
        [P in keyof K]: P extends `${number}` ? Pick<T, Extract<K[P], readonly (keyof T)[]>[number]> : never;
    },
    Omit<T, K[number][number]>
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
	const [utils, ...rest] = splitProps(props as any, UTILITY_STYLE_PROPS, ...keys);

	return [makeBaseStyle(utils), ...rest] as any;
}