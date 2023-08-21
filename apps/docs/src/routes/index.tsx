import { createSignal } from "solid-js";
import Counter from "~/components/Counter";
import { Button, Paper, SimpleGrid } from "@serenity-ui/core";

export default function Home() {

	const [color, setColor] = createSignal("red");

	return (
		<SimpleGrid breakpoints={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
			<Paper>
				Title
			</Paper>
			<Paper>
				Title
			</Paper>
			<Paper>
				Title
			</Paper>
			<Paper>
				Title
			</Paper>
			<Paper>
				Title
			</Paper>
			<Paper>
				Title
			</Paper>
		</SimpleGrid>
	);
}