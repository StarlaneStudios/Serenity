import { JSX, mergeProps, splitProps } from "solid-js";
import { VARIANTS } from "../../constants/variants";
import { Button as KobalteButton } from "@kobalte/core";
import classes from "./button.module.scss";
import { useSerenity } from "../../provider";
import { SerenityBaseProps } from "../../typings/props";
import { ColorValue } from "../../typings/theme";
import { Size, Variant } from "../../typings/values";
import { DefaultProps } from "../../typings/deprecated";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { b, c, localVars } from "../../utils/css";
import { resolveLength, resolveSize } from "../../utils/resolvers";

interface ButtonProps extends SerenityBaseProps, JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ColorValue;
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

const defaultButtonProps: DefaultProps<ButtonProps, 'size' | 'radius' | 'variant' | 'classes' | 'type'> = {
	size: "md",
	radius: "sm",
	variant: "filled",
	type: "button",
	classes: {
		inner: classes["button__inner"],
		label: classes["button__label"]
	},
};

function Button(props: ButtonProps) {

	const { accentColor } = useSerenity();

	const [root, utils, other] = splitProps(props, buttonSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultButtonProps, root);

	const cssVariables = () => {

		const color = baseProps.color ?? accentColor();
		const variantVariables = VARIANTS[baseProps.variant](color, true);

		return localVars(
			Object.assign(variantVariables, {
				'border-radius': resolveLength('radius', baseProps.radius, "rem"),
				'font-size': resolveSize('button-font', baseProps.size),
				'padding': resolveSize('button-padding', baseProps.size),
				'height': resolveSize('button-height', baseProps.size),
			})
		);
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<KobalteButton.Root
			class={c(baseProps.class, classes.button)}
			type={baseProps.type}
			data-variant={baseProps.variant}
			data-loading={b(baseProps.loading)}
			aria-disabled={other.disabled}
			{...styles()}
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