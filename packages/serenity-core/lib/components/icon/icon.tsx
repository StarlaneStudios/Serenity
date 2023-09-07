import classes from './icon.module.scss';
import { Color, SerenityBaseProps, Size, UTILITY_NAMES, Variant, buildStyles, cssvars, cx, resolveColorInput, resolveSize } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from '../../util/types';
import { bool } from '../../util/props';

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
		return resolveColorInput(baseProps.color);
	}

	const cssVariables = () => cssvars({
		'icon-size': resolveSize('icon-size', baseProps.size, 'em')
	});

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<svg
			role="img"
			aria-hidden
			viewBox="0 0 24 24"
			data-nudge-start={bool(baseProps.start)}
			data-nudge-end={bool(baseProps.end)}
			data-spinning={bool(baseProps.spinning)}
			class={cx(classes.icon, root.class)}
			{...styles}
			{...other}
		>
			<path d={root.path} style={{ fill: color() }} />
		</svg>
	);
}

export { Icon, IconProps };