/**
 * CSS Unit types used internally in Serenity
 */
export type UnitType = "rem" | "em";

/**
 * The different accepted color formats
 */
export type ColorFormat = `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` | `hsl(${number}, ${number}%, ${number}%)` | `hsla(${number}, ${number}%, ${number}%, ${number})`;

/**
 * The names of colors provided by Serenity
 */
export type ColorNames = "dark" | "gray" | "red" | "pink" | "grape" | "violet" | "indigo" | "blue" | "cyan" | "teal" | "green" | "lime" | "yellow" | "orange";

/**
 * The names of themes provided by Serenity
 */
export type ThemeNames = "light" | "dark";

/**
 * Variants available in Serenity components
 */
export type Variant = "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";

/**
 * Preset size values
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * The direction as presented on a screen
 */
export type Orientation = "horizontal" | "vertical";

/**
 * A length value used in the styling system. Numbers will default to `rem` units
 */
export type Length = (number & {}) | (string & {}) | Size;

/**
 * Represents a side of a recutangular element
 */
export type Side = "t" | "r" | "b" | "l";