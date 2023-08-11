import classes from "./stack.module.scss";
import { splitProps, JSX } from "solid-js";
import { cx } from "@serenity-ui/utils";

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {

}

function Stack(props: StackProps) {

	const [root, other] = splitProps(props, ["children", "class"]);

	return (
		<div
			class={cx(classes.stack, root.class)}
			{...props}
		>
			{props.children}
		</div>
	);
}

export { Stack };
export type { StackProps };