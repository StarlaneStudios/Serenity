import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";
import createBlurInputTrigger from "../../../primitives/createBlurTrigger";
import { mergeProps } from "solid-js";

interface TextAreaProps extends BaseInputProps<KobalteTextField.TextFieldTextAreaProps> {
	lazyError?: boolean;
}

const splitBaseInputFieldProps = [
	"error",
	"lazyError",
	"required"
] as const;

const defaultBaseInputFieldsProps = {
	lazyError: true,
	required: false
} satisfies TextAreaProps;

function TextAreaInput(props: TextAreaProps) {

	const [input, extra, other] = splitProps(props, fieldInputSplitProps, splitBaseInputFieldProps);
	const baseProps = mergeProps(defaultBaseInputFieldsProps, extra);
	
	const blur = createBlurInputTrigger(props.value, baseProps.error, baseProps.lazyError);

	return (
		<BaseInput<TextAreaProps>
			error={blur.value()}
			required={baseProps.required}
			{...other}
		>
			<KobalteTextField.TextArea
				onBlur={blur.handleBlur}
				{...input} 
			/>
		</BaseInput>
	);
}

export {
	TextAreaInput,
	TextAreaProps
};