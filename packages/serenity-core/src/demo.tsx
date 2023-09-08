import { mdiCheck, mdiLock } from "@mdi/js";
import { Accordion, AccordionProps, AccordionTrigger, Button, Column, Divider, Icon, InputField, Layout, Paper, Row, useSerenity } from "../lib";
import { Tabs } from "../lib/components/tabs";
import { Badge } from "../lib/components/badge";
import { Loader } from "../lib/components/loader";
import { For, createEffect, createSignal, onMount } from "solid-js";
import { Text } from "../lib/components/text";
import { Unit } from "../lib/components/unit";
import { Alert } from "../lib/components/alert";
import { createSign } from "crypto";
import { Color, Variant, isColorLight } from "@serenity-ui/styles";

const SomeAccordion = (props: AccordionProps) => (
	<Accordion collapsible radius="sm" variant={props.variant} mt="xs">
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
	const [show, setShow] = createSignal(true);
	const [color, setColor] = createSignal<Color>('blue.6');

	const colors: Color[] = ["red", "blue", "indigo"];
	const shades: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	const generateColor = () => {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		const randomShade = shades[Math.floor(Math.random() * shades.length)];

		const color = [randomColor, randomShade].join('.') as Color;

		setColor(color);
	};

	setInterval(generateColor, 1);

	const variants = () => {
		const x = ['default', 'filled', 'outline', 'transparent', 'white', 'light'];

		// fill array of length 100 with random variants
		return Array.from({ length: 1000 }, () => x[Math.floor(Math.random() * x.length)]);
	};

	return (
		<>
			{isColorLight(color()) ? "Light" : "Dark"} <br />
			{color()} <br />
			<Row m={1}>
				<Button onClick={() => setShow(prev => !prev)}>
					Click me
				</Button>
				<Button onclick={toggleTheme}>
					Toggle theme
				</Button>
				<Button onclick={generateColor}>
					Generate color
				</Button>
			</Row>
			<Column p={1}>
				<For 
					each={variants()}
					fallback={<div>Failed</div>}
				>
					{(variant) => (
						<Alert
							variant={variant}
							title="Dit is een alert"
							onClose={(event) => setShow(false)}
							show={show()}
							color={color()}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							libero ducimus voluptatem natus,
							id ipsa, sed enim minus eos aliquam quae totam quaerat nulla dignissimos?
						</Alert>
					)}
				</For>
			</Column>

			<Loader />
			{/* <Tabs>
				<TabList>
					<Tab value="a">
						Gallery A
					</Tab>
					<Tab value="b">
						Gallery B
					</Tab>
				</TabList>
				<TabContent value="a">
					<p>Test A</p>
				</TabContent>
				<TabContent value="b">
					<p>Test B</p>
				</TabContent>
			</Tabs> */}
			<Badge variant="filled">
				Mooi mooi
			</Badge>
		</>
		// <div style={{ "padding-inline": "2rem" }}>
		// 	<Unit
		// 		mt={3}
		// 		mb={2}
		// 		pos="relative"
		// 		z={4}
		// 		bg="red"
		// 	>
		// 		Reee
		// 	</Unit>
		// 	<h1>
		// 		This is an test
		// 	</h1>
		// 	<Button size="md">
		// 		Save
		// 	</Button>
		// 	<Divider labelPosition="right">
		// 		<Button size="xs" color="cyan" onClick={toggleTheme}>
		// 			Test
		// 		</Button>
		// 	</Divider>

		// 	<Layout breakpoints={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }}>

		// 		<Paper border>
		// 			<SomeAccordion variant="contained" />
		// 		</Paper>

		// 		<Paper border>
		// 			<SomeAccordion variant="filled" />
		// 		</Paper>
		// 		<Paper border>
		// 			<SomeAccordion variant="default" />
		// 		</Paper>

		// 		<Paper border>
		// 			<SomeAccordion variant="seperated" />
		// 		</Paper>

		// 	</Layout>

		// 	<InputField
		// 		variant="default"
		// 		name="test"
		// 		label="Gebruikersnaam"
		// 		description="Hier kan je je gebruikersnaam invullen"
		// 		placeholder="Gebruikersnaam"
		// 		onchange={console.log}
		// 		oninput={console.log}
		// 		// leftSection={<Icon path={mdiLock} color="dark.1" size={1} />}
		// 		// rightSection={<Icon path={mdiLock} color="dark.1" size={1} />}
		// 		type="password"
		// 	/>

		// 	<Column spacing={3}>
		// 		<Tabs orientation="horizontal">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<Tabs orientation="horizontal" variant="outline">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<Tabs orientation="horizontal" variant="pills">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<Tabs orientation="vertical">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<Tabs orientation="vertical" variant="outline">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<Tabs orientation="vertical" variant="pills">
		// 			<TabList>
		// 				<Tab value="a">
		// 					Gallery
		// 				</Tab>
		// 				<Tab value="b">
		// 					Messages
		// 				</Tab>
		// 			</TabList>
		// 		</Tabs>

		// 		<div></div>

		// 		<Row>
		// 			<Badge variant="default" size="xs">
		// 				Default
		// 			</Badge>
		// 			<Badge variant="dot" size="xs">
		// 				Dot
		// 			</Badge>
		// 			<Badge variant="filled" size="xs">
		// 				Filled
		// 			</Badge>
		// 			<Badge variant="light" size="xs">
		// 				Light
		// 			</Badge>
		// 			<Badge variant="outline" size="xs">
		// 				Outline
		// 			</Badge>
		// 			<Badge variant="transparent" size="xs">
		// 				Transparent
		// 			</Badge>
		// 			<Badge variant="white" size="xs">
		// 				White
		// 			</Badge>
		// 		</Row>

		// 		<Row>
		// 			<Badge variant="default" size="sm">
		// 				Default
		// 			</Badge>
		// 			<Badge variant="dot" size="sm">
		// 				Dot
		// 			</Badge>
		// 			<Badge variant="filled" size="sm">
		// 				Filled
		// 			</Badge>
		// 			<Badge variant="light" size="sm">
		// 				Light
		// 			</Badge>
		// 			<Badge variant="outline" size="sm">
		// 				Outline
		// 			</Badge>
		// 			<Badge variant="transparent" size="sm">
		// 				Transparent
		// 			</Badge>
		// 			<Badge variant="white" size="sm">
		// 				White
		// 			</Badge>
		// 		</Row>

		// 		<Row>
		// 			<Badge variant="default" size="md">
		// 				Default
		// 			</Badge>
		// 			<Badge variant="dot" size="md">
		// 				Dot
		// 			</Badge>
		// 			<Badge variant="filled" size="md">
		// 				Filled
		// 			</Badge>
		// 			<Badge variant="light" size="md">
		// 				Light
		// 			</Badge>
		// 			<Badge variant="outline" size="md">
		// 				Outline
		// 			</Badge>
		// 			<Badge variant="transparent" size="md">
		// 				Transparent
		// 			</Badge>
		// 			<Badge variant="white" size="md">
		// 				White
		// 			</Badge>
		// 		</Row>

		// 		<Row>
		// 			<Badge variant="default" size="lg">
		// 				Default
		// 			</Badge>
		// 			<Badge variant="dot" size="lg">
		// 				Dot
		// 			</Badge>
		// 			<Badge variant="filled" size="lg">
		// 				Filled
		// 			</Badge>
		// 			<Badge variant="light" size="lg">
		// 				Light
		// 			</Badge>
		// 			<Badge variant="outline" size="lg">
		// 				Outline
		// 			</Badge>
		// 			<Badge variant="transparent" size="lg">
		// 				Transparent
		// 			</Badge>
		// 			<Badge variant="white" size="lg">
		// 				White
		// 			</Badge>
		// 		</Row>

		// 		<Row>
		// 			<Badge variant="default" size="xl">
		// 				Default
		// 			</Badge>
		// 			<Badge variant="dot" size="xl" radius="xl">
		// 				Dot
		// 			</Badge>
		// 			<Badge variant="filled" size="xl">
		// 				Filled
		// 			</Badge>
		// 			<Badge variant="light" size="xl">
		// 				Light
		// 			</Badge>
		// 			<Badge variant="outline" size="xl">
		// 				Outline
		// 			</Badge>
		// 			<Badge variant="transparent" size="xl">
		// 				Transparent
		// 			</Badge>
		// 			<Badge variant="white" size="xl" radius="xl">
		// 				White
		// 			</Badge>
		// 		</Row>
		// 	</Column>
		// 	<Loader />

		// 	<Text 
		// 		as={Column} 
		// 		justify="center" 
		// 		h={40}
		// 		bg="blue"
		// 	>
		// 		<p>Hello Bruh momoasdf</p>
		// 		<p>Hello Bruh momoasdf</p>
		// 		<p>Hello Bruh momoasdf</p>
		// 		<p>Hello Bruh momoasdf</p>
		// 		<p>Hello Bruh momoasdf</p>
		// 	</Text>
		// </div>
	);
};