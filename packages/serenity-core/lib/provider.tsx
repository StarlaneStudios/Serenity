import { Theme } from "@serenity-ui/styles";
import { Accessor, ParentProps, Setter, createContext, createSignal, useContext } from "solid-js";

const SerenityContext = createContext<{
	theme: Accessor<Theme>;
	setTheme: Setter<Theme>;
	toggleTheme: () => void;
}>();

interface SerenityProviderProps {

	/**
	 * Sets the initial theme of the provider.
	 * 
	 * @default 'light'
	 */
	initialTheme?: Theme;

	/**
	 * Whether or not to apply global styles to the document.
	 * 
	 * @default true
	 */
	withGlobalStyle?: boolean;

}

/**
 * A provider used to configure Serenity UI components.
 */
function SerenityProvider(props: ParentProps<SerenityProviderProps>) {
	const [currentTheme, setCurrentTheme] = createSignal<Theme>(props.initialTheme || 'light');

	const toggleTheme = () => {
		setCurrentTheme(theme => theme === 'light' ? 'dark' : 'light');
	};

	return (
		<SerenityContext.Provider
			value={{
				theme: currentTheme,
				setTheme: setCurrentTheme,
				toggleTheme
			}}
		>
			<div class="serenity-ui" data-theme={currentTheme()}>
				{props.children}
			</div>
		</SerenityContext.Provider>
	);
}

/**
 * Access the Serenity UI context.
 * 
 * @returns The Serenity UI context.
 */
function useSerenity() {
	const context = useContext(SerenityContext);

	if(!context) {
		throw new Error("useSerenity must be used within a SerenityProvider");
	}

	return context;
}

export { SerenityProvider, useSerenity };