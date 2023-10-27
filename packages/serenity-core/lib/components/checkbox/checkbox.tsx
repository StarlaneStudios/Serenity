import { Color, SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, c, localVars, resolveColor, resolveLength } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { Checkbox as KobalteCheckbox } from "@kobalte/core";
import { DefaultProps } from "../../typings/helpers";
import { OverrideComponentProps } from "@kobalte/utils";
import classes from "./checkbox.module.scss";
import { CHECK_ICON } from "../../constants/icons";
import { Icon } from "../icon";
import { useSerenity } from "../../provider";

interface CheckboxProps extends SerenityBaseProps {

	/**
	 * The name of the checkbox. Used for form submission.
	 * @default undefined
	 */
	name?: string;

	/**
	 * Whether the checkbox is disabled or not.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the checkbox is checked or not.
	 * @default false
	 */
	checked?: boolean;

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
	 * @default "blue.6"
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

const defaultCheckboxProps = {
	description: undefined,
	name: undefined,
	disabled: false,
	checked: false,
	radius: "sm",
	styles: {
		label: classes['checkbox__label'],
		description: classes['checkbox__description'],
		control: classes['checkbox__control'],
		error: classes['checkbox__error']
	}
} satisfies Partial<DefaultProps<CheckboxProps>>;

function Checkbox(props: Omit<OverrideComponentProps<"div", CheckboxProps>, 'onChange'>) {

	const { accentColor } = useSerenity();

	const [root, utils, others] = splitProps(props, checkboxSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultCheckboxProps, root);

	const cssVariables = () => {

		const color = resolveColor(baseProps.color ?? accentColor());
		const radius = resolveLength("radius", baseProps.radius);

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