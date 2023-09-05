import classes from "./paper.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { SerenityBaseProps, Size, cssvars, cx, resolveShadow, resolveSize, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { resolveBorder } from "@serenity-ui/utils";
import { DefaultProps } from "../../util/types";

interface PaperProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
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

	const [root, utils, other] = splitProps(props, paperSplitProps, UTILITY_NAMES);
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

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={cx(classes.paper, baseProps.class)}
			data-border={resolveBorder(baseProps.border)}
			{...styles}
			{...other}
		>
			{baseProps.children}
		</div>
	);
}

export { Paper, defaultPaperProps, PaperProps };