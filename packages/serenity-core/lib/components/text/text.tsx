import { splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import { Dynamic } from "solid-js/web";
import { ElementType, PolymorphicUtilProps, PolymorphicProps } from "../../typings/polymorphic";
import { UTILITY_NAMES, buildStyles } from "@serenity-ui/styles";

interface TextProps {
	weight?: "light" | "normal" | "medium" | "bold";
}

const defaultTextProps: DefaultProps<PolymorphicProps<TextProps>, 'as'> = {
	as: "p"
};

const textSplitProps = [
	"as"
] as const;

function Text<T extends ElementType>(props: PolymorphicUtilProps<TextProps, T>) {

	const [utils, root, other] = splitProps(props, UTILITY_NAMES, textSplitProps);
	const styles = buildStyles(utils, other.style);

	return (
		<Dynamic
			component={root.as || "p"}
			{...other}
			{...styles}
		/>
	);
}

export { Text, TextProps };