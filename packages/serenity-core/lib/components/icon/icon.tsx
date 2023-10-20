import classes from './icon.module.scss';
import { Color, SerenityBaseProps, Size, UTILITY_NAMES, Variant, buildStyles, c, resolveColor, resolveLength, localVars, b } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from '../../util/types';

interface IconProps extends SerenityBaseProps, JSX.HTMLAttributes<SVGSVGElement> {
	path: string;
	size?: Size | number;
	color?: Color;
	variant?: Omit<Variant, 'transparent' | 'white'>;
	start?: boolean;
	end?: boolean;
	spinning?: boolean;
}

const iconSplitProps = [
	"class",
	"style",
	"path",
	"size",
	"color",
	"start",
	"end",
	"spinning"
] as const;

const defaultIconProps: DefaultProps<IconProps, 'size' | 'color'> = {
	size: 'md',
	color: 'currentColor'
};

function Icon(props: IconProps) {

	const [root, utils, other] = splitProps(props, iconSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultIconProps, root);
	
	const color = () => {
		return resolveColor(baseProps.color);
	}

	const cssVariables = () => localVars({
		size: resolveLength('icon-size', baseProps.size, 'em')
	});

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<svg
			role="img"
			aria-hidden
			viewBox="0 0 24 24"
			data-nudge-start={b(baseProps.start)}
			data-nudge-end={b(baseProps.end)}
			data-spinning={b(baseProps.spinning)}
			class={c(classes.icon, root.class)}
			{...styles()}
			{...other}
		>
			<path d={root.path} style={{ fill: color() }} />
		</svg>
	);
}

export { Icon, IconProps };