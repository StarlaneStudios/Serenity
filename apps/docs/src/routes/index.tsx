import { Button, Group, Stack } from "@serenity-ui/core";
import classes from "./style.module.scss";
import { createSignal } from "solid-js";

export default function Home() {

	const [color, setColor] = createSignal("red");

	return (
		<main>
			<Stack spacing='xs' direction="column-reverse">
				{color()}
				<Button color="lime">
					Home
				</Button>
				<Button onClick={() => setColor(color() === "red" ? "blue" : "red")}>
					Bruh bruh
				</Button>
				<Button color={color()}>
					Home
				</Button>
				<Button class={classes.button} disabled>
					Disabled button
				</Button>
			</Stack>

			<Group grow>
				<Button color="lime">
					Home
				</Button>
				<Button onClick={() => setColor(color() === "red" ? "blue" : "red")}>
					Bruh bruh
				</Button>
				<Button color={color()}>
					Home
				</Button>
				<Button class={classes.button} disabled>
					Disabled button
				</Button>
			</Group>
		</main>
	);
}
