import { Color, Size, cssvars, cx, resolveColorInput, resolveSize } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import classes from "./loader.module.scss";

interface LoaderProps extends JSX.HTMLAttributes<HTMLSpanElement> {

	/**
	 * The duration of the animation in milliseconds.
	 * @default 1000
	 */
	duration?: number;

	/**
	 * The color of the loader element.
	 * @default "blue"
	 */
	color?: Color;

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

	const [root, other] = splitProps(props, loaderSplitProps);
	const baseProps = mergeProps(defaultLoaderProps, root);

	const cssVariables = () => cssvars({
		size: resolveSize("loader-size", baseProps.size, "rem"),
		duration: baseProps.duration + 'ms',
		color: resolveColorInput(baseProps.color),
		"background-color": resolveColorInput(baseProps.color, 6) + "aa"
	});

	return (
		<span
			class={cx(classes.loader, baseProps.class)}
			style={Object.assign(cssVariables(), baseProps.style)}
			role="presentation"
			{...other}
		/>
	);
}

export {
	LoaderProps,
	Loader,
	defaultLoaderProps
};