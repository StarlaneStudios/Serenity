import classes from "../accordion.module.scss";
import { JSX, splitProps } from "solid-js";
import { Accordion as KobalteAccordion } from "@kobalte/core";
import { SerenityBaseProps } from "../../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../../utilities";
import { c } from "../../../utils/css";

interface AccordionContentProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {

}

const accordionSplitProps = [
	"style",
	"class"
] as const;

function AccordionContent(props: AccordionContentProps) {
	const [root, utils, other] = splitProps(props, accordionSplitProps, UTILITY_NAMES);
	const styles = () => buildStyles(utils, root.style);

	return (
		<KobalteAccordion.Content
			class={c(classes['accordion--content'], root.class)}
			{...styles()}
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