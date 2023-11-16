import { JSX, Show, mergeProps, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, c, localVars, resolveLength, resolveSize } from "@serenity-ui/styles";
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
} & P;

const defaultBaseInputProps: DefaultProps<
	BaseInputProps<{}>,
	'variant' | 'styles' | 'radius' | 'size' | 'required'
> = {
	variant: 'default',
	radius: 'xs',
	size: 'sm',
	required: false,
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
	"required"
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
			class={c(defaultBaseInputProps.styles.root, root.class)}
			data-variant={props.variant}
			validationState={props.error ? 'invalid' : 'valid'}
			{...styles()}
			{...other}
		>
			<Show when={props.label}>
				<TextField.Label 
					class={defaultBaseInputProps.styles.label}
					data-required={root.required}
				>
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