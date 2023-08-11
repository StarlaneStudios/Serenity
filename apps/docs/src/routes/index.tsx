import { Button, Stack } from "@serenity-ui/core";
import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
	return (
		<main>
			<Stack>
				<Button>
					<Title>Home</Title>
				</Button>
				<Counter />
			</Stack>
			<Stack>
				<Button>
					<Title>Home</Title>
				</Button>
				<Counter />
			</Stack>
			<Stack>
				<Button>
					<Title>Home</Title>
				</Button>
				<Counter />
			</Stack>
		</main>
	);
}
