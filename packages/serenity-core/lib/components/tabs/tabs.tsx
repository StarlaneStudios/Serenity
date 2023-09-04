import { Tabs as KobalteTabs } from "@kobalte/core";
import { Color, Size, cssvars, cx, resolveColorInput, resolveSize } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";
import { mergeProps, splitProps } from "solid-js";
import classes from "./tabs.module.scss";

interface TabsProps extends KobalteTabs.TabsRootProps {

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

	const [root, other] = splitProps(props, splitTabsProps);
	const baseProps = mergeProps(defaultTabsProps, root);

	const cssVariables = () => {
		const color = resolveColorInput(baseProps.color, 6);
		const radius = resolveSize("radius", baseProps.radius, "rem");
		return cssvars({ color, radius });
	};

	return (
		<KobalteTabs.Root
			class={cx(classes.tabs, root.class)}
			data-variant={baseProps.variant}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{props.children}
		</KobalteTabs.Root>
	);
}

export { Tabs, TabsProps };