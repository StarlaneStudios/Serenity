import { Tabs as KobalteTabs } from "@kobalte/core";
import { cx } from "@serenity-ui/styles";
import { splitProps } from "solid-js";
import classes from "../tabs.module.scss";

interface TabContentProps extends KobalteTabs.TabsContentProps {

}

const splitTabContentProps = [
	"class"
] as const;

function TabContent(props: TabContentProps) {

	const [root, other] = splitProps(props, splitTabContentProps)
	
	return (
		<KobalteTabs.Content
			class={cx(classes['tabs__content'], root.class)}
			{...other}
		/>
	);
}

export { TabContent, TabContentProps };