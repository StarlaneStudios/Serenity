import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { JSX, splitProps } from "solid-js";
import { cx } from "@serenity-ui/styles";
import _classes from "../accordion/accordion.module.scss";

interface AccordionHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {

}

const accordionSplitProps = [
	"children",
	"class",
] as const;

function AccordionHeader(props: AccordionHeaderProps) {

	const [root, other] = splitProps(props, accordionSplitProps);

	return (
		<KobalteAccordion.Header
			asChild
			class={cx(_classes['accordion--header'], root.class)}
		>
			<As 
				component="h3"
				{...other}
			>
				{root.children}
			</As>
		</KobalteAccordion.Header>
	)
}

export { 
	AccordionHeader, 
	AccordionHeaderProps 
};