import { JSX, Match, Show, Switch, createUniqueId, mergeProps, splitProps } from "solid-js";
import classes from "./alert.module.scss";
import { Button } from "../button";
import { VARIANTS } from "../../constants/variants";
import { Optional } from "../../typings/helpers";
import { Icon } from "../icon";
import { CLOSE_ICON, INFORMATION_ICON } from "../../constants/icons";
import { useSerenity } from "../../provider";
import { DefaultProps } from "../../typings/deprecated";
import { SerenityBaseProps } from "../../typings/props";
import { ColorValue } from "../../typings/theme";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c } from "../../utils/css";
import { resolveSize, resolveColor } from "../../utils/resolvers";

interface AlertProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

	/**
	 * The variant of the alert
	 * @default filled
	 */
	variant?: "default" | "filled" | "light" | "outline" | "transparent" | "white";

	/**
	 * The color of the alert.
	 * @default blue
	 */
	color?: ColorValue;

	/**
	 * The border radius of the alert.
	 * @default md
	 */
	radius?: Size;

	/**
	 * Title of the alertbanner.
	 * @default undefined
	 */
	title?: string;

	/**
	 * Wether to show the alert or not.
	 * @default false
	 */
	show?: boolean;

	/**
	 * Event callback that closes the alert.
	 */
	onClose: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;

	/**
	 * The styles within the alert component that you can reference and override.
	 * @default undefined
	 */
	styles?: Record<'icon' | 'title' | 'message' | 'body' | 'close-icon', string>;

	/**
	 * Wether to show the close button or not.
	 * @default true
	 */
	withCloseButton?: boolean;

	/**
	 * Wether to show the icon button or not.
	 * @default true
	 */
	withIcon?: boolean;

	/**
	 * The icon to represent the alert.
	 * @default undefined
	 */
	icon?: Optional<(classname: string) => JSX.Element>;

	/**
	 * The icon of the close button.
	 * @default undefined
	 */
	closeIcon?: Optional<(classname: string, close: this['onClose']) => JSX.Element>;
}

const alertSplitProps = [
	"class",
	"style",
	"variant",
	"radius",
	"title",
	"onClose",
	"styles",
	"withCloseButton",
	"withIcon",
	"children",
	"show",
	"closeIcon",
	"icon",
	"color"
] as const;

const defaultAlertProps: DefaultProps<
	AlertProps,
	'variant' | 'radius' |
	'withIcon' | 'withCloseButton' | 'styles' |
	'show'
> = {
	radius: "sm",
	variant: "filled",
	withCloseButton: true,
	withIcon: true,
	show: false,
	styles: {
		title: classes['alert__title'],
		message: classes['alert__message'],
		body: classes['alert__body'],
		icon: classes['alert__icon'],
		"close-icon": classes['alert__close-icon']
	}
};

function Alert(props: AlertProps) {

	const { accentColor } = useSerenity();

	const [root, utils, other] = splitProps(props, alertSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultAlertProps, root);

	const cssVariables = () => {

		const color = baseProps.color ?? accentColor();

		const radius = resolveSize("radius", baseProps.radius);
		const textColor = resolveColor(color);
		const variant = VARIANTS[baseProps.variant](color, false);

		return localVars(
			Object.assign(variant, {
				"border-radius": radius,
				color: textColor,
			})
		);
	};

	const style = () => buildStyles(utils, cssVariables(), baseProps.style);
	const labelIdentifier = createUniqueId(), descriptionIdentifier = createUniqueId();

	return (
		<div
			class={c(classes.alert, baseProps.class)}
			data-variant={baseProps.variant}
			role="alert"
			aria-describedby={descriptionIdentifier}
			aria-label={labelIdentifier}
			aria-hidden={!baseProps.show}
			{...style()}
			{...other}
		>
			<Switch>
				<Match when={baseProps.withIcon && !baseProps.icon}>
					<Icon
						path={INFORMATION_ICON}
						class={baseProps.styles.icon}
						size={1.325}
					/>
				</Match>
				<Match when={baseProps.withIcon && baseProps.icon}>
					{baseProps.icon!(baseProps.styles.icon)}
				</Match>
			</Switch>
			<div class={baseProps.styles.body}>
				<Show when={baseProps.title}>
					<span id={labelIdentifier} class={baseProps.styles.title}>
						{baseProps.title}
					</span>
				</Show>
				<div
					id={descriptionIdentifier}
					class={baseProps.styles.message}
					aria-relevant="all"
					aria-atomic="true"
					aria-live="assertive"
				>
					{baseProps.children}
				</div>
			</div>
			<Switch>
				<Match when={baseProps.withCloseButton && !baseProps.closeIcon}>
					<Button
						class={baseProps.styles["close-icon"]}
						size="xs"
						variant="transparent"
						px={0.75}
						onclick={baseProps.onClose}
						style={{ "--text-color": undefined }}
					>
						<Icon path={CLOSE_ICON} size={1.1} />
					</Button>
				</Match>
				<Match when={baseProps.withCloseButton && baseProps.closeIcon}>
					{baseProps.closeIcon!(baseProps.styles["close-icon"], baseProps.onClose)}
				</Match>
			</Switch>
		</div>
	);
}

export { Alert, AlertProps, defaultAlertProps };