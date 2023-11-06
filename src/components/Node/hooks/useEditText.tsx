import { MutableRefObject, useEffect } from "react";

interface UseEditTextProps {
  nodeRef: MutableRefObject<HTMLDivElement | null>;
  text: string;
  setText: (n: string) => void;
}

export function useEditText({ nodeRef, text, setText }: UseEditTextProps) {
  useEffect(() => {
    const $node = nodeRef.current;

    if (!$node) {
      return;
    }

    function onDoubleClick() {
      const newValue = prompt(`Texto:`, text);

      if (newValue !== null && newValue.length >= 1) {
        setText(newValue);
      }
    }

    $node.addEventListener("dblclick", onDoubleClick);

    return () => $node.removeEventListener("dblclick", onDoubleClick);
  }, [text, nodeRef]);
}
