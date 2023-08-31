import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {

}

function InputField(props: InputFieldProps) {

	let ref: HTMLInputElement | undefined;
	const [input, other] = splitProps(props, fieldInputSplitProps);

	return (
		<BaseInput<InputFieldProps>
			{...other}
		>
			<KobalteTextField.Input
				ref={ref}
				{...input}
			/>
		</BaseInput>
	);
}

export {
	InputField,
	InputFieldProps
};