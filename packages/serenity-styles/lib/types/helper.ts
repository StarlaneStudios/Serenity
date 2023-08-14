export type OmitByValue<T, V> = {
	[K in keyof T as T[K] extends V ? never : K]: T[K];
};