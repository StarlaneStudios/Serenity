import { JSX, mergeProps, splitProps } from "solid-js";
import classes from "./loader.module.scss";
import { DefaultProps } from "../../typings/deprecated";
import { SerenityBaseProps } from "../../typings/props";
import { ColorValue } from "../../typings/theme";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c } from "../../utils/css";
import { resolveLength, resolveColor } from "../../utils/resolvers";

interface LoaderProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLSpanElement> {

	/**
	 * The duration of the animation in milliseconds.
	 * @default 1000
	 */
	duration?: number;

	/**
	 * The color of the loader element.
	 * @default "blue"
	 */
	color?: ColorValue;

	/**
	 * The size of the loader element.
	 * @default "sm"
	 */
	size?: Size | number;
}

const loaderSplitProps = [
	"duration",
	"color",
	"class",
	"style",
	"size"
] as const;

const defaultLoaderProps: DefaultProps<
	LoaderProps,
	'duration' | 'color' | 'size'
> = {
	duration: 1250,
	color: "blue",
	size: "sm"
};

function Loader(props: LoaderProps) {

	const [root, utils, other] = splitProps(props, loaderSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultLoaderProps, root);

	const cssVariables = () => localVars({
		size: resolveLength("loader-size", baseProps.size),
		color: resolveColor(baseProps.color),
		duration: baseProps.duration + 'ms',
		'background-color': resolveColor(baseProps.color, 6) + "aa"
	});

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<span
			class={c(classes.loader, baseProps.class)}
			role="presentation"
			{...styles()}
			{...other}
		/>
	);
}

export {
	LoaderProps,
	Loader,
	defaultLoaderProps
};