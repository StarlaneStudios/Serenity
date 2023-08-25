import classes from './icon.module.scss';
import { Color, Size, Variant, cssvars, cx, resolveColorInput, resolveSize } from "@serenity-ui/styles";
import { JSX, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from '../../util/types';

interface IconProps extends JSX.HTMLAttributes<SVGSVGElement> {
	path: string;
	size?: Size | number;
	color?: Color;
	variant?: Omit<Variant, 'transparent' | 'white'>;
	right?: boolean;
	left?: boolean;
	spinning?: boolean;
}

const iconSplitProps = [
	"class",
	"style",
	"path",
	"size",
	"color",
	"right",
	"left",
	"spinning"
] as const;

const defaultIconProps: DefaultProps<IconProps, 'size' | 'color'> = {
	size: 'md',
	color: 'currentColor'
};

function Icon(props: IconProps) {

	const [root, other] = splitProps(props, iconSplitProps);
	const baseProps = mergeProps(defaultIconProps, root);
	
	const color = () => {
		return resolveColorInput(baseProps.color);
	}

	const cssVariables = () => cssvars({
		'icon-size': resolveSize(baseProps.size, 'icon-size', 'em')
	});

	return (
		<svg
			role="img"
			aria-hidden
			viewBox="0 0 24 24"
			style={Object.assign(cssVariables(), baseProps.style)} 
			class={cx(
				classes.icon,
				root.class,
				root.left && classes['icon--left'],
				root.right && classes['icon--right'],
				root.spinning && classes['icon--spinning']
			)}
			{...other}
		>
			<path d={root.path} style={{ fill: color() }} />
		</svg>
	);
}

export { Icon, IconProps };