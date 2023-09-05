import classes from "../accordion.module.scss";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { JSX, splitProps } from "solid-js";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles, cx } from "@serenity-ui/styles";

interface AccordionHeaderProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

}

const accordionSplitProps = [
	"children",
	"class",
	"style"
] as const;

function AccordionHeader(props: AccordionHeaderProps) {

	const [root, utils, other] = splitProps(props, accordionSplitProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);

	return (
		<KobalteAccordion.Header
			asChild
			class={cx(classes['accordion--header'], root.class)}
		>
			<As 
				component="h3"
				{...styles}
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