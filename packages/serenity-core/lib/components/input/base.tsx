import { JSX, Show, mergeProps, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { DefaultProps } from "../../typings/deprecated";
import { SerenityBaseProps } from "../../typings/props";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c, b } from "../../utils/css";
import { resolveLength, resolveSize } from "../../utils/resolvers";

type DefaultBaseInputProps = TextField.TextFieldRootProps & TextField.TextFieldLabelProps & TextField.TextFieldDescriptionProps & TextField.TextFieldErrorMessageProps;
type BaseInputProps<P> = Omit<DefaultBaseInputProps, 'onchange' | 'onChange'> & SerenityBaseProps & {
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
	'variant' | 'styles' | 'radius' | 'size'
> = {
	variant: 'default',
	radius: 'sm',
	size: 'sm',
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
			class={c(defaultBaseInputProps.styles.root, baseProps.class)}
			data-variant={baseProps.variant}
			validationState={baseProps.error ? 'invalid' : 'valid'}
			{...styles()}
			{...other}
		>
			<Show when={baseProps.label}>
				<TextField.Label 
					class={defaultBaseInputProps.styles.label}
					data-required={b(baseProps.required)}
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