import { onMount, splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";
import createBlurInputTrigger from "../../../primitives/createBlurTrigger";

interface TextAreaProps extends BaseInputProps<KobalteTextField.TextFieldTextAreaProps> {

}

function TextAreaInput(props: TextAreaProps) {

	const [input, extra, other] = splitProps(props, fieldInputSplitProps, ["error", "lazyError"]);
	const blur = createBlurInputTrigger(props.value, extra.error, extra.lazyError);
	
	return (
		<BaseInput<TextAreaProps> 
			lazyError={extra.lazyError}
			error={blur.value()}
			{...other}
		>
			<KobalteTextField.TextArea 
				onBlur={blur.handleBlur}
				{...input} 
			/>
		</BaseInput>
	);
}

export {
	TextAreaInput,
	TextAreaProps
};