import { OverrideComponentProps } from "@kobalte/utils";
import { Color, SerenityBaseProps, UTILITY_NAMES, buildStyles, c, localVars, resolveColor } from "@serenity-ui/styles";
import { Switch as KobalteSwitch } from "@kobalte/core";
import classes from "./switch.module.scss";
import { mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../typings/helpers";

interface SwitchProps extends SerenityBaseProps {

	/**
	 *
	 */
	checked?: boolean;

	/**
	 * 
	 */
	disabled?: boolean;

	/**
	 * 
	 */
	styles?: Record<'label' | 'description' | 'control' | 'input' | 'thumb', string>;

	/**
	 * 
	 */
	label?: string;

	/**
	 * 
	 */
	description?: string;

	/**
	 * 
	 */
	color?: Color;
}

const switchSplitProps = [
	"class",
	"style",
	"label",
	"description"
] as const;

const switchDefaultProps = {
	checked: false,
	disabled: false,
	color: "blue",
	styles: {
		label: classes['switch__label'],
		description: classes['switch__description'],
		control: classes['switch__control'],
		input: classes['switch__input'],
		thumb: classes['switch__thumb']
	},
	description: undefined,
	label: undefined
} satisfies DefaultProps<SwitchProps>;

function Switch(props: OverrideComponentProps<"div", SwitchProps>) {

	const [root, utility, other] = splitProps(props, switchSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(switchDefaultProps, utility);

	const cssVariables = () => {

		const color = resolveColor(baseProps.color);

		return localVars({ color });
	};

	const style = () => buildStyles(utility, cssVariables(), baseProps.styles);


	return (
		<KobalteSwitch.Root
			class={c(classes.switch, root.class)}
			{...style()}
			{...other}
		>
			<div>
				<KobalteSwitch.Label class={switchDefaultProps.styles.label}>
					{baseProps.label || "Onbekende"}
				</KobalteSwitch.Label>
				<KobalteSwitch.Description class={switchDefaultProps.description}>
					Disable all network connections.
				</KobalteSwitch.Description>
			</div>
			<KobalteSwitch.Input class={switchDefaultProps.styles.input} />
			<KobalteSwitch.Control class={switchDefaultProps.styles.control}>
				<KobalteSwitch.Thumb class={switchDefaultProps.styles.thumb} />
			</KobalteSwitch.Control>
		</KobalteSwitch.Root>
	);
}

export { Switch, SwitchProps };