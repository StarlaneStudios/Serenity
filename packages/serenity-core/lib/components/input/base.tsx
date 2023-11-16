import { JSX, Show, children, createSignal, mergeProps, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { SerenityBaseProps, Size, UTILITY_NAMES, b, buildStyles, c, localVars, resolveLength, resolveSize } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";

type DefaultBaseInputProps = TextField.TextFieldRootProps & TextField.TextFieldLabelProps & TextField.TextFieldDescriptionProps & TextField.TextFieldErrorMessageProps;
type BaseInputProps<P> = DefaultBaseInputProps & SerenityBaseProps & {
	label?: string;
	description?: string;
	error?: string;
	variant?: 'outline' | 'filled' | 'default';
	styles?: Record<'root' | 'label' | 'description' | 'error' | 'wrapper' | 'leftSection' | 'rightSection', string>;
	radius?: Size | number;
	size?: Size;
	rightSection?: JSX.Element;
	leftSection?: JSX.Element;
	required?: boolean;
	lazyError?: boolean; // shows error only when input is dirty
} & P;

const defaultBaseInputProps: DefaultProps<
	BaseInputProps<{}>,
	'variant' | 'styles' | 'radius' | 'size' | 'required' | 'lazyError'
> = {
	variant: 'default',
	radius: 'xs',
	size: 'sm',
	required: false,
	lazyError: true,
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
	"rightSection",
	"required",
	"lazyError"
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
		const radius = resolveLength('radius', baseProps.radius);
		const height = resolveSize('input-height', baseProps.size);

		return localVars({ radius, height });
	};

	const styles = () => buildStyles(util, cssVariables(), baseProps.style as JSX.CSSProperties);

	return (
		<TextField.Root
			class={c(defaultBaseInputProps.styles.root, baseProps.class)}
			data-variant={baseProps.variant}
			data-lazy={b(baseProps.lazyError)}
			validationState={baseProps.error ? 'invalid' : 'valid'}
			{...styles()}
			{...other}
		>
			<Show when={baseProps.label}>
				<TextField.Label 
					class={defaultBaseInputProps.styles.label}
					data-required={baseProps.required}
				>
					{baseProps.label}
				</TextField.Label>
			</Show>
			<Show when={baseProps.description}>
				<TextField.Description class={defaultBaseInputProps.styles.description}>
					{baseProps.description}
				</TextField.Description>
			</Show>
			<label class={baseProps.styles.wrapper}>
				<div class={baseProps.styles.leftSection}>
					{baseProps.leftSection}
				</div>
				{props.children}
				<div class={baseProps.styles.rightSection}>
					{baseProps.rightSection}
				</div>
			</label>
			<Show when={baseProps.error}>
				<TextField.ErrorMessage
					class={baseProps.styles.error}
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