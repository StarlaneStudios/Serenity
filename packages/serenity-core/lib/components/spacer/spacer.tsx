import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { SerenityBaseProps } from "../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../utilities";

export interface SpacerProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLSpanElement> {

}

const spacerSplitProps = [
	"style"
] as const;

function Spacer(props: SpacerProps) {

	const [root, utils, other] = splitProps(props, spacerSplitProps, UTILITY_NAMES);
	const style = () => buildStyles(utils, { "flex-grow": 1 }, root.style);

	return (
		<span
			{...style()}
			{...other}
		/>
	);
};

export { Spacer };