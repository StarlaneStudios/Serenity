import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, kobalteTextFieldProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextInputProps extends Omit<BaseInputProps, keyof KobalteTextField.TextFieldInputProps>, KobalteTextField.TextFieldInputProps {

}

function TextInput(props: TextInputProps) {

	const [root, kobalte, other] = splitProps(props, [], kobalteTextFieldProps);

	return (
		<BaseInput {...kobalte}>
			<KobalteTextField.Input
			/>
		</BaseInput>
	)
}

export {
	TextInput,
	TextInputProps
};