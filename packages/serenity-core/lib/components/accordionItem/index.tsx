import { JSX, mergeProps, splitProps } from "solid-js";
import { defaultAccrodionProps } from "../accordion";
import { Accordion, As } from "@kobalte/core";
import { cx } from "@serenity-ui/styles";
import classes from "../accordion/accordion.module.scss";

interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "contained" | "seperated";
	value: string;
}

const defaultAccordionItemProps: Required<Pick<
	Omit<AccordionItemProps, keyof JSX.HTMLAttributes<HTMLDivElement>>,
	'variant'
>> = {
	variant: defaultAccrodionProps.variant
};

const splitAccordionItemProps = [
	"variant",
	"children",
	"class"
] as const;

const splitAccordionItemKobalteProps = [
	'value'
] as const;

function AccordionItem(props: AccordionItemProps) {

	const [root, kobalte ,other] = splitProps(props, splitAccordionItemProps, splitAccordionItemKobalteProps);
	const baseProps = mergeProps(defaultAccordionItemProps, root);

	return (
		<Accordion.Item 
			class={cx(classes["accordion--item"], baseProps.class)}
			asChild
			value={kobalte.value}
		>
			<As
				component="div"
				{...other}
			>
				{baseProps.children}
			</As>
		</Accordion.Item>
	);
}

export {
	AccordionItem,
	defaultAccordionItemProps,
	AccordionItemProps
};