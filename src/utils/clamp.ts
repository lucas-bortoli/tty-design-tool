/**
 * Clamps a value within a specified range.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} value - The value to be clamped.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - The clamped value, restricted to the specified range [min, max].
 * @example
 * // Clamping a value between 10 and 20
 * const result = clamp(10, 15, 20); // Returns 15
 */
export function clamp(min: number, value: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
