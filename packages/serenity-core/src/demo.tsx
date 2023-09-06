import { mdiCheck, mdiLock } from "@mdi/js";
import { Accordion, AccordionProps, AccordionTrigger, Button, Column, Divider, Icon, InputField, Layout, Paper, Row, useSerenity } from "../lib";
import { Tab, TabList, Tabs } from "../lib/components/tabs";
import { Badge } from "../lib/components/badge";
import { Loader } from "../lib/components/loader";
import { createEffect, createSignal } from "solid-js";
import { Text } from "../lib/components/text";
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

	const { toggleTheme } = useSerenity();

	return (
		<div style={{ "padding-inline": "2rem" }}>
			<Unit
				mt={3}
				mb={2}
				pos="relative"
				z={4}
				bg="red"
			>
				Reee
			</Unit>
			<h1>
				This is an test
			</h1>
			<Button size="md">
				Save
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
				// leftSection={<Icon path={mdiLock} color="dark.1" size={1} />}
				// rightSection={<Icon path={mdiLock} color="dark.1" size={1} />}
				type="password"
			/>

			<Column spacing={3}>
				<Tabs orientation="horizontal">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<Tabs orientation="horizontal" variant="outline">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<Tabs orientation="horizontal" variant="pills">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<Tabs orientation="vertical">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<Tabs orientation="vertical" variant="outline">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<Tabs orientation="vertical" variant="pills">
					<TabList>
						<Tab value="a">
							Gallery
						</Tab>
						<Tab value="b">
							Messages
						</Tab>
					</TabList>
				</Tabs>

				<div></div>

				<Row>
					<Badge variant="default" size="xs">
						Default
					</Badge>
					<Badge variant="dot" size="xs">
						Dot
					</Badge>
					<Badge variant="filled" size="xs">
						Filled
					</Badge>
					<Badge variant="light" size="xs">
						Light
					</Badge>
					<Badge variant="outline" size="xs">
						Outline
					</Badge>
					<Badge variant="transparent" size="xs">
						Transparent
					</Badge>
					<Badge variant="white" size="xs">
						White
					</Badge>
				</Row>

				<Row>
					<Badge variant="default" size="sm">
						Default
					</Badge>
					<Badge variant="dot" size="sm">
						Dot
					</Badge>
					<Badge variant="filled" size="sm">
						Filled
					</Badge>
					<Badge variant="light" size="sm">
						Light
					</Badge>
					<Badge variant="outline" size="sm">
						Outline
					</Badge>
					<Badge variant="transparent" size="sm">
						Transparent
					</Badge>
					<Badge variant="white" size="sm">
						White
					</Badge>
				</Row>

				<Row>
					<Badge variant="default" size="md">
						Default
					</Badge>
					<Badge variant="dot" size="md">
						Dot
					</Badge>
					<Badge variant="filled" size="md">
						Filled
					</Badge>
					<Badge variant="light" size="md">
						Light
					</Badge>
					<Badge variant="outline" size="md">
						Outline
					</Badge>
					<Badge variant="transparent" size="md">
						Transparent
					</Badge>
					<Badge variant="white" size="md">
						White
					</Badge>
				</Row>

				<Row>
					<Badge variant="default" size="lg">
						Default
					</Badge>
					<Badge variant="dot" size="lg">
						Dot
					</Badge>
					<Badge variant="filled" size="lg">
						Filled
					</Badge>
					<Badge variant="light" size="lg">
						Light
					</Badge>
					<Badge variant="outline" size="lg">
						Outline
					</Badge>
					<Badge variant="transparent" size="lg">
						Transparent
					</Badge>
					<Badge variant="white" size="lg">
						White
					</Badge>
				</Row>

				<Row>
					<Badge variant="default" size="xl">
						Default
					</Badge>
					<Badge variant="dot" size="xl" radius="xl">
						Dot
					</Badge>
					<Badge variant="filled" size="xl">
						Filled
					</Badge>
					<Badge variant="light" size="xl">
						Light
					</Badge>
					<Badge variant="outline" size="xl">
						Outline
					</Badge>
					<Badge variant="transparent" size="xl">
						Transparent
					</Badge>
					<Badge variant="white" size="xl" radius="xl">
						White
					</Badge>
				</Row>
			</Column>
			<Loader />

			<Text as={Column} justify="center" style={{ height: "100%"}}>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
			</Text>
		</div>
	);
};