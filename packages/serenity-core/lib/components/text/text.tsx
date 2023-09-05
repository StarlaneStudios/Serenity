import { JSX, splitProps } from "solid-js";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles } from "@serenity-ui/styles";

interface TextProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLParagraphElement> {

}

function Text(props: TextProps) {
	const [utils, rest] = splitProps(props, UTILITY_NAMES);
	const styles = buildStyles(utils, rest.style);

	const Component = "p";

	return (
		<Component
			{...styles}
			{...rest}
		>
			{props.children as JSX.Element}
		</Component>
	);
}

export { Text, TextProps };