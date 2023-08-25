import { BaseInput, BaseInputProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextInputProps extends BaseInputProps<HTMLInputElement> {

}

function TextInput(props: TextInputProps) {

	return (
		<BaseInput>
			<KobalteTextField.Input 
				{...props}
			/>
		</BaseInput>
	)
}

export {
	TextInput,
	TextInputProps
};