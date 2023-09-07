import { Accordion, AccordionProps, AccordionTrigger, Badge, Button, Column, Divider, InputField, Layout, Loader, Paper, Row, Tabs, Text, useSerenity } from "../lib";

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

	return (
		<div style={{ "padding-inline": "2rem" }}>
			<Text
				size="xl"
				tc="cyan"
				weight={900}
				maw={50}
				lineClamp={3}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et metus egestas, ullamcorper ligula at, pretium justo. Aenean tincidunt risus posuere consequat efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae pulvinar leo. Proin posuere hendrerit sodales. Maecenas pretium ante id dapibus malesuada. Cras maximus quam a fermentum pellentesque. In fringilla gravida dui sit amet consequat. Maecenas volutpat nunc sit amet pulvinar rutrum. Pellentesque id dolor vulputate, sagittis lorem tristique, mattis ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt orci sit amet risus volutpat, eget sagittis nulla congue. Ut aliquet faucibus dolor at sollicitudin. Ut id enim in lacus sodales dignissim vel quis diam.
			</Text>
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
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Tabs orientation="horizontal" variant="outline">
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Tabs orientation="horizontal" variant="pills">
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Tabs orientation="vertical">
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Tabs orientation="vertical" variant="outline">
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Tabs orientation="vertical" variant="pills">
					<Tabs.List>
						<Tabs.Tab value="a">
							Gallery
						</Tabs.Tab>
						<Tabs.Tab value="b">
							Messages
						</Tabs.Tab>
					</Tabs.List>
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

			<Text 
				as={Column} 
				justify="center" 
				h={40}
				bg="blue"
				inline
			>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
				<p>Hello Bruh momoasdf</p>
			</Text>
		</div>
	);
};