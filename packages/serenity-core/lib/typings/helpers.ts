import { SerenityBaseProps } from "@serenity-ui/styles";

export type Maybe<T> = T | undefined | null;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
export type DefaultProps<T extends object> = Omit<{ [K in OptionalKeys<T>]: T[K] }, keyof SerenityBaseProps>;
