import classes from "../accordion.module.scss";
import { mergeProps, splitProps } from "solid-js";
import { Row, RowProps } from "../../row";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { cx } from "@serenity-ui/styles";
import { Chevron } from "../../chevron";
import { DefaultProps } from "../../../util/types";

interface AccordionTriggerProps extends RowProps {

}

const accordionTriggerSplitProps = [
	"children",
	"class",
	"align",
	"justify",
	"noWrap"
] as const;

const defaultAccordionTriggerProps: DefaultProps<AccordionTriggerProps, 'align' | 'justify' | 'noWrap'> = {
	align: 'center',
	justify: 'space-between',
	noWrap: true
};

function AccordionTrigger(props: AccordionTriggerProps) {

	const [root, other] = splitProps(props, accordionTriggerSplitProps);
	const baseProps = mergeProps(defaultAccordionTriggerProps, root);

	return (
		<KobalteAccordion.Trigger
			class={cx(classes['accordion--trigger'], root.class)}
			asChild
		>
			<As
				component={Row}
				noWrap={baseProps.noWrap}
				align={baseProps.align}
				justify={baseProps.justify}
				{...other}
			>
				{root.children}
				<Chevron class={classes['accordion--chevron']} />
			</As>
		</KobalteAccordion.Trigger>
	);
}

export {
	AccordionTrigger,
	defaultAccordionTriggerProps,
	AccordionTriggerProps,
};