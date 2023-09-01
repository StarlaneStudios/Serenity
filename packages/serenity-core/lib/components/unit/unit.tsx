import classes from "./unit.module.scss";
import { JSX } from "solid-js";
import { SerenityBaseProps, cx, splitPropsWithStyle, } from "@serenity-ui/styles";

interface UnitProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
}

const unitSplitProps = [
	"class",
	"style",
	"children",
] as const;

function Unit(props: UnitProps) {

	const [style, root, other] = splitPropsWithStyle(props, unitSplitProps);

	return (
		<div
			class={cx(classes.unit, root.class)}
			style={Object.assign(style, root.style)}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Unit, UnitProps };