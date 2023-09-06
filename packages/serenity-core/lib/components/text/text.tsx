import { Component, ComponentProps, JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import { Dynamic } from "solid-js/web";
import { Row } from "../row";
import { ElementType } from "../../typings/polymorphic";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles } from "@serenity-ui/styles";

type TextProps<T extends ElementType = ElementType> = {
	as?: T;
	children?: JSX.Element;
} & SerenityBaseProps;

const defaultTextProps: DefaultProps<TextProps, 'as'> = {
	as: "p"
};

const textSplitProps = [
	"as"
] as const;


// interface TextProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLParagraphElement> {

// }

function Text<T extends ElementType = "div">(props: TextProps<T> & Omit<ComponentProps<T>, keyof TextProps<T>>) {

	const [utils, root, other] = splitProps(props, UTILITY_NAMES, textSplitProps);
	const styles = buildStyles(utils, other.style);

	return (
		<Dynamic
			component={root.as || "p"}
			{...other}
		/>
	);
}

export { Text, TextProps };