import classes from "./paper.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { SerenityBaseProps, Size, c, resolveShadow, resolveLength, buildStyles, UTILITY_NAMES, Side, localVars } from "@serenity-ui/styles";
import { resolveBorder } from "@serenity-ui/utils";
import { DefaultProps } from "../../util/types";

interface PaperProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
	border?: boolean | Side[];
	radius?: Size | number;
	shadow?: Size | undefined;
}

const paperSplitProps = [
	"border",
	"radius",
	"class",
	"style",
	"children",
	"shadow"
] as const;

const defaultPaperProps: DefaultProps<PaperProps, 'border' | 'radius'> = {
	border: false,
	radius: "sm"
};

function Paper(props: PaperProps) {

	const [root, utils, other] = splitProps(props, paperSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultPaperProps, root);

	const cssVariables = () => {

		const radius = resolveLength("radius", baseProps.radius);
		const shadow = resolveShadow(baseProps.shadow);

		return localVars({ radius, shadow });
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<div
			class={c(classes.paper, baseProps.class)}
			data-border={resolveBorder(baseProps.border)}
			{...styles()}
			{...other}
		>
			{baseProps.children}
		</div>
	);
}

export { Paper, defaultPaperProps, PaperProps };