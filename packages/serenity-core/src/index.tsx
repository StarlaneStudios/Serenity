import { render } from "solid-js/web";
import { DemoPage } from "./demo";
import { SerenityProvider } from "../lib";

render(() => (
	<SerenityProvider
		initialTheme="dark"
		withGlobalStyle={true}
		accentColor="#e8581a"
	>
		<DemoPage />
	</SerenityProvider>
), document.body);