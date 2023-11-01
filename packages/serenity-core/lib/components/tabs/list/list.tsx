import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { mergeProps, splitProps } from "solid-js";
import { DefaultProps } from "../../../typings/deprecated";
import { SerenityBaseProps } from "../../../typings/props";
import { Length } from "../../../typings/values";
import { UTILITY_NAMES, buildStyles } from "../../../utilities";
import { localVars, c, b } from "../../../utils/css";
import { resolveLength } from "../../../utils/resolvers";

interface TabsListProps extends SerenityBaseProps, KobalteTabs.TabsListProps {

	/**
	 * How much spacing should be applied between the items
	 * @default sm
	 */
	spacing?: Length;

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
	"grow",
	"spacing"
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

	const styles = () => buildStyles(utils, cssVariables(), baseProps.style);

	return (
		<KobalteTabs.List
			class={c(classes['tabs__list'], baseProps.class)}
			data-grow={b(baseProps.grow)}
			{...styles()}
			{...other}
		>
			{baseProps.children}
			<KobalteTabs.Indicator class={classes["tabs__indicator"]} />
		</KobalteTabs.List>
	);
}

export { TabsList, TabsListProps };