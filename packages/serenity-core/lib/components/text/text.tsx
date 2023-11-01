import { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ElementType, PolymorphicProps } from "../../typings/polymorphic";
import classes from "./text.module.scss";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c, b } from "../../utils/css";
import { resolveLength } from "../../utils/resolvers";

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
		const size = resolveLength("font-size", root.size);

		return localVars({
			size: size,
			style: root.fontStyle,
			weight: root.weight,
			transform: root.transform,
			align: root.align,
			decoration: root.decoration,
			'white-space': root.whiteSpace,
			'line-clamp': root.lineClamp
		})
	};

	const styles = () => buildStyles(utils, cssVariables(), root.style);
	const component = props.inline ? 'span' : 'div';

	return (
		<Dynamic
			class={c(classes.text, root.class)}
			component={root.as || component}
			data-truncate={b(root.truncate)}
			data-clamp={root.lineClamp}
			{...styles()}
			{...other}
		/>
	);
}

export { Text, TextProps };