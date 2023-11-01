import { JSX, mergeProps } from "solid-js";
import { DefaultProps } from "../../typings/deprecated";

interface DialogProps extends JSX.DialogHtmlAttributes<HTMLDialogElement> {

}

const defaultDialogProps: DefaultProps<DialogProps, 'open'> = {
	open: false
};

function Dialog(props: DialogProps) {

	const baseProps = mergeProps(defaultDialogProps, props);

	let dialog: HTMLDialogElement;

	const close = () => {
		dialog.setAttribute('aria-hidden', 'true');
		dialog.setAttribute('open', 'false');
	};

	const open = () => {
		dialog.setAttribute('aria-hidden', 'false');
		dialog.setAttribute('open', 'true');
	};

	return (
		<dialog
			open={baseProps.open}
			aria-hidden={!baseProps.open}
		>
			{baseProps.children}
		</dialog>
	);
}

export {
	Dialog,
	DialogProps
};