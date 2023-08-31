import { onMount, splitProps } from "solid-js";
import { BaseInput, BaseInputProps, fieldInputSplitProps } from "../base";
import { TextField as KobalteTextField } from "@kobalte/core";

interface TextAreaProps extends BaseInputProps<KobalteTextField.TextFieldTextAreaProps> {

}

function TextAreaInput(props: TextAreaProps) {

	let ref: HTMLTextAreaElement | undefined;
	const [input, other] = splitProps(props, fieldInputSplitProps);

	onMount(() => ref?.parentElement?.setAttribute('for', ref.id));

	return (
		<BaseInput<TextAreaProps> {...other}>
			<KobalteTextField.TextArea ref={ref} {...input} />
		</BaseInput>
	);
}

export {
	TextAreaInput,
	TextAreaProps
};