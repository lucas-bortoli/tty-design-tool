interface UseTextJustifyProps {
  text: string;
  justifyContent?: "start" | "center" | "end";
  desiredWidth?: number;
}

export function useTextJustify({ text, justifyContent, desiredWidth }: UseTextJustifyProps) {
  desiredWidth = desiredWidth ?? text.length;
  justifyContent = justifyContent ?? "start";

  if (text.length < desiredWidth) {
    if (justifyContent === "start") {
      text = text.padEnd(desiredWidth);
    } else if (justifyContent === "end") {
      text = text.padStart(desiredWidth);
    } else if (justifyContent === "center") {
      // Center text
      const availableSpace = desiredWidth - text.length;
      const startSpace = Math.round(availableSpace / 2);
      const endSpace = availableSpace - startSpace;

      text = " ".repeat(startSpace) + text;
      text = text + " ".repeat(endSpace);
    }
  } else if (text.length > desiredWidth) {
    if (justifyContent === "start") {
      text = text.slice(0, desiredWidth);
    } else if (justifyContent === "end") {
      text = text.slice(-desiredWidth);
    } else if (justifyContent === "center") {
      // Center text
      const cutoffLength = text.length - desiredWidth;
      const startCutoff = Math.round(cutoffLength / 2);
      const endCutoff = text.length - (cutoffLength - startCutoff);

      text = text.slice(startCutoff, endCutoff);
    }
  }

  return text;
}
