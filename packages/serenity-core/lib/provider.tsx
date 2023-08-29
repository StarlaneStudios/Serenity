import { Theme } from "@serenity-ui/styles";
import { Accessor, ParentProps, Setter, createContext, createEffect, createSignal, useContext } from "solid-js";

const SerenityContext = createContext<{
	theme: Accessor<Theme>;
	setTheme: Setter<Theme>;
	toggleTheme: () => void;
}>();

interface SerenityProviderProps {

	/**
	 * Sets the initial theme of the provider.
	 */
	initialTheme: Theme;

	/**
	 * Applies the theme to the target element instead of the root element.
	 */
	target?: HTMLElement | null;
}

/**
 * A provider used to configure Serenity UI components.
 */
function SerenityProvider(props: ParentProps<SerenityProviderProps>) {

	const [currentTheme, setCurrentTheme] = createSignal<Theme>(props.initialTheme);
	const target = props.target ?? document.documentElement;

	const toggleTheme = () => {
		setCurrentTheme(theme => theme === 'light' ? 'dark' : 'light');
	};

	createEffect(() => {
		target.dataset.theme = currentTheme();
	});

	return (
		<SerenityContext.Provider
			value={{
				theme: currentTheme,
				setTheme: setCurrentTheme,
				toggleTheme
			}}
		>
			{props.children}
		</SerenityContext.Provider>
	);
}

function useSerenity() {
	
	const context = useContext(SerenityContext);

	if(!context) {
		throw new Error("useSerenity must be used within a SerenityProvider");
	}

	return context;
}

export { SerenityProvider, useSerenity };