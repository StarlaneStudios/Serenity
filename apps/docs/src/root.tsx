// @refresh reload
import { Group } from "@serenity-ui/core";
import { Suspense } from "solid-js";
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";

export default function Root() {
	return (
		<Html lang="en" data-theme="dark">
			<Head>
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<Group spacing="xl">
							<A href="/">Index</A>
							<A href="/buttons">Buttons</A>
							<A href="/input">Inputs</A>
							<A href="/paper">Paper</A>
						</Group>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}