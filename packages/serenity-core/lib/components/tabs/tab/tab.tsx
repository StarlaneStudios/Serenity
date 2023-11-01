import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { splitProps } from "solid-js";
import { SerenityBaseProps } from "../../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../../utilities";
import { c } from "../../../utils/css";

interface TabsTabProps extends SerenityBaseProps, KobalteTabs.TabsTriggerProps {

}

const tabSplitProps = [
	"class",
	"style",
	"children"
] as const;

function TabsTab(props: TabsTabProps) {

	const [root, utils, other] = splitProps(props, tabSplitProps, UTILITY_NAMES);
	const styles = () => buildStyles(utils, root.style);
	
	return (
		<KobalteTabs.Trigger
			class={c(classes['tabs__item'], root.class)}
			{...styles()}
			{...other}
		>
			{root.children}
		</KobalteTabs.Trigger>
	);
}

export { TabsTab, TabsTabProps };