import { JSX, mergeProps, splitProps } from "solid-js";
import { defaultAccrodionProps } from "../accordion";

interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "contained" | "seperated";
}

const defaultAccordionItemProps: Required<Pick<
	Omit<AccordionItemProps, keyof JSX.HTMLAttributes<HTMLDivElement>>,
	'variant'
>> = {
	variant: defaultAccrodionProps.variant
};

const splitAccordionItemProps = [
	"variant",
	"children"
] as const;

function AccordionItem(props: AccordionItemProps) {

	const [root, other] = splitProps(props, splitAccordionItemProps);
	const baseProps = mergeProps(defaultAccordionItemProps, root);

	return (
		<div
			data-variant={baseProps.variant}
			{...other}
		>
			{props.children}
		</div>
	);
}

export { 
	AccordionItem,
	defaultAccordionItemProps, 
	AccordionItemProps 
};