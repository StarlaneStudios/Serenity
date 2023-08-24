import { JSX } from "solid-js";

interface ModalProps<T> extends JSX.InputHTMLAttributes<T> {

	
}

function Modal<E, T extends JSX.InputHTMLAttributes<E>>(props: ModalProps<T>) {

}

export {
	Modal,
	ModalProps
}