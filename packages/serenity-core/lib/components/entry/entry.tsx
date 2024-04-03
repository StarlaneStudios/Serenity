import classes from "./entry.module.scss";
import { OverrideComponentProps, composeEventHandlers } from "@kobalte/utils";
import { JSX } from "solid-js/jsx-runtime";
import { Show, mergeProps, splitProps } from "solid-js";
import { Chevron } from "../chevron";
import { Collapsible, createDisclosureState } from "@kobalte/core";
import { StylesProps } from "../../typings/helpers";
import { SerenityBaseProps } from "../../typings/props";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { localVars, c, b, s } from "../../utils/css";

interface EntryProps extends SerenityBaseProps {

	/**
	 * The controlled open state of the entry
	 */
	open?: boolean;

	/**
	 * Event handler called when the open state changes
	 */
	onOpenChange?: (value: boolean) => void;

	/**
	 * The initial open state of the entry used when uncontrolled
	 */
	defaultOpen?: boolean;

	/**
	 * The main title to display
	 */
	title: JSX.Element;

	/**
	 * The subtitle to display
	 */
	subtitle?: JSX.Element;

	/**
	 * The maximum number of lines to display for the subtitle, uses -webkit-line-clamp
	 * @default 1
	 */
	subtitleLines?: number;

	/**
	 * The content to display on the left side of the entry
	 */
	leftSection?: JSX.Element;

	/**
	 * The content to display on the right side of the entry
	 */
	rightSection?: JSX.Element;

	/**
	 * The styles to apply to the children of the entry component.
	 */
	styles?: StylesProps<'inner' | 'content' | 'title' | 'subtitle' | 'chevron' | 'left-section' | 'right-section'>;
}

const entrySplitProps = [
	"open",
	"onOpenChange",
	"defaultOpen",
	"title",
	"subtitle",
	"subtitleLines",
	"leftSection",
	"rightSection",
	"class",
	"style",
	"children",
	"onClick",
	"styles",
	"stylesStrategy"
] as const;

const defaultEntryProps = {
	open: false,
	onOpenChange: undefined,
	defaultOpen: false,
	subtitle: undefined,
	subtitleLines: 1,
	leftSection: null,
	rightSection: null,
	stylesStrategy: 'extend'
} satisfies Omit<EntryProps, 'title'>;

function Entry(props: OverrideComponentProps<"div", EntryProps>) {

	const [root, utils, other] = splitProps(props, entrySplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultEntryProps, root);

	const cssVariables = () => localVars({
		'subtitle-clamp': baseProps.subtitleLines,
	});

	const styles = () => buildStyles(utils, baseProps.style, cssVariables());

	const { toggle, isOpen } = createDisclosureState({
		open: () => baseProps.open,
		defaultOpen: () => baseProps.defaultOpen,
		onOpenChange: isOpen => baseProps.onOpenChange?.(isOpen),
	});

	const isClickable = !!root.onClick || root.children;
	const arrowDirection = () => isOpen() ? "up" : "down";

	return (
		<div
			class={c(classes['entry'], baseProps.class)}
			data-clickable={b(isClickable)}
			data-expanded={b(isOpen())}
			{...styles()}
			{...other}
		>
			<button
				class={s(baseProps.stylesStrategy, classes['entry__inner'], baseProps.styles?.inner)}
				onClick={composeEventHandlers([root.onClick, toggle])}
			>
				<Show when={baseProps.leftSection}>
					{leftSection => (
						<div class={s(baseProps.stylesStrategy, classes['entry__left-section'], baseProps.styles?.["left-section"])}>
							{leftSection()}
						</div>
					)}
				</Show>
				<div class={s(baseProps.stylesStrategy, classes['entry__content'], baseProps.styles?.content)}>
					<div class={s(baseProps.stylesStrategy, classes['entry__title'], baseProps.styles?.title)}>
						{baseProps.title}
					</div>
					<Show when={baseProps.subtitle}>
						{subtitle => (
							<div class={s(baseProps.stylesStrategy, classes['entry__subtitle'], baseProps.styles?.subtitle)}>
								{subtitle()}
							</div>
						)}
					</Show>
				</div>
				<Show when={baseProps.children || baseProps.rightSection}>
					{(_) => (
						<div class={s(baseProps.stylesStrategy, classes['entry__right-section'], baseProps.styles?.["right-section"])}>
							{baseProps.rightSection || (
								<Chevron
									class={s(baseProps.stylesStrategy, classes['entry__chevron'], baseProps.styles?.chevron)}
									orientation={arrowDirection()}
								/>
							)}
						</div>
					)}
				</Show>
			</button>
			<Collapsible.Root
				open={isOpen()}
				onOpenChange={toggle}
			>
				<Collapsible.Content>
					{baseProps.children}
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	);
};

export { Entry, defaultEntryProps, EntryProps };