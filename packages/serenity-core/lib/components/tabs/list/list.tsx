import { Tabs as KobalteTabs } from "@kobalte/core";
import { Size, cssvars, cx, resolveSize } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import classes from "../tabs.module.scss";
import { DefaultProps } from "../../../util/types";

interface TabListProps extends KobalteTabs.TabsListProps {

	/**
	 * How much spacing should be applied between the items
	 * @default sm
	 */
	spacing?: Size | number;

	/**
	 * applies flex: 1 to the items within the tab list
	 * @default false
	 */
	grow?: boolean;
}

const tabListSplitProps = [
	"class",
	"style",
	"children"
] as const;

const defaultTabListProps: DefaultProps<
	TabListProps,
	'spacing' | 'grow'
> = {
	spacing: 'sm',
	grow: false
};

function TabList(props: TabListProps) {

	const [root, other] = splitProps(props, tabListSplitProps);
	const baseProps = mergeProps(defaultTabListProps, root);

	const cssVariables = () => {
		const spacing = resolveSize("spacing", baseProps.spacing, "rem");
		return cssvars({ spacing });
	};

	return (
		<KobalteTabs.List
			class={cx(classes['tabs__list'], root.class)}
			data-grow={baseProps.grow}
			style={Object.assign(cssVariables(), root.style)}
			{...other}
		>
			{baseProps.children}
			<KobalteTabs.Indicator class={classes["tabs__indicator"]} />
		</KobalteTabs.List>
	);
}

export { TabList, TabListProps };