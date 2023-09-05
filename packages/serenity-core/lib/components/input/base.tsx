import { JSX, Show, mergeProps, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, cssvars, cx, resolveModifier, resolveSize } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";

type DefaultBaseInputProps = TextField.TextFieldRootProps & TextField.TextFieldLabelProps & TextField.TextFieldDescriptionProps & TextField.TextFieldErrorMessageProps;
type BaseInputProps<P> = DefaultBaseInputProps & SerenityBaseProps & {
	label?: string;
	description?: string;
	error?: string;
	variant?: 'outlined' | 'filled' | 'default';
	styles?: Record<'root' | 'label' | 'description' | 'error' | 'wrapper' | 'leftSection' | 'rightSection', string>;
	radius?: Size | number;
	size?: Size;
	rightSection?: JSX.Element;
	leftSection?: JSX.Element;
} & P;

const defaultBaseInputProps: DefaultProps<
	BaseInputProps<{}>,
	'variant' | 'styles' | 'radius' | 'size'
> = {
	variant: 'default',
	radius: 'xs',
	size: 'md',
	styles: {
		root: classes['base-input'],
		label: classes['base-input__label'],
		description: classes['base-input__description'],
		error: classes['base-input__error'],
		wrapper: classes['base-input__wrapper'],
		leftSection: classes['base-input__left-section'],
		rightSection: classes['base-input__right-section']
	}
};

const splitBaseInputProps = [
	"variant",
	"styles",
	"label",
	"description",
	"error",
	"class",
	"radius",
	"style",
	"size",
	"leftSection",
	"rightSection"
] as const;

const kobalteTextFieldErrorProps = [
	"forceMount",
	"validationState"
] as const;

const fieldInputSplitProps = [
	"onchange", "onChange",
	"oninput", "onInput",
	"placeholder"
] as const;

function BaseInput<P>(props: BaseInputProps<P>) {

	const [root, error, util, other] = splitProps(
		props,
		splitBaseInputProps,
		kobalteTextFieldErrorProps,
		UTILITY_NAMES
	);

	const baseProps = mergeProps(root, defaultBaseInputProps);

	const cssVariables = () => {
		const radius = resolveSize('radius', baseProps.radius, 'rem');
		const height = resolveModifier('input-height', baseProps.size);

		return cssvars({ radius, height });
	};

	const styles = buildStyles(util, baseProps.style as JSX.CSSProperties, cssVariables());

	return (
		<TextField.Root
			class={cx(defaultBaseInputProps.styles.root, root.class)}
			data-variant={props.variant}
			validationState={props.error ? 'invalid' : 'valid'}
			{...styles}
			{...other}
		>
			<Show when={props.label}>
				<TextField.Label class={defaultBaseInputProps.styles.label}>
					{baseProps.label}
				</TextField.Label>
			</Show>
			<Show when={props.description}>
				<TextField.Description class={defaultBaseInputProps.styles.description}>
					{baseProps.description}
				</TextField.Description>
			</Show>
			<label class={defaultBaseInputProps.styles.wrapper}>
				<div class={defaultBaseInputProps.styles.leftSection}>
					{baseProps.leftSection}
				</div>
				{props.children}
				<div class={defaultBaseInputProps.styles.rightSection}>
					{baseProps.rightSection}
				</div>
			</label>
			<Show when={props.error}>
				<TextField.ErrorMessage
					class={defaultBaseInputProps.styles.error}
					forceMount={error.forceMount}
				>
					{baseProps.error}
				</TextField.ErrorMessage>
			</Show>
		</TextField.Root>
	);
}

export {
	BaseInput,
	BaseInputProps,
	defaultBaseInputProps,
	fieldInputSplitProps
};