import type { SerenityBaseProps } from "@serenity-ui/styles";
import type { Component, JSX, ComponentProps } from "solid-js";

export type ElementType<TProps extends unknown = unknown> = keyof JSX.IntrinsicElements | Component<TProps>;

export type BasePolymorphicProps<
	TProps extends unknown,
	TElement extends ElementType<TProps>
> = TProps & {
	as?: TElement | keyof JSX.IntrinsicElements;
	children?: JSX.Element;
	style?: JSX.CSSProperties;
	class?: string | undefined;
} & SerenityBaseProps;

export type PolymorphicProps<
	TProps extends unknown,
	TElement extends ElementType<TProps>
> = BasePolymorphicProps<TProps, TElement> & Omit<
	ComponentProps<TElement>, 
	keyof BasePolymorphicProps<TProps, TElement>
>;

export type TagOrOther<
	TProps extends unknown, 
	TElement extends ElementType<TProps>
> = TElement extends keyof JSX.IntrinsicElements ? TElement : TElement extends Component<infer U> ? U : TProps;