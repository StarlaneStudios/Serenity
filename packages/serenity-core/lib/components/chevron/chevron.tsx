import classes from "./chevron.module.scss";
import { Color, SerenityBaseProps, UTILITY_NAMES, b, buildStyles, c, resolveColor } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";

interface ChevronProps extends SerenityBaseProps, Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'children' | 'cursor' | 'display'> {
	orientation?: "up" | "down" | "left" | "right" | number;
	color?: Color;
	disableAnimation?: boolean;
}

const defaultChevronProps: DefaultProps<ChevronProps, 'orientation' | 'color' | 'disableAnimation'> = {
	orientation: "down",
	color: "gray.6",
	disableAnimation: false
};

const chevronSplitProps = [
	"orientation",
	"color",
	"style",
	"class",
	"disableAnimation"
] as const;

const chevronOrientationValues = new Map([
	["up", "180deg"],
	["down", "0deg"],
	["left", "90deg"],
	["right", "-90deg"]
]);

function Chevron(props: ChevronProps) {

	const [root, utils, other] = splitProps(props, chevronSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultChevronProps, root);

	const color = () => {
		return resolveColor(baseProps.color);
	};

	const orientation = () => {
		if(typeof baseProps.orientation === "number") {
			return `rotate(${baseProps.orientation}deg)`;
		}

		return chevronOrientationValues.get(baseProps.orientation);
	};

	const styles = () => buildStyles(utils, baseProps.style, {
		transform: orientation()
	});

	return (
		<svg
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			data-no-animation={b(baseProps.disableAnimation)}
			class={c(classes.chevron, root.class)}
			{...styles}
			{...other}
		>
			<path
				d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
				fill={color()}
				fill-rule="evenodd"
				clip-rule="evenodd"
			/>
		</svg>
	);
}

export {
	Chevron,
	ChevronProps,
	defaultChevronProps
};