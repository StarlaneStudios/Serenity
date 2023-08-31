import { createEffect, splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";
import { focusInput } from "../helper";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {

}

function InputField(props: InputFieldProps) {

	let ref: HTMLInputElement | undefined;
	const [input, other] = splitProps(props, fieldInputSplitProps);

	createEffect(() => {
		const clickHandler = focusInput(ref?.parentElement, ref);
		return clickHandler;
	});

	return (
		<BaseInput<InputFieldProps> {...other}>
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