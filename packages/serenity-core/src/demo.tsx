import { Button, Checkbox, Column, Divider, Entry, InputField, Row, Select, Unit, useSerenity, Tabs, Icon } from "../lib";
import { For, JSX, createSignal } from "solid-js";
import { Alert } from "../lib/components/alert";
import classes from "./demo.module.scss";
import { mdiAccount } from "@mdi/js";
import { Select as KobalteSelect } from "@kobalte/core";
import { Dialog } from "../lib/components/dialog";

export const DemoPage = () => {

	const { toggleTheme } = useSerenity();
	const [show, setShow] = createSignal(true);
	const [value, setValue] = createSignal<string>();
	const [dialog, setDialog] = createSignal(true);

	const hideAlert: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
		setShow(prev => !prev);
	};

	const onSubmit: JSX.EventHandlerUnion<HTMLFormElement, Event> = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		console.log(form.get('bruh'));
	};

	return (
		<>
			<Row m={1}>
				<Button onClick={hideAlert}>
					Click me
				</Button>
				<Button onclick={toggleTheme}>
					Toggle theme
				</Button>

				<Icon path={mdiAccount} color="accent" />
			</Row>

			<Divider>

			</Divider>

			<Column p={1}>
				<For
					each={['default', 'filled', 'outline', 'transparent', 'white', 'light'] as const}
					fallback={<div>Failed</div>}
				>
					{(variant) => (
						<Alert
							variant={variant}
							title="Dit is een alert"
							onClose={hideAlert}
							show={show()}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							libero ducimus voluptatem natus,
							id ipsa, sed enim minus eos aliquam quae totam quaerat nulla dignissimos?
						</Alert>
					)}
				</For>
			</Column>
			{/* <Loader /> */}
			<form onsubmit={onSubmit}>
				<Row>
					<Checkbox name="bruh" disabled checked ml="xl" label="Dit is een test" description="Why is there a checkbox?" />
					<Checkbox name="abc" ml="xl" label="Dit is een test" description="Why is there a checkbox?" />
					<Checkbox name="def" ml="xl" label="Dit is een test" description="Why is there a checkbox?" />
					<button type="submit">
						Submit
					</button>
				</Row>
			</form>
			<Tabs variant="pills">
				<Tabs.List spacing="14px">
					<Tabs.Tab value="a">Tab 1</Tabs.Tab>
					<Tabs.Tab value="b">Tab 2</Tabs.Tab>
				</Tabs.List>
			</Tabs>
			<Entry
				title="Projects"
				subtitle="View a list of projects"
				open
				styles={{
					chevron: classes['entry__chevron-test'],
					inner: classes['entry__inner-test'],
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae suscipit cupiditate architecto iste facilis iure voluptatem. Fugit modi debitis voluptate, itaque recusandae, maiores inventore, voluptatum corrupti sit minus sapiente aliquam!
			</Entry>
			<Unit m="xl">
				<Select
					value={value()}
					variant="filled"
					label={`Selected value: ${value()}`}
					description="This is a description"
					onChange={setValue}
					options={[
						{
							label: "Group 1",
							options: [
								{
									label: "Option 1",
									value: "option1"
								},
								{
									label: "Option 2",
									value: "option2"
								},
								{
									label: "Disabled option",
									value: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
									disabled: true
								}
							]
						},
						{
							label: "Group 2",
							options: [
								{
									label: "Option 3",
									value: "option3"
								},
								{
									label: "Option 4",
									value: "option4"
								}
							]
						}
					]}
				/>

				<InputField
					label="bruh"
					size="xs"
					description="This is a description"
					mt="xs"
					variant="outline"
					required
				/>

				<InputField
					label="bruh"
					size="xs"
					description="This is a description"
					mt="xs"
					variant="default"
					error="Dit is een error"
					lazyError={false}
				/>

				<InputField
					label="bruh"
					size="xs"
					description="This is a description"
					mt="xs"
					variant="filled"
					error="Dit is een error"
					defaultValue="test"
					required
				/>

				<KobalteSelect.Root
					value={"Apple"}
					options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
					placeholder="Select a fruit…"
					itemComponent={props => (
						<KobalteSelect.Item item={props.item}>
							<KobalteSelect.ItemLabel>{props.item.rawValue}</KobalteSelect.ItemLabel>
							<KobalteSelect.ItemIndicator>
								V
							</KobalteSelect.ItemIndicator>
						</KobalteSelect.Item>
					)}
				>
					<KobalteSelect.Trigger aria-label="Fruit">
						<KobalteSelect.Value<string>>{state => state.selectedOption()}</KobalteSelect.Value>
						<KobalteSelect.Icon>
							C
						</KobalteSelect.Icon>
					</KobalteSelect.Trigger>
					<KobalteSelect.ErrorMessage>Hmm, I prefer apples.</KobalteSelect.ErrorMessage>
					<KobalteSelect.Portal>
						<KobalteSelect.Content>
							<KobalteSelect.Listbox />
						</KobalteSelect.Content>
					</KobalteSelect.Portal>
				</KobalteSelect.Root>
			</Unit>
			<Dialog
				title="About Kobalte"
				open={dialog()}
				onOpenChange={setDialog}
				activator={
					<Button>
						Open dialog
					</Button>
				}
			>
				<p>
					Feedback is specifiek en ‘to the point’. Hoe specifieker je bent, hoe meer de ander ervan kan leren.
				</p>
				<p>
					Feedback is beschrijvend en heeft betrekking op gedragsaspecten. Zeg niet rechtstreeks
					'jij doet dit fout', maar beschrijf het effect van zijn gedrag. Bijvoorbeeld: 'jouw werkhouding zorgt er soms voor dat ...'.
				</p>
				<p>
					Beide partijen kunnen hun voordeel met de feedback doen. Leef je in de situatie van de ander in en vraag jezelf af of jouw commentaar de ander kan helpen. Heeft hij er iets aan?
				</p>
				<p>
					Beschrijf het gedrag dat je hebt waargenomen. Geef concreet aan wat je hebt waargenomen,
					geef geen interpretaties. Het gaat om de concrete feiten.
				</p>
				<p>
					Vertel welk effect het gedrag van de ander op je heeft. Als je ontevreden of boos bent, zeg het dan. Maak gebruik van ‘ik-boodschappen’ in plaats van ‘jij-boodschappen’.
				</p>
				<p>
					Geef suggesties voor verandering van het gedrag. Als je op een goede manier wilt corrigeren,
					bied dan een alternatief.
				</p>
				<Row justify="end" mt="xs">
					<Button variant="light" size="sm" onclick={() => setDialog(false)}>
						Cancel
					</Button>
					<Button variant="filled" size="sm">
						Submit
					</Button>
				</Row>
			</Dialog>
		</>
	);
};