export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Rectangle = Point & Size;

export type Axis = "horizontal" | "vertical" | "both";
