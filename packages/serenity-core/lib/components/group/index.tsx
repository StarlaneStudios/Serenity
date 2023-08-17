import { Size, cx, resolveSize } from "@serenity-ui/styles";
import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import classes from "./group.module.scss";

interface GroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
	spacing?: Size | number;
	grow?: boolean;
	noWrap?: boolean;
	direction?: "row" | "row-reverse";
}

function Group(props: GroupProps) {

	const [root, other] = splitProps(props, [
		"children",
		"class",
		"spacing",
		"justify",
		"align",
		"style",
		"grow",
		"noWrap",
		"direction"
	]);

	const cssVariables = () => {
		const size = resolveSize(root.spacing ?? "md", "group-spacing", "px");

		return {
			"--group-spacing": size,
			"--group-justify": root.justify,
			"--group-align": root.align
		};
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

export { Group };
export type { GroupProps };