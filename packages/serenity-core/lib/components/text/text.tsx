import { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ElementType, PolymorphicProps } from "../../typings/polymorphic";
import { Size, UTILITY_NAMES, buildStyles, cssvars, cx, resolveSize } from "@serenity-ui/styles";
import classes from "./text.module.scss";
import { bool } from "../../util/props";

interface TextProps {
	size?: Size | number;
	fontStyle?: JSX.CSSProperties['font-style'];
	weight?: JSX.CSSProperties['font-weight'];
	transform?: JSX.CSSProperties['text-transform'];
	align?: JSX.CSSProperties['text-align'];
	whiteSpace?: JSX.CSSProperties['white-space'];
	decoration?: JSX.CSSProperties['text-decoration'];
	inline?: boolean;
	truncate?: boolean;
	lineClamp?: number;
}

const textSplitProps = [
	'as',
	'style',
	'class',
	"size",
	'fontStyle',
	'weight',
	'transform',
	'align',
	'whiteSpace',
	'decoration',
	'truncate',
	'lineClamp'
] as const;

function Text<TElement extends ElementType = "div">(props: PolymorphicProps<TextProps, TElement>) {

	const [root, utils, other] = splitProps(props, textSplitProps, UTILITY_NAMES);

	const cssVariables = () => {
		const size = resolveSize("font-size", root.size, "rem");

		return cssvars({
			'font-size': size,
			'font-style': root.fontStyle,
			'font-weight': root.weight,
			'text-transform': root.transform,
			'text-align': root.align,
			'white-space': root.whiteSpace,
			'text-decoration': root.decoration,
			'line-clamp': root.lineClamp
		})
	};

	const styles = buildStyles(utils, root.style, cssVariables());
	const component = props.inline ? 'span' : 'div';

	return (
		<Dynamic
			class={cx(classes.text, root.class)}
			component={root.as || component}
			data-truncate={bool(root.truncate)}
			data-clamp={root.lineClamp}
			{...styles}
			{...other}
		/>
	);
}

export { Text, TextProps };