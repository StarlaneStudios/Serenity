import { render } from "solid-js/web";
import { DemoPage } from "./demo";
import { SerenityProvider } from "../lib";

render(() => (
	<SerenityProvider
		initialTheme="dark"
		withGlobalStyle={true}
		accentColor="var(--some-accent-color)"
	>
		<DemoPage />
	</SerenityProvider>
), document.body);