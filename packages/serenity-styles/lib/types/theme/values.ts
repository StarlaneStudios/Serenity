
export type UnitValue = `${number}px` | `${number}rem` | `${number}em`;
export type ColorValue = `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` | `hsl(${number}, ${number}%, ${number}%)` | `hsla(${number}, ${number}%, ${number}%, ${number})`;
export type ColorNames = "dark" | "gray" | "red" | "pink" | "grape" | "violet" | "indigo" | "blue" | "cyan" | "teal" | "green" | "lime" | "yellow" | "orange";
export type ThemeNames = "light" | "dark";
export type Variant = "default" | "filled" | "light" | "outline" | "subtle" | "transparent" | "white";
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | (string & {});
export type Side = "t" | "r" | "b" | "l";
export type Axis = "x" | "y";