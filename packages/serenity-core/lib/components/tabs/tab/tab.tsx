import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, cx, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { splitProps } from "solid-js";

interface TabProps extends SerenityBaseProps, KobalteTabs.TabsTriggerProps {

}

const tabSplitProps = [
	"class",
	"style",
	"children"
] as const;

function Tab(props: TabProps) {

	const [root, utils, other] = splitProps(props, tabSplitProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);
	
	return (
		<KobalteTabs.Trigger
			class={cx(classes['tabs__item'], root.class)}
			{...styles}
			{...other}
		>
			{root.children}
		</KobalteTabs.Trigger>
	);
}

export { Tab, TabProps };