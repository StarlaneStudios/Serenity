export * from "@serenity-ui/styles";

// components
export * from "./components/button";
export * from "./components/stack";
export * from "./components/group";
export * from "./components/spacer";
export * from "./components/divider";
export * from "./components/paper";
export * from "./components/simplegrid";

export type { Variant } from "./constants/variants";

// import css
// we want to import the css here so that it is included in the bundle when the user imports the package
import "@serenity-ui/styles/dist/style.css";
import "./styles/root.css";