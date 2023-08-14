import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

function Spacer(props: JSX.HTMLAttributes<HTMLSpanElement>) {

	const [root, other] = splitProps(props, [
		"children",
		"style"
	]);

	return (
		<span
			style={Object.assign({ "flex-grow": 1 }, root.style)}
			{...other}
		>
			{root.children}
		</span>
	);
};

export { Spacer };