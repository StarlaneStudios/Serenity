import { ThemeScheme } from "@serenity-ui/styles";
import { JSX, children, createEffect, mergeProps } from "solid-js";
import { useTheme } from "../../providers/theme";

interface VariablesProps {
	children: JSX.Element;
	cssVariables: Record<string, any>;
	cssThemeVariables: Record<
		ThemeScheme | (string & {}),
		Record<string, any>
	>;
}

function Variables(props: VariablesProps) {

	const { theme } = useTheme();
	const child = children(() => props.children) as unknown as () => HTMLElement;

	const themeVariables = () => {
		return props.cssThemeVariables[theme()] ?? {};
	};

	createEffect(() => {

		const variables = Object.assign(themeVariables(), props.cssVariables);

		for (const [key, value] of Object.entries(variables)) {
			child().style.setProperty(key, value);
		}
	});

	return child();
}

export { Variables, VariablesProps };