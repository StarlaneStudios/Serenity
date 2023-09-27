import { JSX } from 'solid-js';
import { ColorValue } from "./theme";
import { Length } from "./values";

export interface UtilityStyleProps {

	// Margin
	m?: Length;
	my?: Length;
	mx?: Length;
	mt?: Length;
	mb?: Length;
	mr?: Length;
	ml?: Length;

	// Padding
	p?: Length;
	py?: Length;
	px?: Length;
	pt?: Length;
	pb?: Length;
	pl?: Length;
	pr?: Length;

	// Colors
	bg?: ColorValue;
	tc?: ColorValue;

	// Width & Height
	w?: Length;
	miw?: Length;
	maw?: Length;
	h?: Length;
	mih?: Length;
	mah?: Length;

	// Position
	pos?: JSX.CSSProperties['position'];
	top?: Length;
	left?: Length;
	bottom?: Length;
	right?: Length;
	inset?: Length;

	// Misc
	flex?: JSX.CSSProperties['flex'];
	display?: JSX.CSSProperties['display'];
	cursor?: JSX.CSSProperties['cursor'];
	z?: JSX.CSSProperties['z-index'];
}

interface SerenityDefaultProps {

	/**
	 * Wether to extend or replace the default styles.
	 * @default "extend"
	 */
	stylesStrategy?: "extend" | "replace";
}

export type SerenityBaseProps = UtilityStyleProps & SerenityDefaultProps;