import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, kobalteTextFieldProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextAreaProps extends BaseInputProps<KobalteTextField.TextFieldTextAreaProps> {

}

const textareaSplitProps = [

] as const;

function TextAreaInput(props: TextAreaProps) {

	const [root, input, other] = splitProps(props, kobalteTextFieldProps, textareaSplitProps);

	return (
		<BaseInput<TextAreaProps>
			{...root}
		>
			<KobalteTextField.TextArea {...input} />
		</BaseInput>
	);
}

export {
	TextAreaInput,
	TextAreaProps
};