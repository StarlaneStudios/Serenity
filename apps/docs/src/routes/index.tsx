import { AccordionContent, AccordionHeader, AccordionItem, AccordionProps, AccordionTrigger, Paper, Layout } from "@serenity-ui/core";
import { Accordion } from "@serenity-ui/core";
import { Button, Divider } from "@serenity-ui/core";
import { useThemeSwitcher } from "@serenity-ui/primitives";

const SomeAccordion = (props: AccordionProps) => (
	<Accordion collapsible radius="sm" variant={props.variant}>
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
);

export default function Home() {

	const { setTheme, toggleTheme } = useThemeSwitcher();

	return (
		<>
			<Button>
				Test
			</Button>
			<Divider labelPosition="right">
				<Button size="xs" onClick={toggleTheme}>
					Test
				</Button>
			</Divider>

			<Layout breakpoints={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }}>

				<Paper border>
					<SomeAccordion variant="contained" />
				</Paper>

				<Paper border>
					<SomeAccordion variant="filled" />
				</Paper>
				<Paper border>
					<SomeAccordion variant="default" />
				</Paper>

				<Paper border>
					<SomeAccordion variant="seperated" />
				</Paper>

			</Layout>
		</>
	);
}