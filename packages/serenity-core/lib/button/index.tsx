import { JSX, splitProps } from "solid-js";
import classes from "./button.module.scss";
import { cx } from "@serenity-ui/utils";
import type { ThemeColor } from "@serenity-ui/styles";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	color?: ThemeColor;
}

function Button(props: ButtonProps) {

	const [root, other] = splitProps(props, ["children", "color", "class"])

	return (
		<button class={cx(classes.button, root.class)}>
			{root.children}
		</button>
	);
}

export { Button };
export type { ButtonProps };