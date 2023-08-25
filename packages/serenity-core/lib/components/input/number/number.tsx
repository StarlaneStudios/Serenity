import { BaseInput, BaseInputProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface NumberInputProps extends Omit<BaseInputProps<HTMLInputElement>, 'type'> {

}

function NumberInput(props: NumberInputProps) {

	return (
		<BaseInput>
			<KobalteTextField.Input 
				type="number"
			/>
		</BaseInput>
	);
}

export {
	NumberInputProps,
	NumberInput
};