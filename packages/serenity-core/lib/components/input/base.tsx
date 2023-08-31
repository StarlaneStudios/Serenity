import { Show, mergeProps, splitProps } from "solid-js";
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
	styles?: Record<'root' | 'label' | 'description' | 'error' | 'wrapper', string>;
	radius?: Size | number;
	size?: Size;
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
		wrapper: classes['base-input__wrapper']
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
	"size"
] as const;

const kobalteTextFieldProps = [
	"value",
	"defaultValue",
	"onChange",
	"name",
	"validationState",
	"required",
	"disabled",
	"readOnly"
] as const;

const kobalteTextFieldErrorProps = [
	"forceMount"
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

	return (
		<TextField.Root
			class={cx(defaultBaseInputProps.styles.root, root.class)}
			data-variant={props.variant}
			style={Object.assign(cssVariables(), root.style)}
			{...kobalte}
		>
			<Show when={props.label}>
				<TextField.Label class={defaultBaseInputProps.styles.label}>
					{props.label}
				</TextField.Label>
			</Show>
			<Show when={props.description}>
				<TextField.Description class={defaultBaseInputProps.styles.description}>
					{props.description}
				</TextField.Description>
			</Show>
			<Row class={defaultBaseInputProps.styles.wrapper}>
				{props.children}
			</Row>
			<TextField.ErrorMessage
				class={defaultBaseInputProps.styles.error}
				{...error}
			>
				{props.error}
			</TextField.ErrorMessage>
		</TextField.Root>
	);
}

export {
	BaseInput,
	BaseInputProps,
	defaultBaseInputProps,
	fieldInputSplitProps
};