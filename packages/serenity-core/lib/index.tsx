import "./styles/variables.scss";
import "./styles/global.scss";

export * from "./provider";

export * from "./components/accordion";
export * from "./components/button";
export * from "./components/chevron";
export * from "./components/column";
export * from "./components/divider";
export * from "./components/icon";
export * from "./components/input";
export * from "./components/layout";
export * from "./components/paper";
export * from "./components/row";
export * from "./components/spacer";

// Vite sees this import and splits this file into a separate chunk.
// We can import this chunk in any app to load reset the styles. but it's optional.
import("./styles/normalize.scss");