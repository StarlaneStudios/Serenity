import { splitProps, JSX } from "solid-js";
import { cx } from "@serenity-ui/utils";
import type { Size } from "@serenity-ui/styles";
import classes from "./stack.module.scss";

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
	spacing?: number | Size;
}

function Stack(props: StackProps) {

	const [root, other] = splitProps(props, ["children", "class", "spacing"]);

	return (
		<div
			class={cx(classes.stack, root.class)}
			data-spacing={root.spacing}
			{...props}
		>
			{props.children}
		</div>
	);
}

export { Stack };
export type { StackProps };