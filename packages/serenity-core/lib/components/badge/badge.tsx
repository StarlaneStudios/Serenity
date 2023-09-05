import { Color, SerenityBaseProps, Size, UTILITY_NAMES, cssvars, cx, resolveColorInput, resolveSize, buildStyles } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import classes from "./badge.module.scss";
import { variants } from "../../constants/variants";

interface BadgeProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

	/**
	 * The color of the badge.
	 * @default "primary"
	 */
	color?: Color;

	/**
	 * The variant of the badge.
	 * @default "default"
	 */
	variant?: "default" | "white" | "light" | "outline" | "transparent" | "filled" | "dot";

	/**
	 * The size of the badge.
	 * @default "md"
	 */
	size?: Size;

	/**
	 * The border radius of the badge.
	 * @default "md"
	 */
	radius?: Size | number;

	/**
	 * The style of the badge.
	 */
	styles?: Record<'label', string>;
}

const badgeSplitProps = [
	"color",
	"variant",
	"size",
	"radius",
	"style",
	"class",
	"children"
] as const;

const defaultBadgeProps: DefaultProps<
	BadgeProps,
	'color' | 'variant' | 'size' | 'radius' | 'styles'
> = {
	color: 'blue',
	radius: 'xs',
	size: 'md',
	variant: 'default',
	styles: {
		label: classes['badge__label']
	}
};

function Badge(props: BadgeProps) {

	const [root, utils, other] = splitProps(props, badgeSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultBadgeProps, root);

	const cssVariables = () => {
		const size = resolveSize("size", baseProps.size, "rem");
		const radius = resolveSize("radius", baseProps.radius, "rem");
		const height = resolveSize("badge-height", baseProps.size, "rem");
		const padding = resolveSize("badge-padding", baseProps.size, "rem");
		const fontSize = resolveSize("badge-font-size", baseProps.size, "rem");

		if (baseProps.variant === "dot") {
			const color = resolveColorInput(baseProps.color);
			return cssvars({ radius, size, color, height, padding, "font-size": fontSize });
		}

		const variant = variants.get(baseProps.variant)?.(baseProps.color) ?? {};
		return cssvars({ radius, size, padding, height, "font-size": fontSize, ...variant });
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={cx(classes.badge, baseProps.class)}
			data-variant={baseProps.variant}
			{...styles}
			{...other}
		>
			<span class={baseProps.styles.label}>
				{baseProps.children}
			</span>
		</div>
	);
}

export {
	Badge,
	BadgeProps,
	defaultBadgeProps
};