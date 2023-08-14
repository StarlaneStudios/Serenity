export type {
	DefaultThemeColor,
	ThemeColorPaletteOverride,
	ThemeColorPalette,
	ThemeColor,
	Size
} from "./types/theme/index";

export type { Tuple } from "./tuple";

export * from "./functions/theme/css";
export * from "./functions/theme/color";

// import sass files.
import "./styles/index.scss";