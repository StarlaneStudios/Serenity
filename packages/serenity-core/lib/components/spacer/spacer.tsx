import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

const spacerSplitProps = [
	"style"
] as const;

function Spacer(props: JSX.HTMLAttributes<HTMLSpanElement>) {

	const [root, other] = splitProps(props, spacerSplitProps);

	return (
		<span
			style={Object.assign({ "flex-grow": 1 }, root.style)}
			{...other}
		/>
	);
};

export { Spacer };