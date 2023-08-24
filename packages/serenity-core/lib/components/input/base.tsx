import { JSX } from "solid-js";

interface BaseInputProps<T> extends JSX.InputHTMLAttributes<T> {

	
}

function BaseInput<E, T extends JSX.InputHTMLAttributes<E>>(props: BaseInputProps<T>) {

}