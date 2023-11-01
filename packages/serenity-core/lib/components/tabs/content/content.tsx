import classes from "../tabs.module.scss";
import { Tabs as KobalteTabs } from "@kobalte/core";
import { splitProps } from "solid-js";
import { SerenityBaseProps } from "../../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../../utilities";
import { c } from "../../../utils/css";

interface TabsContentProps extends SerenityBaseProps, KobalteTabs.TabsContentProps {

}

const splitTabContentProps = [
	"class",
	"style"
] as const;

function TabsContent(props: TabsContentProps) {

	const [root, utils, other] = splitProps(props, splitTabContentProps, UTILITY_NAMES);
	const styles = () => buildStyles(utils, root.style);
	
	return (
		<KobalteTabs.Content
			class={c(classes['tabs__content'], root.class)}
			{...styles()}
			{...other}
		/>
	);
}

export { TabsContent, TabsContentProps };