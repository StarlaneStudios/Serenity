import { AccordionContent, AccordionHeader, AccordionItem, AccordionProps, AccordionTrigger } from "@serenity-ui/core";
import { Accordion } from "@serenity-ui/core";
import { Button, Divider } from "@serenity-ui/core";

const SomeAccordion = (props: AccordionProps) => (
	<div style={{ "margin-block": "3rem" }}>
		<div style={{ color: "var(--serenity-text-color)"}}>{props.variant}</div>
		<Accordion multiple radius="sm" variant={props.variant}>
			<AccordionItem value="24">
				<AccordionHeader>
					<AccordionTrigger>
						Accordion A
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					Dit is content
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="22">
				<AccordionHeader>
					<AccordionTrigger>
						Accordion B
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					Dit is content
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="1">
				<AccordionHeader>
					<AccordionTrigger>
						Accordion C
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					Dit is content
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
);

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

			<SomeAccordion variant="contained" />
			<SomeAccordion variant="filled" />
			<SomeAccordion variant="default" />
			<SomeAccordion variant="seperated" />
		</>
	);
}