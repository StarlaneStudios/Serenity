import { AccordionItem } from "@serenity-ui/core";
import { Accordion } from "@serenity-ui/core";
import { Button, Divider } from "@serenity-ui/core";

export default function Home() {

	return (
		<>
			<Button>
				Test
			</Button>
			<Divider labelPosition="right">
				<Button size="xs">
					Test
				</Button>
			</Divider>
			<Accordion>
				<AccordionItem value="22">
					1
				</AccordionItem>
				<AccordionItem value="22">
					2
				</AccordionItem>
				<AccordionItem value="22">
					3
				</AccordionItem>
			</Accordion>
		</>
	);
}