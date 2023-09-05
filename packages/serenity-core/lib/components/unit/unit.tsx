import classes from "./unit.module.scss";
import { JSX, splitProps } from "solid-js";
import { SerenityBaseProps, UTILITY_NAMES, cx, buildStyles } from "@serenity-ui/styles";

interface UnitProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
}

const unitSplitProps = [
	"class",
	"style",
	"children",
] as const;

function Unit(props: UnitProps) {

	const [root, utils, other] = splitProps(props, unitSplitProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);

	return (
		<div
			class={cx(classes.unit, root.class)}
			{...styles}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Unit, UnitProps };