import classes from "./accordion.module.scss";
import { mergeProps, splitProps } from "solid-js";
import { Column, ColumnProps } from "../column";
import { SerenityBaseProps, Size, UTILITY_NAMES, buildStyles, c, resolveLength, b, localVars } from "@serenity-ui/styles";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { DefaultProps } from "../../util/types";

interface AccordionProps extends SerenityBaseProps, Omit<ColumnProps, 'align' | 'justify'> {
	variant?: "default" | "contained" | "seperated" | "filled";
	multiple?: boolean;
	radius?: Size | number;
	collapsible?: boolean;
	noChevronAnimation?: boolean;
}

const defaultAccrodionProps: DefaultProps<AccordionProps, 'variant' | 'spacing' | 'multiple' | 'radius' | 'collapsible' | 'noChevronAnimation'> = {
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

	const [root, kobalte, utils, other] = splitProps(props, AccordionSplitProps, KobalteAccordionProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultAccrodionProps, root);

	const cssVariables = () => {
 
		return localVars({
			radius: resolveLength("radius", baseProps.radius)
		});
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<KobalteAccordion.Root
			class={c(classes.accordion, baseProps.class)}
			asChild
			{...kobalte}
		>
			<As
				component={Column}
				data-variant={baseProps.variant}
				data-no-chevron-animation={b(baseProps.noChevronAnimation)}
				spacing={baseProps.variant === "seperated" ? baseProps.spacing : 0}
				children={baseProps.children}
				{...styles()}
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