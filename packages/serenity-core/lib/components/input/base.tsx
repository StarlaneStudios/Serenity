import { JSX, Show, children, mergeProps, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { Size, cssvars, cx, resolveModifier, resolveSize } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";
import { Row } from "../row";

type DefaultBaseInputProps = TextField.TextFieldRootProps & TextField.TextFieldLabelProps & TextField.TextFieldDescriptionProps & TextField.TextFieldErrorMessageProps;
type BaseInputProps<P> = DefaultBaseInputProps & {
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

const kobalteTextFieldProps = [
	"value",
	"defaultValue",
	"onChange",
	"name",
	"required",
	"disabled",
	"readOnly"
] as const;

const kobalteTextFieldErrorProps = [
	"forceMount",
	"validationState"
] as const;

const fieldInputSplitProps = [
	"onchange", "onChange",
	"oninput", "onInput"
] as const;

function BaseInput<P>(props: BaseInputProps<P>) {

	const [root, kobalte, error] = splitProps(
		props, splitBaseInputProps,
		kobalteTextFieldProps,
		kobalteTextFieldErrorProps
	);

	const baseProps = mergeProps(root, defaultBaseInputProps);

	const cssVariables = () => {
		const radius = resolveSize('radius', baseProps.radius, 'rem');
		const height = resolveModifier('input-height', baseProps.size);

		return cssvars({ radius, height });
	};

	console.log(props.children);

	return (
		<TextField.Root
			class={cx(defaultBaseInputProps.styles.root, root.class)}
			data-variant={props.variant}
			style={Object.assign(cssVariables(), root.style)}
			validationState={props.error ? 'invalid' : 'valid'}
			{...kobalte}
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
			<Row class={defaultBaseInputProps.styles.wrapper} spacing={0}>
				<div class={defaultBaseInputProps.styles.leftSection}>
					{baseProps.leftSection}
				</div>
				{props.children}
				<div class={defaultBaseInputProps.styles.rightSection}>
					{baseProps.rightSection}
				</div>
			</Row>
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