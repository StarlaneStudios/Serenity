import { JSX, Show } from "solid-js";
import { TextField } from "@kobalte/core";
import classes from "./base.module.scss";
import { cx } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";

interface BaseInputProps<T> extends JSX.InputHTMLAttributes<T> {
	label?: string;
	description?: string;
	error?: string;
	variant?: 'outlined' | 'filled' | 'default';
	styles?: Record<'label', string>;
}

const defaultBaseInputProps: DefaultProps<
	BaseInputProps<HTMLInputElement>,
	'variant' | 'styles'
> = {
	variant: 'outlined',
	styles: {
		label: classes['input--label']
	}
};

function BaseInput<E, T extends JSX.InputHTMLAttributes<E> = JSX.InputHTMLAttributes<E>>(props: BaseInputProps<T>) {

	return (
		<TextField.Root
			class={cx(classes.input, classes.root)}
			data-variant={props.variant}
		>
			<Show when={!!props.label}>
				<div class={defaultBaseInputProps.styles.label}>
					{props.label}
				</div>
			</Show>
			<Show when={!!props.description}>
				<div class={classes['input--description']}>
					{props.description}
				</div>
			</Show>
			{props.children}
			<Show when={!!props.error}>
				<TextField.ErrorMessage>
					{props.error}
				</TextField.ErrorMessage>
			</Show>
		</TextField.Root>
	);
}

export {
	BaseInput,
	BaseInputProps,
	defaultBaseInputProps
};