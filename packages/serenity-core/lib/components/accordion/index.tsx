import { For, JSX, mergeProps, onMount, splitProps } from "solid-js";
import { Stack, StackProps } from "../stack";
import { Size } from "@serenity-ui/styles";
import { AccordionItem, AccordionItemProps } from "../accordionItem";
import { identity } from "@serenity-ui/utils";

interface AccordionChevronProps {
	size?: Size | number;
	position?: "left" | "right";
	children?: (typeof AccordionItem)[] | typeof AccordionItem;
}

interface AccordionProps extends StackProps {
	variant?: "default" | "bordered" | "contained" | "seperated";
	chevron?: false | AccordionChevronProps;
}

const defaultAccrodionProps: Required<Pick<
	Omit<AccordionProps, keyof JSX.HTMLAttributes<HTMLDivElement>>,
	'variant' | 'spacing'
>> = {
	variant: "default",
	spacing: "sm"
};

const AccordionSplitProps = [
	"variant",
	"spacing",
	"children"
] as const;

function Accordion(props: AccordionProps) {

	const [root, other] = splitProps(props, AccordionSplitProps);
	const baseProps = mergeProps(defaultAccrodionProps, root);

	return (
		<Stack
			spacing={baseProps.variant === "seperated" ? baseProps.spacing : 0}
			{...other}
		>
			{baseProps.children}
		</Stack>
	);
}

export {
	Accordion,
	AccordionProps,
	AccordionChevronProps,
	defaultAccrodionProps
};