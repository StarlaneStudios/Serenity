import classes from "./button.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { cssvars, cx, resolveModifier, resolveSize } from "@serenity-ui/styles";
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
	"variant",
	"radius",
	"children",
	"loading",
	"classes",
	"type",
	"style"
] as const;

const defaultButtonProps: DefaultProps<ButtonProps, 'color' | 'size' | 'radius' | 'variant' | 'type' | 'classes'> = {
	color: "blue",
	size: "md",
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

		return cssvars({
			...variantVariables,
			'border-radius': resolveSize('radius', defaultRadius, 'rem'),
			'font-size': resolveModifier('button-font', baseProps.size),
			'padding': resolveModifier('button-padding', baseProps.size),
			'height': resolveModifier('button-height', baseProps.size),
		});
	};

	return (
		<KobalteButton.Root
			class={cx(baseProps.class, classes.button)}
			data-variant={baseProps.variant}
			data-loading={baseProps.loading}
			aria-disabled={other.disabled}
			type={baseProps.type}
			style={Object.assign(cssVariables(), baseProps.style)}
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