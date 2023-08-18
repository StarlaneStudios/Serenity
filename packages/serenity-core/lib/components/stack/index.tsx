import { splitProps, JSX, mergeProps } from "solid-js";
import { cssvars, cx, resolveSize, Size } from "@serenity-ui/styles";
import classes from "./stack.module.scss";

interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
	spacing?: number | Size;
	direction?: "column" | "column-reverse";
	justify?: JSX.CSSProperties["justify-content"];
	align?: JSX.CSSProperties["align-items"];
}

const stackSplitProps = [
	"children",
	"class",
	"spacing",
	"justify",
	"align",
	"direction",
	"style"
] as const;

const defaultStackProps = {
	align: "unset",
	justify: "unset",
	direction: "column-reverse",
	spacing: "md"
} as Required<Pick<StackProps, "spacing" | "justify" | "align" | "direction">>;

function Stack(props: StackProps) {

	const [root, other] = splitProps(props, stackSplitProps);
	const baseProps = mergeProps(defaultStackProps, root);

	const cssVariables = () => {
		const size = resolveSize(baseProps.spacing, "serenity-stack-spacing", "px");
		return cssvars({
			"row-gap": size,
			"justify-content": baseProps.justify,
			"align-items": baseProps.align
		});
	};

	return (
		<div
			class={cx(classes.stack, root.class)}
			data-spacing={baseProps.spacing}
			data-direction={baseProps.direction}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Stack, defaultStackProps };
export type { StackProps };