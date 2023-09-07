export * from "./tabs";
export * from "./list/list";
export * from "./content/content";
export * from "./tab/tab";

import { Tabs } from './tabs';
import { TabsList } from './list/list';
import { TabsContent } from './content/content';
import { TabsTab } from './tab/tab';

const RootTabs = Object.assign(Tabs, {
	List: TabsList,
	Content: TabsContent,
	Tab: TabsTab
});

export {
	RootTabs as Tabs
}