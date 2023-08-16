import { JSX, splitProps } from "solid-js";
import classes from "./button.module.scss";
import { cssvars, cx, resolveFilledVariant, resolveLightVariant, resolveOutlineVariant, resolveSize, resolveTransparentVariant, resolveWhiteVariant } from "@serenity-ui/styles";
import type { Color, Size } from "@serenity-ui/styles";

type ButtonVariant = "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: Color;
	size?: Size;
	classes?: Record<'inner' | 'label', string>;
	variant?: ButtonVariant;
	radius?: Size | number;
	loading?: boolean;
}

const defaultButtonProps: ButtonProps = {
	color: "blue",
	size: "sm",
	radius: "sm"
};

function Button(props: ButtonProps) {

	const [root, other] = splitProps(Object.assign({}, defaultButtonProps, props), [
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

		const variants: Record<ButtonVariant, any> = {
			"default": {},
			"light": resolveLightVariant(root.color!, 6),
			"outline": resolveOutlineVariant(root.color!, 6),
			"transparent": resolveTransparentVariant(root.color!, 6),
			"white": resolveWhiteVariant(root.color!, 6),
			"filled": resolveFilledVariant(root.color!, 6),
			subtle: ""
		};

		return Object.assign({}, {
			"border-radius": resolveSize(root.radius || "sm", "serenity-radius", "px")
		}, variants[root.variant ?? "filled"]);
	};

	return (
		<button
			class={cx(root.class, classes.button)}
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

export { Button, defaultButtonProps };
export type { ButtonProps, ButtonVariant };