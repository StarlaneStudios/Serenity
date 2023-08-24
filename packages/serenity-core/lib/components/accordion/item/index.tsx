import classes from "../accordion/accordion.module.scss";
import { JSX, splitProps } from "solid-js";
import { Accordion, As } from "@kobalte/core";
import { cx } from "@serenity-ui/styles";

interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value: string;
}

const splitAccordionItemProps = [
	"children",
	"class"
] as const;

const splitAccordionItemKobalteProps = [
	'value'
] as const;

function AccordionItem(props: AccordionItemProps) {
	const [root, kobalte, other] = splitProps(props, splitAccordionItemProps, splitAccordionItemKobalteProps);

	return (
		<Accordion.Item 
			class={cx(classes["accordion--item"], root.class)}
			asChild
			value={kobalte.value}
		>
			<As
				component="div"
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