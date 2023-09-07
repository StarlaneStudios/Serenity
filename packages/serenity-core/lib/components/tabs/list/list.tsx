import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, Size, localVars, c, resolveLength, buildStyles, UTILITY_NAMES, b } from "@serenity-ui/styles";
import { mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../../util/types";
import { bool } from "../../../util/props";

interface TabsListProps extends SerenityBaseProps, KobalteTabs.TabsListProps {

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
	"children",
	"grow"
] as const;

const defaultTabListProps: DefaultProps<
	TabsListProps,
	'spacing' | 'grow'
> = {
	spacing: "sm",
	grow: false
};

function TabsList(props: TabsListProps) {

	const [root, utils, other] = splitProps(props, tabListSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultTabListProps, root);

	const cssVariables = () => {
		const spacing = resolveLength("spacing", baseProps.spacing);

		return localVars({ spacing });
	};

	const styles = buildStyles(utils, baseProps.style, cssVariables());

	return (
		<KobalteTabs.List
			class={c(classes['tabs__list'], baseProps.class)}
			data-grow={b(baseProps.grow)}
			{...styles}
			{...other}
		>
			{baseProps.children}
			<KobalteTabs.Indicator class={classes["tabs__indicator"]} />
		</KobalteTabs.List>
	);
}

export { TabsList, TabsListProps };