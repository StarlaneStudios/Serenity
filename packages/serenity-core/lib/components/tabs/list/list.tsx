import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, Size, cssvars, cx, resolveSize, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../../util/types";

interface TabListProps extends SerenityBaseProps, KobalteTabs.TabsListProps {

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
	spacing: "sm",
	grow: false
};

function TabList(props: TabListProps) {

	const [root, utils, other] = splitProps(props, tabListSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultTabListProps, root);

	const cssVariables = () => {
		const spacing = resolveSize("spacing", baseProps.spacing, "rem");
		return cssvars({ spacing });
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<KobalteTabs.List
			class={cx(classes['tabs__list'], baseProps.class)}
			data-grow={baseProps.grow}
			{...styles}
			{...other}
		>
			{baseProps.children}
			<KobalteTabs.Indicator class={classes["tabs__indicator"]} />
		</KobalteTabs.List>
	);
}

export { TabList, TabListProps };