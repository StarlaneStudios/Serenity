import { JSX, mergeProps, splitProps } from "solid-js";
import { Stack, StackProps } from "../stack";
import { Size, cx, resolveSize } from "@serenity-ui/styles";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import classes from "./accordion.module.scss";
import { defaultChevronProps } from "../chevron";

interface AccordionProps extends Omit<StackProps, 'align' | 'justify'> {
	variant?: "default" | "contained" | "seperated" | "filled";
	multiple?: boolean;
	radius?: Size | number;
	collapsible?: boolean;
	noChevronAnimation?: boolean;
}

const defaultAccrodionProps: Required<Pick<
	Omit<AccordionProps, keyof JSX.HTMLAttributes<HTMLDivElement>>,
	'variant' | 'spacing' | 'multiple' | 'radius' | 'collapsible' | 'noChevronAnimation'
>> = {
	variant: "contained",
	spacing: "sm",
	multiple: false,
	radius: "sm",
	collapsible: false,
	noChevronAnimation: false
};

const KobalteAccordionProps = [
	"multiple",
	"collapsible"
] as const;

const AccordionSplitProps = [
	"variant",
	"spacing",
	"class",
	"children",
	"radius",
	"style",
	"noChevronAnimation"
] as const;

function Accordion(props: AccordionProps) {

	const [root, kobalte, other] = splitProps(props, AccordionSplitProps, KobalteAccordionProps);
	const baseProps = mergeProps(defaultAccrodionProps, root);

	const cssVariables = () => ({
		"--radius": resolveSize(baseProps.radius, "serenity-radius", "px")
	});

	return (
		<KobalteAccordion.Root
			class={cx(classes.accordion, baseProps.class)}
			asChild
			{...kobalte}
		>
			<As
				component={Stack}
				data-variant={baseProps.variant}
				data-no-chevron-animation={baseProps.noChevronAnimation}
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
	defaultAccrodionProps
};