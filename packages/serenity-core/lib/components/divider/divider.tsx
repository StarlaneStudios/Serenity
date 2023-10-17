import classes from "./divider.module.scss";
import { Size, Color, localVars, c, resolveLength, resolveColor, SerenityBaseProps, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { Show, mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { DefaultProps } from "../../util/types";

interface DividerProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
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

const defaultDividerProps: DefaultProps<DividerProps, 'thickness' | 'color' | 'orientation' | 'variant' | 'labelPosition' | 'classes'> = {
	thickness: "xs",
	orientation: "horizontal",
	variant: "solid",
	labelPosition: "center",
	color: "var(--serenity-divider-color)",
	classes: {
		dividerLabel: classes["divider--label"]
	}
};

function Divider(props: DividerProps) {

	const [root, utils, other] = splitProps(props, dividerSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultDividerProps, root);

	const cssVariables = () => localVars({
		color: resolveColor(baseProps.color),
		thickness: resolveLength("divider-thickness", baseProps.thickness),
		variant: baseProps.variant
	});

	const styles = () => buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={c(classes.divider, baseProps.class)}
			role="separator"
			aria-orientation={baseProps.orientation}
			{...styles}
			{...other}
		>
			<Show when={baseProps.children}>
				<span
					class={baseProps.classes.dividerLabel}
					data-position={baseProps.labelPosition}
					aria-hidden={baseProps.orientation === "vertical"}
				>
					{baseProps.children}
				</span>
			</Show>
		</div>
	);
};

export { Divider, defaultDividerProps, DividerProps };