import { Tabs as KobalteTabs } from "@kobalte/core";
import { Color, cssvars, cx, resolveColorInput } from "@serenity-ui/styles";
import { DefaultProps } from "../../util/types";
import { mergeProps, splitProps } from "solid-js";
import classes from "./tabs.module.scss";

interface TabsProps extends KobalteTabs.TabsRootProps {
	variant?: "default" | "outline" | "pills";
	color?: Color;
}

const splitTabsProps = [
	"class",
	"style",
	"variant",
	"color",
	"children"
] as const;

const defaultTabsProps: DefaultProps<
	TabsProps,
	'variant' | 'color'
> = {
	variant: "default",
	color: "blue"
};

function Tabs(props: TabsProps) {

	const [root, other] = splitProps(props, splitTabsProps);
	const baseProps = mergeProps(defaultTabsProps, root);

	const cssVariables = () => {
		const color = resolveColorInput(baseProps.color, 6);
		return cssvars({ color });
	}

	return (
		<KobalteTabs.Root
			class={cx(classes.tabs, root.class)}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{props.children}
		</KobalteTabs.Root>
	);
}

export { Tabs, TabsProps };