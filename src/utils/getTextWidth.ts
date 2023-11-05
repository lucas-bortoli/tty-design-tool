/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export function getTextWidth(text: string, font: string): number {
  const withCanvas = getTextWidth as unknown as { canvas: HTMLCanvasElement };

  // re-use canvas object for better performance
  const canvas = withCanvas.canvas || (withCanvas.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d")!;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
