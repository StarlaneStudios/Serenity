import classes from "./column.module.scss";
import { splitProps, JSX, mergeProps } from "solid-js";
import { buildStyles, cssvars, cx, resolveSize, SerenityBaseProps, Size, UTILITY_NAMES } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";

interface ColumnProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
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

const defaultColumnProps: DefaultProps<ColumnProps, 'spacing' | 'justify' | 'align' | 'direction'> = {
	align: "unset",
	justify: "unset",
	direction: "column",
	spacing: "md"
};

function Column(props: ColumnProps) {

	const [root, utils, other] = splitProps(props, columnSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultColumnProps, root);

	const cssVariables = () => {
		const size = resolveSize("column-spacing", baseProps.spacing, "rem");
		
		return cssvars({
			"row-gap": size,
			"justify-content": baseProps.justify,
			"align-items": baseProps.align,
			"flex-direction": baseProps.direction
		});
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={cx(classes.column, root.class)}
			data-direction={baseProps.direction}
			{...styles}
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