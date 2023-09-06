import { Size, Variant } from "@serenity-ui/styles";
import { JSX } from "solid-js";

interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "fill" | "light" | "";
	size?: Size;
}

function Alert(props: AlertProps) {

	

	return (
		<div>

		</div>
	);
}

export { Alert, AlertProps };