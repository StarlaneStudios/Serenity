import { Size, Color, cssvars, cx, resolveSize, resolveColorInput } from "@serenity-ui/styles";
import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import classes from "./divider.module.scss";

interface DividerProps extends JSX.HTMLAttributes<HTMLDivElement> {
	color?: Color;
	thickness?: Size | number;
	orientation?: "horizontal" | "vertical";
	variant?: JSX.CSSProperties['border-top-style'];
	contentPosition?: "left" | "center" | "right";
}

function Divider(props: DividerProps) {

	const [root, other] = splitProps(props, [
		"color",
		"thickness",
		"orientation",
		"variant",
		"contentPosition",
		"class",
		"style",
		"children"
	]);

	const cssVariables = () => {

		const color = resolveColorInput(props.color ?? "rgb(55, 58, 64)");
		const thickness = resolveSize(props.thickness || "1px", "divider-thickness", "px");

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
			aria-orientation={props.orientation ?? "horizontal"}
			data-content-position={props.contentPosition}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{props.children}
		</div>
	);
};

export { Divider };
export type { DividerProps };