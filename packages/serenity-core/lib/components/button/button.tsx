import classes from "./button.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { cssvars, cx, resolveSize } from "@serenity-ui/styles";
import { Color, Size } from "@serenity-ui/styles";
import { Variant, variants } from "../../constants/variants";
import { Button as KobalteButton } from "@kobalte/core";
import { DefaultProps } from "../../util/types";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: Color;
	size?: Size;
	classes?: Record<'inner' | 'label', string>;
	variant?: Variant;
	radius?: Size | number;
	loading?: boolean;
}

const buttonSplitProps = [
	"color",
	"class",
	"size",
	"classes",
	"style",
	"variant",
	"radius",
	"children",
	"loading",
	"classes",
	"type"
] as const;

const defaultButtonProps: DefaultProps<ButtonProps, 'color' | 'size' | 'radius' | 'variant' | 'type' | 'classes'> = {
	color: "blue",
	size: "sm",
	radius: "sm",
	variant: "filled",
	type: "button",
	classes: {
		inner: classes["button--inner"],
		label: classes["button--label"]
	},
} as const;

function Button(props: ButtonProps) {

	const [root, other] = splitProps(props, buttonSplitProps);
	const baseProps = mergeProps(defaultButtonProps, root);

	const cssVariables = () => {

		const defaultColor = baseProps.color;
		const defaultRadius = baseProps.radius;
		const defaultVariant = baseProps.variant;

		const variantVariables = variants.get(defaultVariant)!(defaultColor);

		return Object.assign({
			"border-radius": resolveSize(defaultRadius, "serenity-radius", "px")
		}, cssvars(variantVariables));
	};

	return (
		<KobalteButton.Root
			class={cx(baseProps.class, classes.button)}
			data-variant={baseProps.variant}
			data-size={baseProps.size}
			style={Object.assign(cssVariables(), root.style)}
			data-loading={baseProps.loading}
			aria-disabled={other.disabled}
			type={baseProps.type}
			{...other}
		>
			<span class={baseProps.classes.inner}>
				<span class={baseProps.classes.label}>
					{root.children}
				</span>
			</span>
		</KobalteButton.Root>
	);
};

export { 
	Button, 
	defaultButtonProps, 
	ButtonProps 
};