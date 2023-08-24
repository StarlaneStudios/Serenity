import classes from "./paper.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { Size, cssvars, cx, resolveShadow, resolveSize } from "@serenity-ui/styles";
import { resolveBorder } from "@serenity-ui/utils";

interface PaperProps extends JSX.HTMLAttributes<HTMLDivElement> {
	border?: boolean | ("t" | "l" | "r" | "b")[];
	radius?: Size | number;
	padding?: Size | number;
	shadow?: Size | undefined;
}

const defaultPaperProps = {
	border: false,
	radius: "sm",
	padding: "sm",
	shadow: undefined
} as Required<Pick<PaperProps, "border" | "radius" | "padding">> & Pick<PaperProps, 'shadow'>;

const paperSplitProps = [
	"border", 
	"radius", 
	"class", 
	"style",
	"children",
	"shadow",
	"padding"
] as const;

function Paper(props: PaperProps) {

	const [root, other] = splitProps(props, paperSplitProps);
	const baseProps = mergeProps(defaultPaperProps, root);

	const cssVariables = () => {

		const radius = resolveSize(baseProps.radius, "serenity-radius", "px");
		const padding = resolveSize(baseProps.padding, "serenity-padding", "px");
		const shadow = resolveShadow(baseProps.shadow);

		// TODO Handle this

		return cssvars({
			"border-radius": radius,
			"padding": padding,
			"shadow": shadow
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

export { Paper, defaultPaperProps, PaperProps };