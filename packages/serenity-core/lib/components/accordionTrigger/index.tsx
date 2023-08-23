import { mergeProps, splitProps } from "solid-js";
import _classes from "../accordion/accordion.module.scss";
import { Group, GroupProps } from "../group";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { cx } from "@serenity-ui/styles";
import { Chevron } from "../chevron";

interface AccordionTriggerProps extends GroupProps {

}

const accordionTriggerSplitProps = [
	"children",
	"class",
	"align",
	"justify",
	"noWrap"
] as const;

const defaultAccordionTriggerProps: Required<Pick<
	AccordionTriggerProps,
	'align' | 'justify' | 'noWrap'
>> = {
	align: 'center',
	justify: 'space-between',
	noWrap: true
};

function AccordionTrigger(props: AccordionTriggerProps) {

	const [root, other] = splitProps(props, accordionTriggerSplitProps);
	const baseProps = mergeProps(defaultAccordionTriggerProps, root);

	return (
		<KobalteAccordion.Trigger
			class={cx(_classes['accordion--trigger'], root.class)}
			asChild
		>
			<As
				component={Group}
				noWrap={baseProps.noWrap}
				align={baseProps.align}
				justify={baseProps.justify}
				{...other}
			>
				{root.children}
				<Chevron class={_classes['accordion--chevron']} />
			</As>
		</KobalteAccordion.Trigger>
	);
}

export {
	AccordionTrigger,
	defaultAccordionTriggerProps,
	AccordionTriggerProps,
};