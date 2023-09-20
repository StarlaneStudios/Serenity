import { mdiCheck, mdiLock } from "@mdi/js";
import { Accordion, AccordionProps, Button, Checkbox, Column, Divider, Entry, Icon, InputField, Layout, Paper, Row, useSerenity } from "../lib";
import { Tabs } from "../lib/components/tabs";
import { Badge } from "../lib/components/badge";
import { Loader } from "../lib/components/loader";
import { For, JSX, createEffect, createSignal, onMount } from "solid-js";
import { Text } from "../lib/components/text";
import { Unit } from "../lib/components/unit";
import { Alert } from "../lib/components/alert";
import { Color, Variant, isColorLight } from "@serenity-ui/styles";
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
		</>
	);
};