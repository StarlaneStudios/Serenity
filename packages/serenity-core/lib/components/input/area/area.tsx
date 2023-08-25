import { BaseInput, BaseInputProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextAreaProps extends BaseInputProps<HTMLTextAreaElement> {
	
}

function TextAreaInput(props: TextAreaProps) {

	return (
		<BaseInput>
			<KobalteTextField.TextArea 
				{...props}
			/>
		</BaseInput>
	)
}

export {
	TextAreaInput,
	TextAreaProps
};