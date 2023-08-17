import { JSX, splitProps } from "solid-js";
import classes from "./button.module.scss";
import { cssvars, cx, resolveSize } from "@serenity-ui/styles";
import type { Color, Size } from "@serenity-ui/styles";
import { Variant, variants } from "../../constants/variants";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: Color;
	size?: Size;
	classes?: Record<'inner' | 'label', string>;
	variant?: Variant;
	radius?: Size | number;
	loading?: boolean;
}

const defaultButtonProps: Omit<ButtonProps, keyof Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>> = {
	color: "blue",
	size: "sm",
	radius: "sm",
	variant: "filled"
};

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

		const defaultColor = root.color ?? defaultButtonProps.color ?? "blue";
		const defaultRadius = root.radius ?? defaultButtonProps.radius ?? "sm";
		const defaultVariant = root.variant ?? defaultButtonProps.variant ?? "filled";

		const variantVariables = variants.get(defaultVariant)!(defaultColor);

		return Object.assign({
			"border-radius": resolveSize(defaultRadius, "serenity-radius", "px")
		}, cssvars(variantVariables));
	};

	return (
		<button
			class={cx(root.class, classes.button)}
			data-variant={root.variant ?? defaultButtonProps.variant ?? "filled"}
			data-size={root.size ?? defaultButtonProps.size ?? "sm"}
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