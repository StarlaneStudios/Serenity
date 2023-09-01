import { Tabs as KobalteTabs } from "@kobalte/core";
import { splitProps } from "solid-js";
import classes from "../tabs.module.scss";

interface TabProps extends KobalteTabs.TabsTriggerProps {

}

function Tab(props: TabProps) {
	
	const [root, other] = splitProps(props, []);;

	return (
		<KobalteTabs.Trigger 
			{...other}
		>
		
		</KobalteTabs.Trigger>
	);
}

export { Tab, TabProps };