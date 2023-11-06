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

/**
 * Adds two points and returns the result.
 * @param a - The first point.
 * @param b - The second point.
 * @returns The sum of the two points.
 */
export function pointAdd(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Subtracts the second point from the first point and returns the result.
 * @param a - The first point.
 * @param b - The second point.
 * @returns The result of subtracting the second point from the first point.
 */
export function pointSubtract(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Adds two sizes and returns the result.
 * @param a - The first size.
 * @param b - The second size.
 * @returns The sum of the two sizes.
 */
export function sizeAdd(a: Size, b: Size): Size {
  return { width: a.width + b.width, height: a.height + b.height };
}

/**
 * Subtracts the second size from the first size and returns the result.
 * @param a - The first size.
 * @param b - The second size.
 * @returns The result of subtracting the second size from the first size.
 */
export function sizeSubtract(a: Size, b: Size): Size {
  return { width: a.width - b.width, height: a.height - b.height };
}

/**
 * Adds two rectangles and returns the result.
 * @param a - The first rectangle.
 * @param b - The second rectangle.
 * @returns The sum of the two rectangles.
 */
export function rectangleAdd(a: Rectangle, b: Rectangle): Rectangle {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    width: a.width + b.width,
    height: a.height + b.height,
  };
}

/**
 * Subtracts the second rectangle from the first rectangle and returns the result.
 * @param a - The first rectangle.
 * @param b - The second rectangle.
 * @returns The result of subtracting the second rectangle from the first rectangle.
 */
export function rectangleSubtract(a: Rectangle, b: Rectangle): Rectangle {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    width: a.width - b.width,
    height: a.height - b.height,
  };
}
