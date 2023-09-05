import classes from "../accordion.module.scss";
import { mergeProps, splitProps } from "solid-js";
import { Row, RowProps } from "../../row";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles, cx } from "@serenity-ui/styles";
import { Chevron } from "../../chevron";
import { DefaultProps } from "../../../util/types";

interface AccordionTriggerProps extends SerenityBaseProps, RowProps {

}

const accordionTriggerSplitProps = [
	"children",
	"class",
	"align",
	"justify",
	"noWrap",
	"style"
] as const;

const defaultAccordionTriggerProps: DefaultProps<AccordionTriggerProps, 'align' | 'justify' | 'noWrap'> = {
	align: 'center',
	justify: 'space-between',
	noWrap: true
};

function AccordionTrigger(props: AccordionTriggerProps) {

	const [root, utils, other] = splitProps(props, accordionTriggerSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultAccordionTriggerProps, root);
	const styles = buildStyles(utils, baseProps.style);

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
				{...styles}
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