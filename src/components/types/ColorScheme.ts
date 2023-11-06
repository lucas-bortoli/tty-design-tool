/**
 * Represents a color value with a specific type for color schemes.
 */
export type ColorIdentifier = number | "bg" | "fg";

/**
 * Represents a hex color value with a specific type for color schemes.
 */
export type HexColor = string & { __brand?: "HexColor" };

/**
 * Represents a color scheme with a defined structure.
 */
export interface ColorScheme {
  name: string;
  author: string;
  color: HexColor[];
  foreground: HexColor;
  background: HexColor;
}

/**
 * The default color scheme.
 */
export const defaultScheme: ColorScheme = {
  name: "",
  author: "",
  color: [
    "#1b1d1e",
    "#f92672",
    "#82b414",
    "#fd971f",
    "#4e82aa",
    "#8c54fe",
    "#465457",
    "#ccccc6",
    "#505354",
    "#ff5995",
    "#b6e354",
    "#feed6c",
    "#0c73c2",
    "#9e6ffe",
    "#899ca1",
    "#f8f8f2",
  ],
  foreground: "#ffffff",
  background: "#010101",
};

/**
 * Gets a color from the specified color scheme based on the provided color identifier.
 * @param scheme - The color scheme.
 * @param color - The color identifier or special values "bg" or "fg" for background and foreground.
 * @returns The hex color value.
 */
export function getColorFromScheme(scheme: ColorScheme, color: ColorIdentifier) {
  switch (color) {
    case "bg":
      return scheme.background;
    case "fg":
      return scheme.foreground;
    default:
      return scheme.color[color];
  }
}
