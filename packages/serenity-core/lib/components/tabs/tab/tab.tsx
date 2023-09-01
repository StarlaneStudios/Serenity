import { Tabs as KobalteTabs } from "@kobalte/core";
import { splitProps } from "solid-js";
import classes from "../tabs.module.scss";
import { cx } from "@serenity-ui/styles";

interface TabProps extends KobalteTabs.TabsTriggerProps {

}

const tabSplitProps = [
	"class",
	"children"
] as const;

function Tab(props: TabProps) {

	const [root, other] = splitProps(props, tabSplitProps);

	return (
		<KobalteTabs.Trigger
			class={cx(classes['tabs__item'], root.class)}
			{...other}
		>
			{root.children}
		</KobalteTabs.Trigger>
	);
}

export { Tab, TabProps };