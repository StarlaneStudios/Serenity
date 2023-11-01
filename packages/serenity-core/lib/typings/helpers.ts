import { SerenityBaseProps } from "./props";

export type Maybe<T> = T | undefined | null;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
export type DefaultProps<T extends object> = Omit<{ [K in OptionalKeys<T>]: T[K] }, keyof SerenityBaseProps>;

export type StylesProps<K extends string> = Partial<Record<K, string>>;

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;

export type Tuple<T, N extends number> = N extends N
	? number extends N
	? T[]
	: _TupleOf<T, N, []>
	: never;