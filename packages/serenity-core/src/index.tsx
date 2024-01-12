import { render } from "solid-js/web";
import { DemoPage } from "./demo";
import { SerenityProvider } from "../lib";

render(() => (
	<SerenityProvider
		initialTheme="light"
		withGlobalStyle={true}
		accentColor="orange"
	>
		<DemoPage />
	</SerenityProvider>
), document.body);