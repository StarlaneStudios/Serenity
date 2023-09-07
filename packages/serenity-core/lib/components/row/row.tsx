import classes from "./row.module.scss";
import { SerenityBaseProps, Size, cssvars, cx, resolveSize, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { DefaultProps } from "../../util/types";
import { bool } from "../../util/props";

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
		const size = resolveSize("row-spacing", baseProps.spacing, "rem");

		return cssvars({
			spacing: size,
			justify: baseProps.justify,
			align: baseProps.align
		});
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<div
			class={cx(classes.row, baseProps.class)}
			data-grow={bool(baseProps.grow)}
			data-no-wrap={bool(baseProps.noWrap)}
			data-direction={baseProps.direction ?? "row"}
			{...styles}
			{...other}
		>
			{baseProps.children}
		</div>
	);
}

export { Row, defaultRowProps, RowProps };