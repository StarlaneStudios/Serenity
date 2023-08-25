import classes from "./divider.module.scss";
import { Size, Color, cssvars, cx, resolveSize, resolveColorInput } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { DefaultProps } from "../../util/types";

interface DividerProps extends JSX.HTMLAttributes<HTMLDivElement> {
	color?: Color;
	thickness?: Size | number;
	orientation?: "horizontal" | "vertical";
	variant?: JSX.CSSProperties['border-top-style'];
	labelPosition?: "left" | "center" | "right";
	classes?: Record<'dividerLabel', string>;
}

const dividerSplitProps = [
	"color",
	"thickness",
	"orientation",
	"variant",
	"labelPosition",
	"class",
	"style",
	"children"
] as const;

const defaultDividerProps: DefaultProps<DividerProps, 'thickness' | 'orientation' | 'variant' | 'labelPosition' | 'classes'> = {
	thickness: "sm",
	orientation: "horizontal",
	variant: "solid",
	labelPosition: "center",
	classes: {
		dividerLabel: classes["divider--label"]
	}
};

function Divider(props: DividerProps) {

	const [root, other] = splitProps(props, dividerSplitProps);
	const baseProps = mergeProps(defaultDividerProps, root);

	const cssVariables = () => {

		const color = resolveColorInput(baseProps.color);
		const thickness = resolveSize(baseProps.thickness, "divider-thickness", "px");

		return cssvars({
			"border-color": color,
			"border-thickness": thickness,
			"border-variant": baseProps.variant
		});
	};

	return (
		<div
			class={cx(classes.divider, baseProps.class)}
			role="separator"
			aria-orientation={baseProps.orientation}
			style={Object.assign(cssVariables(), baseProps.style)}
			{...other}
		>
			<span
				class={baseProps.classes.dividerLabel}
				data-position={baseProps.labelPosition}
				aria-hidden={baseProps.orientation === "vertical"}
			>
				{baseProps.children}
			</span>
		</div>
	);
};

export { Divider, defaultDividerProps, DividerProps };