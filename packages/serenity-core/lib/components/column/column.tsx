import classes from "./column.module.scss";
import { splitProps, JSX, mergeProps } from "solid-js";
import { buildStyles, localVars, c, resolveLength, SerenityBaseProps, Size, UTILITY_NAMES } from "@serenity-ui/styles";
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
		const size = resolveLength("column-spacing", baseProps.spacing);
		
		return localVars({
			gap: size,
			justify: baseProps.justify,
			align: baseProps.align,
			direction: baseProps.direction
		});
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={c(classes.column, root.class)}
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