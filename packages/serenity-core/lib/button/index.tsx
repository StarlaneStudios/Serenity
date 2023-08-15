import { JSX, splitProps } from "solid-js";
import classes from "./button.module.scss";
import { cssvars, cx, resolveTransparentVariant } from "@serenity-ui/styles";
import type { ThemeColor, Size } from "@serenity-ui/styles";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ThemeColor;
	size?: Size;
	classes?: Record<'inner' | 'label', string>;
	variant?: "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";
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

		switch (root.variant) {
			case "default": {
				return {};
			}
			case "light": {

			}
			case "outline": {

			}
			case "transparent": {
				return cssvars(
					resolveTransparentVariant(root.color!, 6)
				);
			}
			case "subtle": {

			}
			case "white": {

			}
			case "filled":
			default: {
				// const color = resolveColorInput(root.color);
				// const radius = resolveSize(root.radius || "sm", "serenity-radius", "px");

				// return cssvars({
				// 	"background-color": color.color,
				// 	"hover-color": color.hover,
				// 	"border-radius": radius,
				// 	"press-color": color.press
				// });

				return {};
			}
		}
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
export type { ButtonProps };