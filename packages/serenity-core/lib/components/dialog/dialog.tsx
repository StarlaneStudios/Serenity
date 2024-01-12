import { JSX, ParentProps, ValidComponent, mergeProps, splitProps } from "solid-js";
import { As, Dialog as KobalteDialog } from "@kobalte/core";
import { DefaultProps } from "../../typings/helpers";
import classes from "./dialog.module.scss";
import { resolveLength } from "../../utils/resolvers";
import { localVars } from "../../utils/css";
import { buildStyles } from "../../utilities";
import { useSerenity } from "../../provider";
import { Icon } from "../icon";
import { mdiClose } from "@mdi/js";
import { Button } from "../button";

interface DialogProps extends KobalteDialog.DialogRootProps, ParentProps {
	title: JSX.Element;
	blur?: number | string;
	activator: JSX.Element;
}

const defaultDialogProps = {
	defaultOpen: false,
	modal: false,
	preventScroll: true,
	blur: 5,
	forceMount: true
} satisfies Partial<DefaultProps<DialogProps>>;

const dialogSplitProps = [
	"defaultOpen",
	"forceMount",
	"id",
	"modal",
	"onOpenChange",
	"open",
	"preventScroll",
	"blur"
] satisfies (keyof DialogProps)[];

function Dialog(props: DialogProps) {

	const serenity = useSerenity();

	const [root, other] = splitProps(props, dialogSplitProps);
	const baseProps = mergeProps(defaultDialogProps, root);

	const overlayCSSVariables = () => {
		const blur = resolveLength("blur", baseProps.blur, "px");
		return localVars({ blur });
	};

	const overlayStyles = () => buildStyles({}, overlayCSSVariables());

	return (
		<KobalteDialog.Root {...root}>
			<KobalteDialog.Trigger asChild>
				<As 
					component="span"
					children={other.activator}
				/>
			</KobalteDialog.Trigger>
			<KobalteDialog.Portal mount={serenity.element() ?? undefined}>
				<KobalteDialog.Overlay
					class={classes.dialog__overlay}
					{...overlayStyles()}
				/>
				<div class={classes.dialog__positioner}>
					<KobalteDialog.Content class={classes.dialog__content}>
						<div class={classes.dialog__header}>
							<KobalteDialog.Title
								class={classes.dialog__title}
								children={props.title}
							/>
							<KobalteDialog.CloseButton
								as="div"
								class={classes['dialog__close-button']}
							>
								<Button
									size="xs"
									variant="transparent"
									color="gray"
								>
									<Icon path={mdiClose} />
								</Button>
							</KobalteDialog.CloseButton>
						</div>
						{other.children}
					</KobalteDialog.Content>
				</div>
			</KobalteDialog.Portal>
		</KobalteDialog.Root>
	);
}

export {
	Dialog,
	DialogProps
};