import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, Size, UTILITY_NAMES, localVars, c, resolveColor, resolveLength, buildStyles, isColorLight, ColorValue } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";
import { mergeProps, splitProps } from "solid-js";
import classes from "./tabs.module.scss";
import { useSerenity } from "../../provider";

interface TabsProps extends SerenityBaseProps, KobalteTabs.TabsRootProps {

	/**
	 * Different styles how to present the tabs component.
	 */
	variant?: "default" | "outline" | "pills";

	/**
	 * the background color of the tab and indicator when active.
	 * only applies to the default variant and the pills variant.
	*/
	color?: ColorValue;

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
	'variant' | 'radius'
> = {
	variant: "default",
	radius: 'sm'
};

function Tabs(props: TabsProps) {

	const { accentColor } = useSerenity();

	const [root, utils, other] = splitProps(props, splitTabsProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultTabsProps, root);

	const cssVariables = () => {
		const color = resolveColor(baseProps.color ?? accentColor());
		const radius = resolveLength("radius", baseProps.radius);
		const textColor = isColorLight(color) ? "#000" : "#fff";

		return localVars({ color, radius, "text-color": textColor });
	};

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<KobalteTabs.Root
			class={c(classes.tabs, baseProps.class)}
			data-variant={baseProps.variant}
			{...styles()}
			{...other}
		>
			{props.children}
		</KobalteTabs.Root>
	);
}

export { Tabs, TabsProps };