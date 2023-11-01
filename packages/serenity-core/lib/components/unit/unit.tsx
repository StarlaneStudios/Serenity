import { SerenityBaseProps } from "../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { c } from "../../utils/css";
import classes from "./unit.module.scss";
import { JSX, splitProps } from "solid-js";

interface UnitProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
}

const unitSplitProps = [
	"class",
	"style",
	"children",
] as const;

function Unit(props: UnitProps) {

	const [root, utils, other] = splitProps(props, unitSplitProps, UTILITY_NAMES);
	const styles = () => buildStyles(utils, root.style);

	return (
		<div
			class={c(classes.unit, root.class)}
			{...styles()}
			{...other}
		>
			{root.children}
		</div>
	);
}

export { Unit, UnitProps };