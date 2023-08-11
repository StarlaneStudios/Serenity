import { JSX } from "solid-js/jsx-runtime";
import classes from "./stack.module.scss";

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {

}

function Stack(props: StackProps) {
	return (
		<div class={classes.stack} {...props}>
			{props.children}
		</div>
	);
}

export { Stack };
export type { StackProps };