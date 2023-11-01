import { createUniqueId } from "solid-js";
import { Accessor, ParentProps, Setter, createContext, createSignal, useContext } from "solid-js";
import { Theme, Color } from "./typings/theme";
import { resolveColor } from "./utils/resolvers";

const SerenityContext = createContext<{
	theme: Accessor<Theme>;
	setTheme: Setter<Theme>;
	toggleTheme: () => void;
	element: () => HTMLElement | null;
	accentColor: Accessor<Color>;
	setAccentColor: Setter<Color>;
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

	/**
	 * The accent color of the application.
	 * @default "blue.6"
	 */
	accentColor?: Exclude<Color, "accent">;
}

/**
 * A provider used to configure Serenity UI components.
 */
function SerenityProvider(props: ParentProps<SerenityProviderProps>) {
	const [currentTheme, setCurrentTheme] = createSignal<Theme>(props.initialTheme || 'light');
	const [accentColor, setAccentColor] = createSignal<Color>(props.accentColor || 'blue.6');

	const toggleTheme = () => {
		setCurrentTheme(theme => theme === 'light' ? 'dark' : 'light');
	};

	const uuid = createUniqueId();

	return (
		<SerenityContext.Provider
			value={{
				theme: currentTheme,
				setTheme: setCurrentTheme,
				toggleTheme,
				element: () => document.getElementById(uuid),
				accentColor,
				setAccentColor
			}}
		>
			<div 
				id={uuid} 
				class="serenity-ui" 
				data-theme={currentTheme()}
				style={{
					"--serenity-accent-color": resolveColor(props.accentColor || "blue.6")
				}}
			>
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