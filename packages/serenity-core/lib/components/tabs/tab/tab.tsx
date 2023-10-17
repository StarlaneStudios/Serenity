import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, c, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { splitProps } from "solid-js";

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