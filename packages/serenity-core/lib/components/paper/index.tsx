import { JSX, mergeProps, splitProps } from "solid-js";
import { Color, Size, cssvars, cx, resolveSize } from "../..";
import classes from "./paper.module.scss";
import { resolveBorder } from "@serenity-ui/utils";

interface PaperProps extends JSX.HTMLAttributes<HTMLDivElement> {
	border?: boolean | Record<"t" | "l" | "r" | "b", boolean>;
	radius?: Size | number;
	padding?: Size | number;
}

const defaultPaperProps = {
	border: false,
	radius: "sm",
	padding: "sm"
} as const;

const defaultSplitProps = [
	"border", 
	"radius", 
	"class", 
	"style",
	"children"
] as const;

function Paper(props: PaperProps) {

	const [root, other] = splitProps(props, defaultSplitProps);
	const baseProps = mergeProps(defaultPaperProps, root);

	const cssVariables = () => {

		const radius = resolveSize(baseProps.radius, "serenity-radius", "px");
		const padding = resolveSize(baseProps.padding, "serenity-padding", "px");

		return cssvars({
			"border-radius": radius,
			"padding": padding,
		});
	};

	return (
		<div
			class={cx(classes.paper, root.class)}
			data-border={resolveBorder(baseProps.border)}
			style={Object.assign(cssVariables(), baseProps.style)}
			{...other}
		>
			{baseProps.children}
		</div>
	)
}

export { Paper, defaultPaperProps };
export type { PaperProps };