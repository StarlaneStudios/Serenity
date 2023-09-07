import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { SerenityBaseProps, cx, buildStyles, UTILITY_NAMES } from "@serenity-ui/styles";
import { splitProps } from "solid-js";

interface TabsContentProps extends SerenityBaseProps, KobalteTabs.TabsContentProps {

}

const splitTabContentProps = [
	"class",
	"style"
] as const;

function TabsContent(props: TabsContentProps) {

	const [root, utils, other] = splitProps(props, splitTabContentProps, UTILITY_NAMES);
	const styles = buildStyles(utils, root.style);
	
	return (
		<KobalteTabs.Content
			class={cx(classes['tabs__content'], root.class)}
			{...styles}
			{...other}
		/>
	);
}

export { TabsContent, TabsContentProps };