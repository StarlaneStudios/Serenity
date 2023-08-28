import { Show, splitProps } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { cx } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";

type DefaultBaseInputProps = TextField.TextFieldRootProps & TextField.TextFieldLabelProps & TextField.TextFieldDescriptionProps & TextField.TextFieldErrorMessageProps;
type BaseInputProps<P> = DefaultBaseInputProps & {
	label?: string;
	description?: string;
	error?: string;
	variant?: 'outlined' | 'filled' | 'default';
	styles?: Record<'root' | 'label' | 'description' | 'error', string>;
} & P;

const defaultBaseInputProps: DefaultProps<
	BaseInputProps<{}>,
	'variant' | 'styles'
> = {
	variant: 'outlined',
	styles: {
		root: classes['base-input'],
		label: classes['base-input__label'],
		description: classes['base-input__description'],
		error: classes['base-input__error']
	}
};

const splitBaseInputProps = [
	"variant",
	"styles",
	"label",
	"description",
	"error",
	"class"
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

function BaseInput<P>(props: BaseInputProps<P>) {

	const [root, kobalte, error] = splitProps(
		props, splitBaseInputProps, 
		kobalteTextFieldProps, 
		kobalteTextFieldErrorProps
	);

	return (
		<TextField.Root
			class={cx(defaultBaseInputProps.styles.root, root.class)}
			data-variant={props.variant}
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
			{props.children}
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
	DefaultBaseInputProps,
	defaultBaseInputProps,
	kobalteTextFieldProps
};