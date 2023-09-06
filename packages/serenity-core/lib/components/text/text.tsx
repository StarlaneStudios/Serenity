import { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ElementType, PolymorphicProps } from "../../typings/polymorphic";
import { UTILITY_NAMES, buildStyles, cssvars, cx } from "@serenity-ui/styles";
import classes from "./text.module.scss";

interface TextProps {
	fontStyle?: JSX.CSSProperties['font-style'];
	weight?: JSX.CSSProperties['font-weight'];
	transform?: JSX.CSSProperties['text-transform'];
}

const textSplitProps = [
	'as',
	'style',
	'class',
	'fontStyle',
	'weight',
	'transform'
] as const;

function Text<TElement extends ElementType = "p">(props: PolymorphicProps<TextProps, TElement>) {

	const [root, utils, other] = splitProps(props, textSplitProps, UTILITY_NAMES);

	const cssVariables = () => cssvars({
		'font-style': root.fontStyle,
		'font-weight': root.weight,
		'text-transform': root.transform
	});

	const styles = buildStyles(utils, root.style, cssVariables());

	return (
		<Dynamic
			class={cx(classes.text, root.class)}
			component={root.as || 'p'}
			{...styles}
			{...other}
		/>
	);
}

export { Text, TextProps };