import { Component, splitProps } from "solid-js";
import { Select as KobalteSelect } from "@kobalte/core";
import { SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, c, localVars, resolveLength } from "@serenity-ui/styles";
import { Show } from "solid-js";
import { useSerenity } from "../../provider";
import { DefaultProps } from "../../typings/helpers";
import { mergeProps } from "solid-js";
import { SelectBaseItemComponentProps } from "@kobalte/core/dist/types/select/select-base";
import classes from "./select.module.scss";
import inputClasses from "../input/base.module.scss";
import { SelectValueState } from "@kobalte/core/dist/types/select/select-value";

interface SelectItemData {
	label: string;
	value: string;
	disabled?: boolean;
}

interface SelectGroupData {
	label: string;
	options: SelectItemData[];
}

interface SelectBaseProps extends SerenityBaseProps {
	variant?: "filled" | "default";
	label?: string;
	description?: string;
	error?: string;
	radius?: Size | number;
	onChange?: (value: string) => void;
}

type SelectOptionsData = (string | SelectItemData | SelectGroupData);
type SelectProps = Omit<KobalteSelect.SelectRootProps<SelectOptionsData, SelectOptionsData>, 'onChange'> & SelectBaseProps;

const selectSplitProps = [
	"class",
	"label",
	"error",
	"description",
	"aria-label",
	"radius",
	"style",
	"variant",
	"onChange",
	"value"
] as const;

const defaultSplitProps = {
	radius: "md",
	variant: "default"
} satisfies Partial<DefaultProps<SelectProps>>;

const SelectItem: Component<SelectBaseItemComponentProps<SelectOptionsData>> = (props) => {

	const label = typeof props.item.rawValue === "string" ? props.item.rawValue : props.item.rawValue.label;

	return (
		<KobalteSelect.Item 
			class={classes['select__item']} 
			item={props.item}
		>
			<KobalteSelect.ItemLabel 
				class={classes['select__item-label']} 
				children={label}
			/>
		</KobalteSelect.Item>
	);
};

function SelectSection(props: KobalteSelect.SelectRootSectionComponentProps<SelectGroupData>) {

	return (
		<KobalteSelect.Section 
			class={classes['select__section']} 
			children={props.section.rawValue.label}
		/>
	);
}

function Select(props: SelectProps) {

	const serenity = useSerenity();
	const [root, utils, other] = splitProps(props, selectSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultSplitProps, root);

	const cssVariables = () => localVars({
		radius: resolveLength("radius", baseProps.radius)
	});

	const styles = () => buildStyles(
		utils,
		cssVariables(),
		baseProps.style
	);

	const selectAttributes: () => any = () => {

		if (props.options.every(o => typeof o === "string")) {
			return {};
		}
		
		const attrs: Record<string, any> = {
			optionValue: "value",
			optionTextValue: "label",
			optionDisabled: "disabled"
		};

		// check if the options have groups
		if (props.options.every(o => typeof o === "object" && "options" in o)) {
			attrs.optionGroupChildren = "options";
			attrs.groupTextValue = "label";
		}

		return attrs;
	};

	const selectedValue = (state: SelectValueState<SelectOptionsData>) => {

		const value = state.selectedOption();

		if(!value) {
			return undefined;
		}

		if(typeof value === "string") {
			return value;
		}

		return value.label;
	}

	const onChange = (item: SelectItemData | string) => {

		if(typeof item === "string") {
			return props.onChange?.(item);
		}

		props.onChange?.(item.value);
	}

	const value = () => {

		if(props.options.every(o => typeof o === "string")) {
			return props.value;
		}

		return { value: root.value };
	};

	return (
		<KobalteSelect.Root<any>
			class={c(inputClasses['base-input'], classes['select'], root.class)}
			data-variant={root.variant}
			itemComponent={SelectItem as any}
			sectionComponent={SelectSection as any}
			onChange={onChange}
			value={value()}
			{...selectAttributes()}
			{...styles()}
			{...other}
		>
			<Show when={props.label}>
				{(label) => (
					<KobalteSelect.Label
						class={inputClasses['base-input__label']}
						children={label()}
					/>
				)}
			</Show>
			<Show when={props.description}>
				{(description) => (
					<KobalteSelect.Description
						class={inputClasses['base-input__description']}
						children={description()}
					/>
				)}
			</Show>
			<KobalteSelect.Trigger
				class={classes['select__trigger']}
				aria-label={root["aria-label"]}
			>
				<KobalteSelect.Value<SelectOptionsData> 
					children={selectedValue}
				/>
			</KobalteSelect.Trigger>
			<Show when={props.error}>
				{(error) => (
					<KobalteSelect.ErrorMessage
						class={classes['base-input__error']}
						children={error()}
					/>
				)}
			</Show>
			<KobalteSelect.Portal mount={serenity.element() ?? undefined}>
				<KobalteSelect.Content>
					<KobalteSelect.Listbox
						class={classes['select__listbox']}
					/>
				</KobalteSelect.Content>
			</KobalteSelect.Portal>
		</KobalteSelect.Root>
	);
}

export {
	Select,
	SelectGroupData,
	SelectItemData,
	SelectOptionsData,
	SelectProps
};