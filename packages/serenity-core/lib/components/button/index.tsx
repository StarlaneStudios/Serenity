import { JSX, mergeProps, splitProps } from "solid-js";
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

const defaultButtonProps: ButtonProps = {
	color: "blue",
	size: "sm",
	radius: "sm",
	variant: "filled"
};

const defaultButtonSplitProps: (keyof ButtonProps)[] = [
	"color",
	"class",
	"size",
	"classes",
	"style",
	"variant",
	"radius",
	"children",
	"loading"
];

function Button(props: ButtonProps) {

	const [root, other] = splitProps(props, defaultButtonSplitProps);
	const baseProps = mergeProps(defaultButtonProps, root);

	const cssVariables = () => {

		const defaultColor = baseProps.color!;
		const defaultRadius = baseProps.radius!;
		const defaultVariant = baseProps.variant!;

		const variantVariables = variants.get(defaultVariant)!(defaultColor);

		return Object.assign({
			"border-radius": resolveSize(defaultRadius, "serenity-radius", "px")
		}, cssvars(variantVariables));
	};

	return (
		<button
			class={cx(baseProps.class, classes.button)}
			data-variant={baseProps.variant}
			data-size={baseProps.size}
			style={Object.assign(cssVariables(), root.style)}
			data-loading={baseProps.loading}
			aria-disabled={baseProps.disabled}
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