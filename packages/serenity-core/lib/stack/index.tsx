import { splitProps, JSX } from "solid-js";
import { cssvars, cx, resolveSize, Size } from "@serenity-ui/styles";
import classes from "./stack.module.scss";

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
	spacing?: number | Size;
	direction?: "column" | "column-reverse";
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
}

function Stack(props: StackProps) {

	const [root, other] = splitProps(props, [
		"children",
		"class",
		"spacing",
		"justify",
		"align",
		"direction",
		"style"
	]);

	const cssVariables = () => {
		const size = resolveSize(root.spacing ?? "md", "serenity-stack-spacing", "px");
		return cssvars({
			"row-gap": size,
			"justify-content": root.justify,
			"align-items": root.align
		});
	};

	return (
		<div
			class={cx(classes.stack, root.class)}
			data-spacing={root.spacing}
			data-direction={root.direction ?? "column"}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Stack };
export type { StackProps };