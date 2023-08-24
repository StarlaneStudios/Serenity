import { Color, resolveColorInput } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";

interface ChevronProps extends Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'children'> {
	orientation?: "up" | "down" | "left" | "right";
	color?: Color;
	disableAnimation?: boolean;
}

const defaultChevronProps: Required<Pick<
	ChevronProps,
	'orientation' | 'color' | 'disableAnimation'
>> = {
	orientation: "down",
	color: "gray.6",
	disableAnimation: false
};

const chevronSplitProps = [
	"orientation",
	"color",
	"style",
	"disableAnimation"
] as const;

function Chevron(props: ChevronProps) {

	const [root, other] = splitProps(props, chevronSplitProps);
	const baseProps = mergeProps(defaultChevronProps, root);

	const color = () => {
		return resolveColorInput(baseProps.color);
	};

	const orientation = () => {
		switch (baseProps.orientation) {
			case "up":
				return "rotate(180deg)";
			case "left":
				return "rotate(90deg)";
			case "right":
				return "rotate(-90deg)";
			default:
				return "";
		}
	};

	return (
		<svg
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={Object.assign({ width: "16px", height: "16px", transform: orientation() }, baseProps.style)}
			data-no-animation={baseProps.disableAnimation}
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