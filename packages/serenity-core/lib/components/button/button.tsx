import classes from "./button.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { SerenityBaseProps, UTILITY_NAMES, Variant, buildStyles, cssvars, cx, resolveModifier, resolveSize } from "@serenity-ui/styles";
import { Color, Size } from "@serenity-ui/styles";
import { variants } from "../../constants/variants";
import { Button as KobalteButton } from "@kobalte/core";
import { DefaultProps } from "../../util/types";

interface ButtonProps extends SerenityBaseProps, JSX.ButtonHTMLAttributes<HTMLButtonElement> {
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

const defaultButtonProps: DefaultProps<ButtonProps, 'color' | 'size' | 'radius' | 'variant' | 'classes'> = {
	color: "blue",
	size: "md",
	radius: "sm",
	variant: "filled",
	classes: {
		inner: classes["button__inner"],
		label: classes["button__label"]
	},
} as const;

function Button(props: ButtonProps) {

	const [root, utils, other] = splitProps(props, buttonSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultButtonProps, root);

	const cssVariables = () => {

		const variantVariables = variants[baseProps.variant](baseProps.color, true);

		return cssvars({
			...variantVariables,
			'border-radius': resolveSize('radius', baseProps.radius, 'rem'),
			'font-size': resolveModifier('button-font', baseProps.size),
			'padding': resolveModifier('button-padding', baseProps.size),
			'height': resolveModifier('button-height', baseProps.size),
		});
	};

	const styles = buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<KobalteButton.Root
			class={cx(classes.button, baseProps.class)}
			data-variant={baseProps.variant}
			data-loading={baseProps.loading}
			aria-disabled={other.disabled}
			{...styles}
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