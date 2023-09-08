export * from './accordion';
export * from './content/content';
export * from './header/header';
export * from './item/item';

import { Accordion } from './accordion';
import { AccordionContent } from './content/content';
import { AccordionHeader } from './header/header';
import { AccordionItem } from './item/item';

const RootAccordion = Object.assign(Accordion, {
	Content: AccordionContent,
	Header: AccordionHeader,
	Item: AccordionItem
});

export {
	RootAccordion as Accordion
}