import { splitProps } from "solid-js";
import { Select as KobalteSelect } from "@kobalte/core";
import { c } from "@serenity-ui/styles";
import { Show } from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual";
import classes from "./select.module.scss";
import inputClasses from "../input/base.module.scss";
import { useSerenity } from "../../provider";

interface SelectItem {
	label: string;
	value: string;
	disabled?: boolean;
}

interface SelectGroup {
	label: string;
	options: SelectItem[];
}

type SelectProps = KobalteSelect.SelectRootProps<SelectItem, SelectGroup> & {
	label?: string;
	description?: string;
	error?: string;
};

function SelectItem(props: KobalteSelect.SelectItemProps) {

	return (
		<KobalteSelect.Item class={classes['select__item']} item={props.item}>
			<KobalteSelect.ItemLabel class={classes['select__item-label']}>
				{props.item.rawValue.label}
			</KobalteSelect.ItemLabel>
		</KobalteSelect.Item>
	);
}

function SelectSection(props: KobalteSelect.SelectRootSectionComponentProps<SelectGroup>) {

	return (
		<KobalteSelect.Section class={classes['select__section']}>
			{props.section.rawValue.label}
		</KobalteSelect.Section>
	);
}

function Select(props: SelectProps) {

	const serenity = useSerenity();
	
	const [root, other] = splitProps(props, [
		"class",
		"label",
		"error",
		"description",
		"aria-label"
	]);

	let listboxRef: HTMLUListElement | undefined;

	const virtualizer = createVirtualizer({
		count: (props.options ?? []).length,
		getScrollElement: () => listboxRef,
		estimateSize: () => 32,
		enableSmoothScroll: false,
		overscan: 5
	});

	return (
		<KobalteSelect.Root
			class={c(inputClasses['base-input'], root.class)}
			itemComponent={SelectItem}
			optionValue="value"
			optionGroupChildren="options"
			optionTextValue="label"
			optionDisabled="disabled"
			sectionComponent={SelectSection}
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
				<KobalteSelect.Value<string>>
					{state => state.selectedOption()}
				</KobalteSelect.Value>
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
					<KobalteSelect.Listbox<SelectItem, SelectGroup>
						ref={listboxRef}
						class={classes['select__listbox']}
						scrollToItem={key => virtualizer.scrollToIndex(parseInt(key))}
					/>
				</KobalteSelect.Content>
			</KobalteSelect.Portal>
		</KobalteSelect.Root>
	);
}

export {
	Select
};