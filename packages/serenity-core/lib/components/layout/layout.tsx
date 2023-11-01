import { DefaultProps } from "../../typings/deprecated";
import { Tuple } from "../../typings/helpers";
import { SerenityBaseProps } from "../../typings/props";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c } from "../../utils/css";
import { resolveGridSpacing, resolveGridCols } from "../../utils/resolvers";
import classes from "./layout.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";

interface LayoutProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
	breakpoints?: Record<Size, number>;
	spacing?: Size | number | Tuple<Size | number, 2>;
}

const layoutSplitProps = [
	"breakpoints",
	"spacing",
	"class",
	"style",
	"children"
] as const;

const defaultLayoutProps: DefaultProps<LayoutProps, 'spacing' | 'breakpoints'> = {
	spacing: "md",
	breakpoints: {
		xs: 1,
		sm: 2,
		md: 3,
		lg: 3,
		xl: 4
	}
};

function Layout(props: LayoutProps) {

	const [root, utils, other] = splitProps(props, layoutSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultLayoutProps, root);

	const cssVariables = () => {

		const spacing = resolveGridSpacing(baseProps.spacing, "spacing", "rem");
		const cols = resolveGridCols(baseProps.breakpoints);
		const variables = localVars({ spacing });

		return Object.assign(variables, cols);
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<div
			class={c(classes.layout, baseProps.class)}
			role="grid"
			{...styles()}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Layout, defaultLayoutProps, LayoutProps };