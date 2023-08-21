import { createSignal } from "solid-js";
import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { Button } from "@serenity-ui/core";

export default function Home() {

	const [color, setColor] = createSignal("red");

	return (
		<main>
			<Title>Hello World</Title>
			<h1>Hello world!</h1>
			<Counter />
			<p>
				Visit{" "}
				<a href="https://start.solidjs.com" target="_blank">
					start.solidjs.com
				</a>{" "}
				to learn how to build SolidStart apps.
			</p>
			<Button 
				onclick={() => setColor(prev => prev === "red" ? "blue" : "red")} color={color()}
				radius="md"
				>
				Click me
			</Button>
		</main>
	);
}