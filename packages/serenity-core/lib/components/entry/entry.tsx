import classes from "./entry.module.scss";
import { SerenityBaseProps, UTILITY_NAMES, b, buildStyles, c, localVars } from "@serenity-ui/styles";
import { OverrideComponentProps, composeEventHandlers } from "@kobalte/utils";
import { JSX } from "solid-js/jsx-runtime";
import { Show, mergeProps, splitProps } from "solid-js";
import { Chevron } from "../chevron";
import { Collapsible, createDisclosureState } from "@kobalte/core";
import { DefaultProps } from "../../typings/helpers";

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
	title: string;

	/**
	 * The subtitle to display
	 */
	subtitle?: string;

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
	"onClick"
] as const;

const defaultEntryProps: DefaultProps<EntryProps> = { 
	open: false,
	onOpenChange: undefined,
	defaultOpen: false,
	subtitle: undefined,
	subtitleLines: 1,
	leftSection: null,
	rightSection: null,
};

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
				class={classes['entry__inner']}
				onClick={composeEventHandlers([root.onClick, toggle])}
			>
				<Show when={baseProps.leftSection}>
					{leftSection => (
						<div class={classes['entry__left-section']}>
							{leftSection()}
						</div>
					)}
				</Show>
				<div class={classes['entry__content']}>
					<div class={classes['entry__title']}>
						{baseProps.title}
					</div>
					<Show when={baseProps.subtitle}>
						{subtitle => (
							<div class={classes['entry__subtitle']}>
								{subtitle()}
							</div>
						)}
					</Show>
				</div>
				<Show when={baseProps.children || baseProps.rightSection}>
					{(_) => (
						<div class={classes['entry__right-section']}>
							{baseProps.rightSection || (
								<Chevron
									class={classes['entry__chevron']}
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
	)
};

export { Entry, defaultEntryProps, EntryProps };