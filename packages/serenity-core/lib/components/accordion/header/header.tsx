import classes from "../accordion.module.scss";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { JSX, splitProps } from "solid-js";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles, c } from "@serenity-ui/styles";
import { Chevron } from "../../chevron";
import { Row } from "../../row";
import { Spacer } from "../../spacer";

interface AccordionHeaderProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
	triggerClass?: string;
}

const accordionSplitProps = [
	"children",
	"class",
	"triggerClass",
	"style"
] as const;

function AccordionHeader(props: AccordionHeaderProps) {

	const [root, utils, other] = splitProps(props, accordionSplitProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);

	return (
		<KobalteAccordion.Header
			class={c(classes['accordion--header'], root.class)}
			as="div"
			{...styles}
			{...other}
		>
			<KobalteAccordion.Trigger
				class={c(classes['accordion--trigger'], root.triggerClass)}
				asChild
			>
				<As
					component={Row}
					noWrap
				>
					{root.children}
					<Spacer />
					<Chevron class={classes['accordion--chevron']} />
				</As>
			</KobalteAccordion.Trigger>
		</KobalteAccordion.Header>
	);
}

export { 
	AccordionHeader, 
	AccordionHeaderProps 
};