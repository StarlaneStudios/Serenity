import classes from "./row.module.scss";
import { Size, cssvars, cx, resolveSize } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

interface RowProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size'> {
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
	spacing?: Size;
	grow?: boolean;
	noWrap?: boolean;
	direction?: "row" | "row-reverse";
}

const rowSplitProps = [
	"children",
	"class",
	"spacing",
	"justify",
	"align",
	"style",
	"grow",
	"noWrap",
	"direction"
] as const;

const defaultRowProps = {
	align: "center",
	justify: "flex-start",
	direction: "row",
	grow: false,
	noWrap: false,
	spacing: "md"
} as Required<Pick<RowProps, "spacing" | "justify" | "align" | "grow" | "noWrap" | "direction">>;

function Row(props: RowProps) {

	const [root, other] = splitProps(props, rowSplitProps);
	const baseProps = mergeProps(defaultRowProps, root);

	const cssVariables = () => {
		const size = resolveSize(baseProps.spacing, "serenity-row-spacing", "px");

		return cssvars({
			spacing: size,
			justify: baseProps.justify,
			align: baseProps.align
		});
	};

	return (
		<div
			class={cx(classes.row, root.class)}
			data-grow={root.grow}
			data-no-wrap={root.noWrap}
			data-direction={root.direction ?? "row"}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Row, defaultRowProps, RowProps };