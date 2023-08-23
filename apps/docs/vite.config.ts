import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		cssCodeSplit: true
	},
	plugins: [
		solid({
			ssr: true
		})
	],
	ssr: {
		noExternal: [
			"@kobalte/core",
			"@serenity-ui/core",
			"solid-js",
			"solid-js/web",
			"solid-js/store"
		]
	}
});
