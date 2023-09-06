import { SerenityBaseProps } from "@serenity-ui/styles";
import type { Component, JSX, ComponentProps } from "solid-js";

export type ElementType = keyof JSX.IntrinsicElements | Component<any>;

export type PolymorphicProps<
	TProps extends Object, 
	TElement extends ElementType = ElementType
> = {
	as?: TElement;
	children?: JSX.Element;
} & Omit<ComponentProps<TElement>, keyof TProps> & SerenityBaseProps;

export type PolymorphicUtilProps<
	TProps extends Object, 
	TElement extends ElementType = ElementType
> = PolymorphicProps<TProps, TElement> & SerenityBaseProps;