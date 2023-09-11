import { Color, SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, c, localVars, resolveColor, resolveSize } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { Checkbox as KobalteCheckbox } from "@kobalte/core";
import { DefaultProps } from "../../typings/helpers";
import { OverrideComponentProps } from "@kobalte/utils";
import classes from "./checkbox.module.scss";
import { CHECK_ICON } from "../../constants/icons";
import { Icon } from "../icon";

interface CheckboxProps extends SerenityBaseProps {

	/**
	 * Targeting certain styles within this component.
	 */
	styles?: Record<'label' | 'description' | 'control' | 'error', string>;

	/**
	 * The label of the checkbox.
	 */
	label: string;

	/**
	 * The description of the checkbox. 
	 */
	description?: string;

	/**
	 * The color of the checkbox.
	 * @default "blue"
	 */
	color?: Color;

	/**
	 * The radius of the checkbox.
	 * @default "sm"
	 */
	radius?: Size | number;
}

const checkboxSplitProps = [
	"class",
	"styles",
	"label",
	"description",
	"color",
	"radius"
] as const;

const defaultCheckboxProps: DefaultProps<CheckboxProps> = {
	description: undefined,
	color: "blue",
	radius: "sm",
	styles: {
		label: classes['checkbox__label'],
		description: classes['checkbox__description'],
		control: classes['checkbox__control'],
		error: classes['checkbox__error']
	}
};

function Checkbox(props: Omit<OverrideComponentProps<"div", CheckboxProps>, 'onChange'>) {

	const [root, utils, others] = splitProps(props, checkboxSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultCheckboxProps, root);

	const cssVariables = () => {

		const color = resolveColor(baseProps.color);
		const radius = resolveSize("radius", baseProps.radius);

		return localVars({
			color,
			"border-radius": radius
		});
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.styles);

	return (
		<KobalteCheckbox.Root
			class={c(classes.checkbox, baseProps.class)}
			{...others}
			{...styles()}
		>
			<KobalteCheckbox.Input class={classes['checkbox__input']} />
			<KobalteCheckbox.Control 
				class={classes['checkbox__control']}
			>
				<KobalteCheckbox.Indicator 
					class={classes['checkbox__indicator']}
				>
					<Icon 
						path={CHECK_ICON} 
						class={classes['checkbox__icon']} 
						color="var(--serenity-default-color)"
					/>
				</KobalteCheckbox.Indicator>
			</KobalteCheckbox.Control>
			<div>
				<KobalteCheckbox.Label class={classes['checkbox__label']}>
					{props.label}
				</KobalteCheckbox.Label>
				<KobalteCheckbox.Description class={classes['checkbox__description']}>
					{props.description}
				</KobalteCheckbox.Description>
			</div>
		</KobalteCheckbox.Root>
	);
}

export { Checkbox, CheckboxProps, defaultCheckboxProps };