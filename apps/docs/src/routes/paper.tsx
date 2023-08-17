import { Button, Divider, Group, Paper, Spacer, Stack } from "@serenity-ui/core";
import { createEffect, createSignal } from "solid-js";
import { Size } from "../../../../packages/serenity-styles/dist";

export default function Home() {

	const [paddingState, setPaddingState] = createSignal<"size" | "number">("size");
	const [padding, setPadding] = createSignal<Size | number>("sm");

	const [shadow, setShadow] = createSignal<Size>();
	const [radius, setRadius] = createSignal<Size | number>("sm");

	return (
		<main style={{ padding: "10rem" }}>

			<input type="range" value={padding()} oninput={(event) => {
				const value = event.currentTarget.value;
				setPadding(+value);
			}} />

			<select name="" id="" onchange={(event) => {
				console.log(event.currentTarget.value);
				setPadding(event.currentTarget.value);
			}}>
				<option value="xs">xs</option>
				<option value="sm">sm</option>
				<option value="md">md</option>
				<option value="lg">lg</option>
				<option value="xl">xl</option>
			</select>

			{padding()}

			<Paper
				border
				padding={padding()}
				shadow=""
				radius="sm"
			>
				Test
			</Paper>
		</main>
	);
}
