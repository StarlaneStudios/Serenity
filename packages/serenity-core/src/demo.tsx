import { mdiCheck } from "@mdi/js";

import {
	Accordion,
	AccordionProps,
	AccordionTrigger,
	Button,
	Divider,
	Icon,
	Layout,
	Paper,
	Row,
	TextAreaInput,
	TextInput,
	useSerenity
} from "../lib";
import { Unit } from "../lib/components/unit";

const SomeAccordion = (props: AccordionProps) => (
	<Accordion collapsible radius="sm" variant={props.variant}>
		<Accordion.Item value="24">
			<Accordion.Header>
				<AccordionTrigger>
					Accordion A
				</AccordionTrigger>
			</Accordion.Header>
			<Accordion.Content>
				Dit is content
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="25">
			<Accordion.Header>
				<AccordionTrigger>
					Accordion B
				</AccordionTrigger>
			</Accordion.Header>
			<Accordion.Content>
				Dit is content
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="26">
			<Accordion.Header>
				<AccordionTrigger>
					Accordion C
				</AccordionTrigger>
			</Accordion.Header>
			<Accordion.Content>
				Dit is content
			</Accordion.Content>
		</Accordion.Item>
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
				leftSection={<Icon path={lock} color="dark.1" size={1} />}
				rightSection={<Icon path={lock} color="dark.1" size={1} />}
				type="password"
			/>

			{/* <TextAreaInput
				variant="filled"
				error={"This is an error"}
				validationState="invalid"
				label="Bericht"
				description="Hier kan je je bericht invullen"
			/> */}

			<Row>
				<Unit bg="red" w={15}>
					Aaaaa
				</Unit>
				<Unit bg="blue" flex={1}>
					Bbbbbb
				</Unit>
			</Row>
		</div>
	);
};