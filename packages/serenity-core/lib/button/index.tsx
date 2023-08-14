import { JSX, createMemo, splitProps } from "solid-js";
import classes from "./button.module.scss";
import { cssvars, cx, resolveColorInput, resolveSize } from "@serenity-ui/styles";
import type { ThemeColor, Size } from "@serenity-ui/styles";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ThemeColor;
	size?: Size;
	classes?: Record<'inner' | 'label', string>;
	variant?: "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";
	radius?: Size | number;
	loading?: boolean;
}

function Button(props: ButtonProps) {

	const [root, other] = splitProps(props, [
		"color",
		"class",
		"size",
		"classes",
		"style",
		"variant",
		"radius",
		"children",
		"loading"
	]);

	const cssVariables = () => {

		const color = resolveColorInput(root.color || "blue");
		const radius = resolveSize(root.radius || "sm", "radius", "px");

		return cssvars({
			"background-color": color.color,
			"hover-color": color.hover,
			"border-radius": radius,
			"press-color": color.press
		});
	};

	return (
		<button
			class={cx(classes.button, root.class)}
			data-variant={root.variant ?? "filled"}
			data-size={root.size ?? "sm"}
			style={Object.assign(cssVariables(), root.style)}
			data-loading={root.loading}
			aria-disabled={other.disabled}
			{...other}
		>
			<span class={cx(classes.buttonInner, root.classes?.inner)}>
				<span class={cx(classes.buttonLabel, root.classes?.label)}>
					{root.children}
				</span>
			</span>
		</button>
	);
};

export { Button };
export type { ButtonProps };