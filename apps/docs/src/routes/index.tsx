import { Button, Divider, Group, Spacer, Stack } from "@serenity-ui/core";
import { createEffect, createSignal } from "solid-js";

export default function Home() {

	const [color, setColor] = createSignal("red");
	const [color2, setColor2] = createSignal("green");

	return (
		<main>
			{color()}
			{color2()}
			<Stack spacing='md' direction="column">
				<Button color={color2()} onClick={() => setColor2(color2() === "green" ? "indigo" : "green")}>
					Home
				</Button>
				<Button onClick={() => setColor(color() === "red" ? "blue" : "red")}>
					Bruh bruh
				</Button>
				<Button variant="light" color={color()}>
					Home
				</Button>
				<Button disabled>
					Disabled button
				</Button>
				<Group style={{ background: "#1a1b1e", padding: "5rem" }}>
					<Button color="lime">
						lorem
					</Button>
					<Button variant="outline" onClick={() => setColor(color() === "red" ? "blue" : "red")}>
						Bruh bruh
					</Button>
					<Button variant="white" color={color()}>
						Home
					</Button>
					<Button variant='transparent'>
						Transparent button
					</Button>
					<Button variant='light' color='blue.6'>
						Light button
					</Button>
					<Button variant='subtle' disabled color='blue.6'>
						Subtle button
					</Button>
				</Group>
				<div style={{ height: '300px', "margin-left": "100px", display: "flex" }}>
					<Divider thickness='xl' orientation="vertical" variant="dotted" />
				</div>
				<Divider thickness='md' orientation="horizontal" variant="solid" />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, ut similique quisquam adipisci atque nostrum asperiores delectus laudantium vitae praesentium expedita dolorem. Id excepturi est eligendi totam omnis, odio earum?
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, earum vero obcaecati atque quam corporis? Quas vitae laudantium, necessitatibus fugiat tempora, ut unde consequuntur similique temporibus nesciunt, accusamus saepe ab.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur molestias ipsum veniam voluptatum quod aliquam ab eligendi placeat expedita nostrum tempora, rem corrupti in quasi, tempore, iure consequuntur itaque.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia aut cupiditate suscipit quidem sapiente, voluptate nesciunt, consequuntur voluptates tenetur voluptatum soluta magni! Officiis eligendi, excepturi placeat sit rerum ullam.
				<Divider thickness='md' orientation="horizontal" variant="solid">
					<span>Content</span>
				</Divider>
			</Stack>
		</main>
	);
}
