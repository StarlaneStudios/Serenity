import { ThemeScheme } from "@serenity-ui/styles";
import { createEffect, createSignal } from "solid-js";

/**
 * A hook that manages the theme of the application. It can be scoped to a specific element or the entire document.
 * @param target 
 * @returns 
 */
export function useTheme(target?: HTMLElement | null) {

	const htmlElement = target ?? document.querySelector("html");
	const initialTheme = htmlElement?.getAttribute('data-theme') as ThemeScheme | undefined;

	const [theme, setCurrentTheme] = createSignal<ThemeScheme | (string & {})>(initialTheme ?? 'light');

	/**
	 * Toggles the theme between light and dark
	 */
	const toggleTheme = (): void => {
		setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
	};

	/**
	 * Sets the theme to the specified theme
	 * @param theme 
	 */
	const setTheme = (theme: ThemeScheme | (string & {})) => {
		setCurrentTheme(theme);
	};
	
	/**
	 * Listens for changes to the theme and updates the html element
	 */
	createEffect(() => {
		htmlElement?.setAttribute('data-theme', theme());
	});

	return {
		toggleTheme,
		setTheme,
		theme
	} as const;
};