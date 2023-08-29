// @refresh reload
import { Suspense } from "solid-js";
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start";
import "./root.css";

import "@serenity-ui/styles/dist/style.css";
import "@serenity-ui/core/dist/index.css";
import "@serenity-ui/core/dist/normalize.css";
import { SerenityProvider } from "@serenity-ui/core";

export default function Root() {
	return (
		<Html class="serenity-css-reset" lang="en" data-theme="dark">
			<Head>
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<SerenityProvider initialTheme="dark">
					<Suspense>
						<ErrorBoundary>
							<Routes>
								<FileRoutes />
							</Routes>
						</ErrorBoundary>
					</Suspense>
				</SerenityProvider>
				<Scripts />
			</Body>
		</Html>
	);
}
