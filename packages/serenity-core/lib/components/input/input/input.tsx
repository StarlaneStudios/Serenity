import { splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";
import createBlurInputTrigger from "../../../primitives/createBlurTrigger";

interface InputFieldProps extends BaseInputProps<KobalteTextField.TextFieldInputProps> {

}

function InputField(props: InputFieldProps) {

	const [input, extra, other] = splitProps(props, fieldInputSplitProps, ["type", "error", "lazyError"]);
	const blur = createBlurInputTrigger(props.value, props.error, extra.lazyError);

	return (
		<BaseInput<InputFieldProps>
			lazyError={extra.lazyError}
			error={blur.value()}
			{...other}
		>
			<KobalteTextField.Input
				type={extra.type}
				onBlur={blur.handleBlur}
				{...input}
			/>
		</BaseInput>
	);
}

export {
	InputField,
	InputFieldProps
};