import classes from "../accordion.module.scss";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { JSX, splitProps } from "solid-js";
import { cx } from "@serenity-ui/styles";

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
			class={cx(classes['accordion--header'], root.class)}
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