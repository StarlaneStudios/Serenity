import { Button, Stack } from "@serenity-ui/core";
import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
	return (
		<main>
			<Stack>
				<Button color="">
					<Title>Home</Title>
				</Button>
				<Counter />
			</Stack>
			<Stack>
				<Button>
					Bruh bruh
				</Button>
				<Counter />
			</Stack>
			<Stack>
				<Button color="">
					Home
				</Button>
				<Counter />
			</Stack>
		</main>
	);
}
