import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";
import createBlurInputTrigger from "../../../primitives/createBlurTrigger";
import { mergeProps } from "solid-js";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {
	lazyError?: boolean;
}

const splitBaseInputFieldProps = [
	"error",
	"lazyError",
	"type",
	"required"
] as const;

const defaultBaseInputFieldsProps = {
	lazyError: true,
	required: false
} satisfies InputFieldProps;

function InputField(props: InputFieldProps) {

	const [input, extra, other] = splitProps(props, fieldInputSplitProps, splitBaseInputFieldProps);
	const baseProps = mergeProps(defaultBaseInputFieldsProps, extra);

	const blur = createBlurInputTrigger(other.value, baseProps.error, baseProps.lazyError);

	return (
		<BaseInput<InputFieldProps>
			error={blur.value()}
			required={baseProps.required}
			{...other}
		>
			<KobalteTextField.Input
				type={extra.type}
				onBlur={blur.handleBlur}
				{...input}
			/>
		</BaseInput>
	);
}

export {
	InputField,
	InputFieldProps
};