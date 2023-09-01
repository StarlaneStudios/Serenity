import { mdiCheck, mdiLock } from "@mdi/js";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionProps, AccordionTrigger, Button, Divider, Icon, InputField, Layout, Paper, useSerenity } from "../lib";
import { Tab, TabList, Tabs } from "../lib/components/tabs";

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

export const DemoPage = () => {

	const { setTheme, toggleTheme, theme } = useSerenity();

	return (
		<div style={{ "padding-inline": "2rem" }}>
			<h1>
				This is an test
			</h1>
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

			<InputField
				variant="default"
				name="test"
				label="Gebruikersnaam"
				description="Hier kan je je gebruikersnaam invullen"
				placeholder="Gebruikersnaam"
				onchange={console.log}
				oninput={console.log}
				leftSection={<Icon path={mdiLock} color="dark.1" size={1} />}
				rightSection={<Icon path={mdiLock} color="dark.1" size={1} />}
				type="password"
			/>

			<Tabs orientation="vertical">
				<TabList>
					<Tab value="a">
						Tab 1
					</Tab>
					<Tab value="b">
						Tab 2
					</Tab>
				</TabList>
			</Tabs>
		</div>
	);
};