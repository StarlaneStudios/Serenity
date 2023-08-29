import solid from "solid-start/vite";
import solidDev from "solid-devtools/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		solid({
			ssr: false,
			hot: false
		}),
		solidDev()
	]
});
