import classes from "../accordion.module.scss";
import { JSX, splitProps } from "solid-js";
import { Accordion, As } from "@kobalte/core";
import { SerenityBaseProps, UTILITY_NAMES, buildStyles, c } from "@serenity-ui/styles";

interface AccordionItemProps extends SerenityBaseProps, JSX.HTMLAttributes<HTMLDivElement> {
	value: string;
}

const splitAccordionItemProps = [
	"children",
	"class",
	"style"
] as const;

const splitAccordionItemKobalteProps = [
	'value'
] as const;

function AccordionItem(props: AccordionItemProps) {
	const [root, kobalte, util, other] = splitProps(props, splitAccordionItemProps, splitAccordionItemKobalteProps, UTILITY_NAMES);
	const styles = () => buildStyles(util, root.style);

	return (
		<Accordion.Item 
			class={c(classes["accordion--item"], root.class)}
			asChild
			value={kobalte.value}
		>
			<As
				component="div"
				{...styles()}
				{...other}
			>
				{root.children}
			</As>
		</Accordion.Item>
	);
}

export {
	AccordionItem,
	AccordionItemProps
};