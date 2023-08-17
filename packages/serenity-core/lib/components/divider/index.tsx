import { Size, Color, cssvars, cx, resolveSize, resolveColorInput } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import classes from "./divider.module.scss";

interface DividerProps extends JSX.HTMLAttributes<HTMLDivElement> {
	color?: Color;
	thickness?: Size | number;
	orientation?: "horizontal" | "vertical";
	variant?: JSX.CSSProperties['border-top-style'];
	contentPosition?: "left" | "center" | "right";
}

const dividerSplitProps = [
	"color",
	"thickness",
	"orientation",
	"variant",
	"contentPosition",
	"class",
	"style",
	"children"
] as const;

const defaultDividerProps = {
	color: "rgb(55, 58, 64)",
	thickness: "1px",
	orientation: "horizontal",
	variant: "solid",
	contentPosition: "center"
} as Required<Pick<DividerProps, "color" | "thickness" | "orientation" | "variant" | "contentPosition">>

function Divider(props: DividerProps) {

	const [root, other] = splitProps(props, dividerSplitProps);
	const baseProps = mergeProps(defaultDividerProps, root);

	const cssVariables = () => {

		const color = resolveColorInput(baseProps.color);
		const thickness = resolveSize(baseProps.thickness, "divider-thickness", "px");

		return cssvars({
			"border-color": color,
			"border-thickness": thickness,
			"border-variant": props.variant
		});
	};

	return (
		<div
			class={cx(classes.divider, root.class)}
			role="separator"
			aria-orientation={baseProps.orientation}
			data-content-position={baseProps.contentPosition}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{props.children}
		</div>
	);
};

export { Divider, defaultDividerProps };
export type { DividerProps };