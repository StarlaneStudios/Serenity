import classes from "./column.module.scss";
import { splitProps, JSX, mergeProps } from "solid-js";
import { cssvars, cx, resolveSize, Size } from "@serenity-ui/styles";

interface ColumnProps extends JSX.HTMLAttributes<HTMLDivElement> {
	spacing?: number | Size;
	direction?: "column" | "column-reverse";
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
}

const columnSplitProps = [
	"children",
	"class",
	"spacing",
	"justify",
	"align",
	"direction",
	"style"
] as const;

const defaultColumnProps = {
	align: "unset",
	justify: "unset",
	direction: "column",
	spacing: "md"
} as Required<Pick<ColumnProps, "spacing" | "justify" | "align" | "direction">>;

function Column(props: ColumnProps) {

	const [root, other] = splitProps(props, columnSplitProps);
	const baseProps = mergeProps(defaultColumnProps, root);

	const cssVariables = () => {
		const size = resolveSize(baseProps.spacing, "serenity-column-spacing", "px");
		
		return cssvars({
			"row-gap": size,
			"justify-content": baseProps.justify,
			"align-items": baseProps.align
		});
	};

	return (
		<div
			class={cx(classes.column, root.class)}
			data-spacing={baseProps.spacing}
			data-direction={baseProps.direction}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export {
	Column,
	defaultColumnProps,
	ColumnProps
};