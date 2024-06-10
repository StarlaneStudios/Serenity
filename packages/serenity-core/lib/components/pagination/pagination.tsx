import { Pagination as KobaltePagination } from "@kobalte/core";
import paginationClasses from "./pagination.module.scss";
import { JSX, mergeProps, splitProps } from "solid-js";
import { c, localVars } from "../../utils/css";
import { Button } from "../button";
import { UTILITY_NAMES, buildStyles } from "../../utilities";
import { SerenityBaseProps } from "../../typings/props";
import { resolveColor } from "../../utils/resolvers";
import { ColorValue, DefaultThemeNames } from "../../typings/theme";
import { Icon } from "../icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { useSerenity } from "../../provider";

export interface PaginationProps extends SerenityBaseProps, Omit<KobaltePagination.PaginationRootProps, "itemComponent" | "ellipsisComponent" | "color"> {
	class?: string;
	color: ColorValue;
	previousLabel?: JSX.Element;
	nextLabel?: JSX.Element;
}

interface EllipsisProps { }

interface ItemProps {
	page: number;
	buttonProps: () => { color: string; variant: string; };
}

const paginationSplitProps = [
	"class",
	"color",
	"style",
	"previousLabel",
	"nextLabel",
] satisfies (keyof PaginationProps)[];

const defaultPaginationProps = {
	color: "blue",
	fixedItems: true
} satisfies Partial<PaginationProps>;

const ItemComponent = (props: ItemProps) => {

	const Component = KobaltePagination.Item as any;

	return (
		<Component
			as={Button}
			page={props.page}
			role="button"
			{...props.buttonProps()}
		>
			{props.page}
		</Component>
	);
};

const EllipsisComponent = (props: EllipsisProps) => {

	const Component = KobaltePagination.Ellipsis as any;

	return (
		<Component
			as={Button}
			role="button"
			variant="transparent"
			color="dark.3"
			data-element="ellipsis"
			{...props}
		>
			...
		</Component>
	);
};

const Previous = KobaltePagination.Previous as any;
const Next = KobaltePagination.Next as any;

export function Pagination(props: PaginationProps) {

	const { theme } = useSerenity();
	const [root, utils, others] = splitProps(props, paginationSplitProps, UTILITY_NAMES);
	const baseProps = mergeProps(defaultPaginationProps, root);

	const cssVariable = () => {
		const color = resolveColor(baseProps.color);
		const variables = localVars({ color });

		return Object.assign(variables);
	};

	const styles = () => buildStyles(utils, cssVariable(), baseProps.style);

	const buttonProps = () => {
		const _theme = theme();

		if (_theme === "dark") {
			return { color: "gray.3", variant: "light" };
		}

		return { color: "dark.3", variant: "outline" };
	};

	return (
		<KobaltePagination.Root
			class={c(paginationClasses.root, root.class)}
			itemComponent={(ip) => <ItemComponent page={ip.page} buttonProps={buttonProps} />}
			ellipsisComponent={() => <EllipsisComponent />}
			{...styles()}
			{...others}
		>
			<Previous
				as={Button}
				{...buttonProps()}
			>
				<Icon path={mdiChevronLeft} />
			</Previous>
			<KobaltePagination.Items />
			<Next
				as={Button}
				{...buttonProps()}
			>
				<Icon path={mdiChevronRight} />
			</Next>
		</KobaltePagination.Root>
	);
}