import { Button, Stack } from "@serenity-ui/core";
import { Title } from "solid-start";
import classes from "./style.module.scss";

export default function Home() {
	return (
		<main>
			<Stack spacing='xs' direction="column-reverse">
				<Button color="lime">
					<Title>Home</Title>
				</Button>
				<Button>
					Bruh bruh
				</Button>
				<Button>
					Home
				</Button>
				<Button class={classes.button} disabled>
					Disabled button
				</Button>
			</Stack>
		</main>
	);
}
