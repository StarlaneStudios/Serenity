import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {

}

function InputField(props: InputFieldProps) {

	const [input, other] = splitProps(props, fieldInputSplitProps);

	return (
		<BaseInput<InputFieldProps> {...other}>
			<KobalteTextField.Input {...input} />
		</BaseInput>
	);
}

export {
	InputField,
	InputFieldProps
};