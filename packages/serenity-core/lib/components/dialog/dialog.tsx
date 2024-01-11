import { mergeProps, splitProps } from "solid-js";
import { Dialog as KobalteDialog } from "@kobalte/core";
import { DefaultProps } from "../../typings/helpers";
import classes from "./dialog.module.scss";
import { resolveLength } from "../../utils/resolvers";
import { localVars } from "../../utils/css";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { SerenityBaseProps } from "../../typings/props";
import { Length } from "../../typings/values";

interface DialogProps extends SerenityBaseProps, KobalteDialog.DialogRootProps {
	title: string;
	description?: string;

	blur?: number | string;
	size?: Length;
}

const defaultDialogProps = {
	defaultOpen: false,
	modal: true,
	preventScroll: true,
	blur: 5,
	size: "lg"
} satisfies Partial<DefaultProps<DialogProps>>;

const dialogSplitProps = [
	"defaultOpen",
	"forceMount",
	"id",
	"modal",
	"onOpenChange",
	"open",
	"preventScroll",
	"blur",
	"size"
] satisfies (keyof DialogProps)[];

function Dialog(props: DialogProps) {

	const [root, utils, other] = splitProps(props, dialogSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultDialogProps, root);

	const overlayCSSVariables = () => {
		const blur = resolveLength("blur", baseProps.blur, "px");
		return localVars({ blur });
	};

	const overlayStyles = () => buildStyles(utils, overlayCSSVariables());

	return (
		<KobalteDialog.Root
			{...root}
		>
			<KobalteDialog.Trigger children={other.children} />
			<KobalteDialog.Portal>
				<KobalteDialog.Overlay
					class={classes['dialog__overlay']}
					{...overlayStyles()}
				/>
				<KobalteDialog.Content
					class={classes['dialog__content']}
				>
					<KobalteDialog.CloseButton />
					<KobalteDialog.Title children={props.title} />
					<KobalteDialog.Description children={props.description} />
				</KobalteDialog.Content>
			</KobalteDialog.Portal>
		</KobalteDialog.Root>
	);
}

export {
	Dialog,
	DialogProps
};