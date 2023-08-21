import { Size, cssvars, cx, resolveSize } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import classes from "./group.module.scss";

interface GroupProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size'> {
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
	spacing?: Size;
	grow?: boolean;
	noWrap?: boolean;
	direction?: "row" | "row-reverse";
}

const groupSplitProps = [
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

const defaultGroupProps = {
	align: "center",
	justify: "flex-start",
	direction: "row",
	grow: false,
	noWrap: false,
	spacing: "md"
} as Required<Pick<GroupProps, "spacing" | "justify" | "align" | "grow" | "noWrap" | "direction">>;

function Group(props: GroupProps) {

	const [root, other] = splitProps(props, groupSplitProps);
	const baseProps = mergeProps(defaultGroupProps, root);

	const cssVariables = () => {
		const size = resolveSize(baseProps.spacing, "group-spacing", "px");

		return cssvars({
			spacing: size,
			justify: baseProps.justify,
			align: baseProps.align
		});
	};

	return (
		<div
			class={cx(classes.group, root.class)}
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

export { Group, defaultGroupProps, GroupProps };