import { JSX, mergeProps, splitProps } from "solid-js";
import { Size, cssvars, cx, resolveGridSpacing } from "@serenity-ui/styles";
import { Tuple } from "@serenity-ui/utils";
import classes from "./simplegrid.module.scss";

interface SimpleGridProps extends JSX.HTMLAttributes<HTMLDivElement> {
	breakpoints?: Record<Size, number>;
	spacing?: Size | number | Tuple<Size | number, 2>;
}

const defaultSimpleGridProps = {
	spacing: "md",
	breakpoints: {
		xs: 1,
		sm: 2,
		md: 3,
		lg: 3,
		xl: 4
	}
} as Required<Pick<SimpleGridProps, 'spacing' | 'breakpoints'>>;

const simpleGridSplitProps = [
	"breakpoints",
	"spacing",
	"class",
	"style",
	"children"
] as const;

function SimpleGrid(props: SimpleGridProps) {

	const [root, other] = splitProps(props, simpleGridSplitProps);
	const baseProps = mergeProps(defaultSimpleGridProps, root);

	const cssVariables = () => {

		const spacing = resolveGridSpacing(baseProps.spacing, "serenity-spacing", "px");

		return cssvars({
			spacing
		});
	};

	return (
		<div
			class={cx(classes.simplegrid, root.class)}
			role="grid"
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { SimpleGrid, defaultSimpleGridProps, SimpleGridProps };