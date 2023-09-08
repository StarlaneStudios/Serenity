import { mdiCheck, mdiLock } from "@mdi/js";
import { Accordion, AccordionProps, Button, Column, Divider, Icon, InputField, Layout, Paper, Row, useSerenity } from "../lib";
import { Tabs } from "../lib/components/tabs";
import { Badge } from "../lib/components/badge";
import { Loader } from "../lib/components/loader";
import { For, createEffect, createSignal, onMount } from "solid-js";
import { Text } from "../lib/components/text";
import { Unit } from "../lib/components/unit";
import { Alert } from "../lib/components/alert";
import { createSign } from "crypto";
import { Color, Variant, isColorLight } from "@serenity-ui/styles";

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

	setInterval(generateColor, 2000);

	const variants = () => {
		const x = ['default', 'filled', 'outline', 'transparent', 'white', 'light'];

		// fill array of length 100 with random variants
		return Array.from({ length: 22 }, () => x[Math.floor(Math.random() * x.length)]);
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
					each={variants() as any}
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
			<Badge variant="filled" color={color()}>
				Mooi mooi
			</Badge>
		</>
	);
};