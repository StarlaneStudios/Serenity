import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {

}

function InputField(props: InputFieldProps) {

	const [input, extra, other] = splitProps(props, fieldInputSplitProps, ["type"]);

	return (
		<BaseInput<InputFieldProps> {...other}>
			<KobalteTextField.Input 
				type={extra.type} 
				{...input} 
			/>
		</BaseInput>
	);
}

export {
	InputField,
	InputFieldProps
};