import type { Component, JSX, ComponentProps } from "solid-js";
import { SerenityBaseProps } from "./props";

export type ElementType<TProps = {}> = keyof JSX.IntrinsicElements | Component<TProps>;

export type BasePolymorphicProps<
	TProps extends Object,
	TElement extends ElementType<TProps>
> = TProps & {
	as?: TElement | ElementType<TProps>;
	children?: JSX.Element;
	style?: JSX.CSSProperties;
	class?: string | undefined;
} & SerenityBaseProps;

export type PolymorphicProps<
	TProps extends Object,
	TElement extends ElementType<TProps>
> = BasePolymorphicProps<TProps, TElement> & Omit<
	ComponentProps<TElement>, 
	keyof BasePolymorphicProps<TProps, TElement>
>;