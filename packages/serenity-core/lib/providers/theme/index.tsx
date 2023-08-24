import { ThemeScheme } from "@serenity-ui/styles";
import { Accessor, JSX, Setter, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";

interface ThemeProviderProps {

	/**
	 * Sets the initial theme of the provider.
	 */
	initialTheme: ThemeScheme;

	/**
	 * Applies the theme to the target element instead of the root element.
	 */
	target?: HTMLElement | null;
	children: JSX.Element | JSX.Element[];
}

const ThemeContext = createContext<{
	theme: Accessor<ThemeScheme>;
	setTheme: Setter<ThemeScheme>;
	toggleTheme: () => void;

}>();

function ThemeProvider(props: ThemeProviderProps) {

	const [currentTheme, setCurrentTheme] = createSignal<ThemeScheme>(props.initialTheme);
	const target = props.target ?? document.documentElement;

	const toggleTheme = () => {
		setCurrentTheme(currentTheme() === "light" ? "dark" : "light");
	};

	onMount(() => {
		target.dataset.theme = currentTheme();
	});

	createEffect(() => {
		target.dataset.theme = currentTheme();
	})

	return (
		<ThemeContext.Provider
			value={{
				theme: currentTheme,
				setTheme: setCurrentTheme,
				toggleTheme
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
}

function useTheme() {
	
	const context = useContext(ThemeContext);

	if(!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}

export { ThemeProvider, useTheme };