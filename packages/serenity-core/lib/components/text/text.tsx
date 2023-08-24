import { JSX } from "solid-js";

type TextProps<T extends keyof JSX.IntrinsicElements> = {
	as?: T;
} & JSX.IntrinsicElements[T];

const defaultTextProps: Required<Pick<
	TextProps<"p">,
	'as'
>> = {
	as: "p"
};

function Text<T extends keyof JSX.IntrinsicElements>(props: TextProps<T>) {

	const Component = "p";

	return (
		<Component>
			{props.children as JSX.Element}
		</Component>
	);
}

export {
	Text
};