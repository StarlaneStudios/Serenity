export * from './accordion';
export * from './content/content';
export * from './header/header';
export * from './item/item';
export * from './trigger/trigger';

import { Accordion } from './accordion';
import { AccordionContent } from './content/content';
import { AccordionHeader } from './header/header';
import { AccordionItem } from './item/item';
import { AccordionTrigger } from './trigger/trigger';

const RootAccordion = Object.assign(Accordion, {
	Content: AccordionContent,
	Header: AccordionHeader,
	Item: AccordionItem,
	Trigger: AccordionTrigger
});

export {
	RootAccordion as Accordion
}