import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		solid({
			ssr: false
		})
	],
	ssr: {
		external: [
			"@serenity-ui/core",
			"@serenity-ui/styles",
			"@serenity-ui/utils",
			"@serenity-ui/primitives"
		]
	}
});
