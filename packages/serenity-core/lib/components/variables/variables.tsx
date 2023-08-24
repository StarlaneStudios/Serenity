import { ThemeScheme } from "@serenity-ui/styles";
import { children, createEffect, mergeProps } from "solid-js";
import { useTheme } from "@serenity-ui/primitives";

interface VariablesProps {
	children: any;
	cssVariables: Record<string, any>;
	cssThemeVariables: Record<
		ThemeScheme | (string & {}),
		Record<string, any>
	>;
}

function Variables(props: VariablesProps) {

	const { theme } = useTheme();
	const child = children(() => props.children) as unknown as () => HTMLElement;
	// props.cssVariables, props.cssThemeVariables[theme()], child().style

	const themeVariables = () => {
		return props.cssThemeVariables[theme()];
	};
	
	const styleProperties = () => {
		const scheme = theme();
		const themeVariables = props.cssThemeVariables[scheme];

		return Object.assign(props.cssVariables, themeVariables);
	};

	createEffect(() => {
		console.log(theme());
	});

	return (
		<pre>
			{theme()}
			{JSON.stringify(themeVariables(), null, 2)}
		</pre>
	)
}

export { Variables, VariablesProps };