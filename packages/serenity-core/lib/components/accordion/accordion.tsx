import classes from "./accordion.module.scss";
import { mergeProps, splitProps } from "solid-js";
import { Column, ColumnProps } from "../column";
import { As, Accordion as KobalteAccordion } from "@kobalte/core";
import { DefaultProps } from "../../typings/deprecated";
import { SerenityBaseProps } from "../../typings/props";
import { Size } from "../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c, b } from "../../utils/css";
import { resolveLength } from "../../utils/resolvers";

interface AccordionProps extends SerenityBaseProps, Omit<ColumnProps, 'align' | 'justify' | 'onChange'> {
	variant?: "default" | "contained" | "seperated" | "filled";
	multiple?: boolean;
	radius?: Size | number;
	collapsible?: boolean;
	noChevronAnimation?: boolean;
	value?: string[];
	defaultValue?: string[];

	onChange?: (value: string[]) => void;
}

const defaultAccrodionProps = {
	variant: "contained",
	spacing: "sm",
	multiple: false,
	radius: "sm",
	collapsible: false,
	noChevronAnimation: false
} as Exclude<AccordionProps, keyof ColumnProps>;

const KobalteAccordionProps = [
	"multiple",
	"collapsible",
	"value",
	"defaultValue",
	"onChange"
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