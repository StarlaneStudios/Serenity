import { Tabs as KobalteTabs } from "@kobalte/core";
import { Color, SerenityBaseProps, Size, UTILITY_NAMES, localVars, c, resolveColor, resolveLength, buildStyles } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";
import { mergeProps, splitProps } from "solid-js";
import classes from "./tabs.module.scss";

interface TabsProps extends SerenityBaseProps, KobalteTabs.TabsRootProps {

	/**
	 * Different styles how to present the tabs component.
	 */
	variant?: "default" | "outline" | "pills";

	/**
	 * the background color of the tab and indicator when active.
	 * only applies to the default variant and the pills variant.
	*/
	color?: Color;

	/**
	 * The border-radius of the tab items within the component.
	 */
	radius?: Size | number;
}

const splitTabsProps = [
	"class",
	"style",
	"variant",
	"color",
	"children",
	"radius"
] as const;

const defaultTabsProps: DefaultProps<
	TabsProps,
	'variant' | 'color' | 'radius'
> = {
	variant: "default",
	color: "blue",
	radius: 'sm'
};

function Tabs(props: TabsProps) {

	const [root, utils, other] = splitProps(props, splitTabsProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultTabsProps, root);
	
	const cssVariables = () => {
		const color = resolveColor(baseProps.color, 6);
		const radius = resolveLength("radius", baseProps.radius);

		return localVars({ color, radius });
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<KobalteTabs.Root
			class={c(classes.tabs, baseProps.class)}
			data-variant={baseProps.variant}
			{...styles}
			{...other}
		>
			{props.children}
		</KobalteTabs.Root>
	);
}

export { Tabs, TabsProps };