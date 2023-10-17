import { Button, Checkbox, Column, Divider, Entry, Row, Select, Unit, useSerenity } from "../lib";
import { For, JSX, createSignal } from "solid-js";
import { Alert } from "../lib/components/alert";
import classes from "./demo.module.scss";

export const DemoPage = () => {

	const { toggleTheme } = useSerenity();
	const [show, setShow] = createSignal(true);

	const color = "blue.7";
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
							color={color}
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
					<Checkbox name="abc" color="grape" ml="xl" label="Dit is een test" description="Why is there a checkbox?" />
					<Checkbox name="def" ml="xl" label="Dit is een test" description="Why is there a checkbox?" />
					<button type="submit">
						Submit
					</button>
				</Row>
			</form>
			<Entry
				title="This is a title"
				subtitle="This is a subtitle"
				open
				stylesStrategy="extend"
				styles={{
					chevron: classes['entry__chevron-test'],
					inner: classes['entry__inner-test'],
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae suscipit cupiditate architecto iste facilis iure voluptatem. Fugit modi debitis voluptate, itaque recusandae, maiores inventore, voluptatum corrupti sit minus sapiente aliquam!
			</Entry>
			<Unit m="xl">
				<Select
					label="Select a food…"
					description="This is a description"
					onChange={() => { }}
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
			</Unit>
		</>
	);
};