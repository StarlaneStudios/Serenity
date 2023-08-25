import classes from "./paper.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { Size, cssvars, cx, resolveShadow, resolveSize } from "@serenity-ui/styles";
import { resolveBorder } from "@serenity-ui/utils";
import { DefaultProps } from "../../util/types";

interface PaperProps extends JSX.HTMLAttributes<HTMLDivElement> {
	border?: boolean | ("t" | "l" | "r" | "b")[];
	radius?: Size | number;
	padding?: Size | number;
	shadow?: Size | undefined;
}

const paperSplitProps = [
	"border",
	"radius",
	"class",
	"style",
	"children",
	"shadow",
	"padding"
] as const;

const defaultPaperProps: DefaultProps<PaperProps, 'border' | 'radius' | 'padding'> = {
	border: false,
	radius: "sm",
	padding: "sm"
};

function Paper(props: PaperProps) {

	const [root, other] = splitProps(props, paperSplitProps);
	const baseProps = mergeProps(defaultPaperProps, root);

	const cssVariables = () => {

		const radius = resolveSize("radius", baseProps.radius, "rem");
		const padding = resolveSize("padding", baseProps.padding, "rem");
		const shadow = resolveShadow(baseProps.shadow);

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
	);
}

export { Paper, defaultPaperProps, PaperProps };