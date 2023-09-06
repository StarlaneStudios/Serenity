import { SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, cx } from "@serenity-ui/styles";
import { JSX, Show, createUniqueId, mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../util/types";
import classes from "./alert.module.scss";

interface AlertProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

	/**
	 * The variant of the alert
	 * @default fill
	 */
	variant?: "default" | "fill" | "light" | "outline";

	/**
	 * The size of the alert.
	 * @default md
	 */
	size?: Size;

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
	 * Event callback that closes the alert.
	 */
	onClose: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;

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
}

const alertSplitProps = [
	"class",
	"style",
	"variant",
	"size",
	"radius",
	"title",
	"onClose",
	"styles",
	"withCloseButton",
	"withIcon",
	"children"
] as const;

const defaultAlertProps: DefaultProps<
	AlertProps,
	'variant' | 'size' | 'radius' |
	'withIcon' | 'withCloseButton' | 'styles'
> = {
	radius: "sm",
	size: "md",
	variant: "default",
	withCloseButton: true,
	withIcon: true,
	styles: {
		title: classes['alert__title'],
		message: classes['alert__message'],
		body: classes['alert__body'],
		icon: classes['alert__icon'],
		"close-icon": classes['alert__close-icon']
	}
};

function Alert(props: AlertProps) {

	const [root, utils, other] = splitProps(props, alertSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultAlertProps, root);
	const style = buildStyles(utils);

	const labelIdentifier = createUniqueId(), descriptionIdentifier = createUniqueId();

	return (
		<div
			class={cx(classes.alert, baseProps.class)}
			data-variant={baseProps.variant}
			role="alert"
			aria-describedby={descriptionIdentifier}
			aria-label={labelIdentifier}
			{...other}
			{...style}
		>
			<div class={baseProps.styles.icon}>
				i
			</div>
			<div class={baseProps.styles.body}>
				<Show when={baseProps.title}>
					<span id={labelIdentifier} class={baseProps.styles.title}>
						{baseProps.title}
					</span>
				</Show>
				<p id={descriptionIdentifier} class={baseProps.styles.message}>
					{baseProps.children}
				</p>
			</div>
			<div class={baseProps.styles["close-icon"]}>
				c
			</div>
		</div>
	);
}

export { Alert, AlertProps };