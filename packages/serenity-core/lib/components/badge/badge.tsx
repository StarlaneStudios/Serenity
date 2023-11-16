import { SerenityBaseProps, Size, UTILITY_NAMES, localVars, c, resolveLength, buildStyles, resolveColor, ColorValue } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import classes from "./badge.module.scss";
import { variants } from "../../constants/variants";
import { useSerenity } from "../../provider";

interface BadgeProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

	/**
	 * The color of the badge.
	 * @default "primary"
	 */
	color?: ColorValue;

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
	'variant' | 'size' | 'radius' | 'styles'
> = {
	radius: 'xs',
	size: 'md',
	variant: 'default',
	styles: {
		label: classes['badge__label']
	}
};

function Badge(props: BadgeProps) {

	const { accentColor } = useSerenity();

	const [root, utils, other] = splitProps(props, badgeSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultBadgeProps, root);

	const cssVariables = () => {
		const size = resolveLength("size", baseProps.size);
		const radius = resolveLength("radius", baseProps.radius);
		const height = resolveLength("badge-height", baseProps.size);
		const padding = resolveLength("badge-padding", baseProps.size);
		const fontSize = resolveLength("badge-font-size", baseProps.size);

		const vars: Record<string, any> = {
			radius,
			size,
			padding,
			height,
			'font-size': fontSize
		};

		const color = baseProps.color ?? accentColor();

		if (baseProps.variant === "dot") {
			vars.color = resolveColor(color);
		} else {
			const variant = variants[baseProps.variant](color, false);
			Object.assign(vars, variant);
		}

		return localVars(vars);
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<div
			class={c(classes.badge, baseProps.class)}
			data-variant={baseProps.variant}
			{...styles()}
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