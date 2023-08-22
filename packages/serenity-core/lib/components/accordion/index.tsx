import { JSX, mergeProps, splitProps } from "solid-js";
import { Stack, StackProps } from "../stack";
import { Size, cx, resolveSize } from "@serenity-ui/styles";
import { AccordionItem } from "../accordionItem";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import classes from "./accordion.module.scss";

interface AccordionChevronProps {
	size?: Size | number;
	position?: "left" | "right";
	children?: (typeof AccordionItem)[] | typeof AccordionItem;
}

interface AccordionProps extends Omit<StackProps, 'align' | 'justify'> {
	variant?: "default" | "bordered" | "contained" | "seperated";
	chevron?: false | AccordionChevronProps;
	multiple?: boolean;
	radius?: Size | number;
}

const defaultAccrodionProps: Required<Pick<
	Omit<AccordionProps, keyof JSX.HTMLAttributes<HTMLDivElement>>,
	'variant' | 'spacing' | 'multiple' | 'radius'
>> = {
	variant: "contained",
	spacing: "sm",
	multiple: false,
	radius: "sm"
};

const AccordionSplitProps = [
	"variant",
	"spacing",
	"class",
	"children",
	"chevron",
	"multiple",
	"radius",
	"style"
] as const;

function Accordion(props: AccordionProps) {

	const [root, other] = splitProps(props, AccordionSplitProps);
	const baseProps = mergeProps(defaultAccrodionProps, root);

	const cssVariables = () => ({
		"--accordion-radius": resolveSize(baseProps.radius, "serenity-radius", "px")
	});

	return (
		<KobalteAccordion.Root
			class={cx(classes.accordion, baseProps.class)}
			asChild
		>
			<As
				component={Stack}
				data-variant={baseProps.variant}
				spacing={baseProps.variant === "seperated" ? baseProps.spacing : 0}
				children={baseProps.children}
				style={Object.assign(cssVariables(), baseProps.style)}
				{...other}
			/>
		</KobalteAccordion.Root>
	);
}

export {
	Accordion,
	AccordionProps,
	AccordionChevronProps,
	defaultAccrodionProps
};