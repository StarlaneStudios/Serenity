import { mdiAccount, mdiCheck, mdiDownload } from "@mdi/js";
import { AccordionContent, AccordionHeader, AccordionItem, AccordionProps, AccordionTrigger, Paper, Layout, ThemeProvider, useTheme, Icon } from "@serenity-ui/core";
import { Accordion } from "@serenity-ui/core";
import { Button, Divider } from "@serenity-ui/core";

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

const Page = () => {

	const { setTheme, toggleTheme, theme } = useTheme();

	return (
		<>
			<Button size="md">
				Save
				<Icon
					path={mdiCheck}
					right
				/>
			</Button>
			<Divider labelPosition="right">
				<Button size="xs" color="cyan" onClick={toggleTheme}>
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

			<TextInput 
				label="test"
			/>

			<TextAreaInput />
		</>
	);
};

export default function Home() {

	return (
		<ThemeProvider initialTheme="dark">
			<Page />
		</ThemeProvider>
	);
}