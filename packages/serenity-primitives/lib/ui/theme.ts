import { ThemeScheme } from "@serenity-ui/styles";

/**
 * A hook that manages the theme of the application. It can be scoped to a specific element or the entire document.
 * @param target 
 * @returns 
 */
export function useThemeSwitcher(target?: HTMLElement | null) {
	const htmlElement = target ?? document.querySelector("html");

	/**
	 * Toggles the theme between light and dark
	 */
	const toggleTheme = (): void => {
		const currentTheme = htmlElement?.getAttribute('data-theme') as ThemeScheme;
		setTheme(currentTheme === "dark" ? 'light' : 'dark');
	};

	/**
	 * Sets the theme to the specified theme
	 * @param theme 
	 */
	const setTheme = (theme: ThemeScheme | (string & {})) => {
		htmlElement?.setAttribute('data-theme', theme);
	};

	return {
		toggleTheme,
		setTheme
	} as const;
};