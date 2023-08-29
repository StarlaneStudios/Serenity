import { ThemeScheme } from "@serenity-ui/styles";
import { Accessor, ParentProps, Setter, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";

const SerenityContext = createContext<{
	theme: Accessor<ThemeScheme>;
	setTheme: Setter<ThemeScheme>;
	toggleTheme: () => void;
}>();

interface SerenityProviderProps {

	/**
	 * Sets the initial theme of the provider.
	 */
	initialTheme: ThemeScheme;

	/**
	 * Applies the theme to the target element instead of the root element.
	 */
	target?: HTMLElement | null;

}

function SerenityProvider(props: ParentProps<SerenityProviderProps>) {

	const [currentTheme, setCurrentTheme] = createSignal<ThemeScheme>(props.initialTheme);
	const target = props.target ?? document.documentElement;

	const toggleTheme = () => {
		setCurrentTheme(currentTheme() === "light" ? "dark" : "light");
	};

	createEffect(() => {
		target.dataset.theme = currentTheme();
	});

	const providerValues = {
		theme: currentTheme,
		setTheme: setCurrentTheme,
		toggleTheme	
	} as const;

	return (
		<SerenityContext.Provider value={providerValues}>
			{props.children}
		</SerenityContext.Provider>
	);
}

function useSerenity() {

	const context = useContext(SerenityContext);

	if (!context) {
		throw new Error("useSerenity must be used within a SerenityProvider");
	}

	return context;
}

export { SerenityProvider, useSerenity };