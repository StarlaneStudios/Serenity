import { defineConfig } from "tsup";

export default defineConfig({
	entry: ['lib/index.ts'],
	tsconfig: './tsconfig.json'
});