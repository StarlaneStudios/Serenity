import classes from "../accordion.module.scss";
import { JSX, splitProps } from "solid-js";
import { Accordion as KobalteAccordion } from "@kobalte/core";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles } from "@serenity-ui/styles";

interface AccordionContentProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

}

const accordionSplitProps = [
	"style"
] as const;

function AccordionContent(props: AccordionContentProps) {
	const [root, utils, other] = splitProps(props, accordionSplitProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);

	return (
		<KobalteAccordion.Content
			class={classes['accordion--content']}
			{...styles}
			{...other}
		>
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