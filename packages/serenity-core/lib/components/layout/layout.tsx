import classes from "./layout.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { Size, cssvars, cx, resolveGridCols, resolveGridSpacing } from "@serenity-ui/styles";
import { Tuple } from "@serenity-ui/utils";
import { DefaultProps } from "../../util/types";

interface LayoutProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

	const [root, other] = splitProps(props, layoutSplitProps);
	const baseProps = mergeProps(defaultLayoutProps, root);

	const cssVariables = () => {

		const spacing = resolveGridSpacing(baseProps.spacing, "spacing", "rem");
		const cols = resolveGridCols(baseProps.breakpoints, "cols");

		const variables = cssvars({ spacing });

		return Object.assign(variables, cols);
	};

	return (
		<div
			class={cx(classes.layout, root.class)}
			role="grid"
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Layout, defaultLayoutProps, LayoutProps };