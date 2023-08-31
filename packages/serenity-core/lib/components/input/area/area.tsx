import { onMount, splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextAreaProps extends BaseInputProps<KobalteTextField.TextFieldTextAreaProps> {

}

function TextAreaInput(props: TextAreaProps) {

	const [input, other] = splitProps(props, fieldInputSplitProps);

	return (
		<BaseInput<TextAreaProps> {...other}>
			<KobalteTextField.TextArea {...input} />
		</BaseInput>
	);
}

export {
	TextAreaInput,
	TextAreaProps
};