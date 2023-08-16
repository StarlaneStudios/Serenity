import { Button, Divider, Group, Stack } from "@serenity-ui/core";
import { createSignal } from "solid-js";

export default function Home() {

	const [color, setColor] = createSignal("red");

	return (
		<main>
			<Stack spacing='md' direction="column">
				<Button color="lime">
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
				<Group grow style={{ background: "#000", padding: "5rem" }}>
					<Button color="lime">
						lorem
					</Button>
					<Button onClick={() => setColor(color() === "red" ? "blue" : "red")}>
						Bruh bruh
					</Button>
					<Button variant="white" color={color()}>
						Home
					</Button>
					<Button variant='transparent'>
						Disabled button
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
