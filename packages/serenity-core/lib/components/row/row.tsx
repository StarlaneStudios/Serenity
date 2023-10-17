import classes from "./row.module.scss";
import { SerenityBaseProps, Size, localVars, c, b, resolveLength, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { DefaultProps } from "../../util/types";

interface RowProps extends SerenityBaseProps, Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size'> {
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

const defaultRowProps: DefaultProps<RowProps, 'spacing' | 'justify' | 'align' | 'grow' | 'noWrap' | 'direction'> = {
	align: "center",
	justify: "flex-start",
	direction: "row",
	grow: false,
	noWrap: false,
	spacing: "md"
};

function Row(props: RowProps) {

	const [root, utils, other] = splitProps(props, rowSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultRowProps, root);

	const cssVariables = () => {
		const size = resolveLength("row-spacing", baseProps.spacing);

		return localVars({
			spacing: size,
			justify: baseProps.justify,
			align: baseProps.align,
			direction: baseProps.direction
		});
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<div
			class={c(classes.row, baseProps.class)}
			data-grow={b(baseProps.grow)}
			data-no-wrap={b(baseProps.noWrap)}
			{...styles}
			{...other}
		>
			{baseProps.children}
		</div>
	);
}

export { Row, defaultRowProps, RowProps };