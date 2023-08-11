import { JSX } from "solid-js";
import classes from "./button.module.scss";
import { ThemeColor } from "@serenity-ui/styles";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	color?: ThemeColor;
}

function Button(props: ButtonProps) {

	return (
		<button class={classes.button}>
			this is a button 222
		</button>
	);
}

export { Button };
export type { ButtonProps };