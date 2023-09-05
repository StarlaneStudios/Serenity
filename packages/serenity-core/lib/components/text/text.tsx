import { Component, ComponentProps, JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import { Dynamic } from "solid-js/web";
import { Row } from "../row";
import { ElementType } from "../../typings/polymorphic";

type TextProps<T extends ElementType = ElementType> = {
	as?: T;
	children?: JSX.Element;
}

const defaultTextProps: DefaultProps<TextProps, 'as'> = {
	as: "p"
};

const textSplitProps = [
	"as"
] as const;

function Text<T extends ElementType = "div">(props: TextProps<T> & Omit<ComponentProps<T>, keyof TextProps<T>>) {

	const [root, other] = splitProps(props, textSplitProps);
	const baseProps = mergeProps(defaultTextProps, root);

	return (
		<Dynamic
			component={baseProps.as || "p"}
			{...other}
		/>
	);
}

export {
	Text,
	TextProps,
	defaultTextProps
};