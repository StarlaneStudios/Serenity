import { JSX } from "solid-js";
import { Accordion as KobalteAccordion } from "@kobalte/core";
import classes from "../accordion/accordion.module.scss";

interface AccordionContentProps extends JSX.HTMLAttributes<HTMLDivElement> {

}

function AccordionContent(props: AccordionContentProps) {

	return (
		<KobalteAccordion.Content class={classes['accordion--content']}>
			<p class={classes['accordion--content__text']}>
				{props.children}
			</p>
		</KobalteAccordion.Content>
	);
}

export {
	AccordionContent,
	AccordionContentProps
};