import { useEffect, MutableRefObject } from "react";
import { useTerminal } from "../../TerminalContext";
import { clamp } from "../../../utils/clamp";
import { Axis, Size } from "../../../utils/Dimensions";

interface UseResizeProps {
  nodeRef: MutableRefObject<HTMLDivElement | null>;
  resizeHandleRef: MutableRefObject<HTMLSpanElement | null>;
  isSelected: boolean;
  axis: Axis;
  setSize: (newValue: Size) => void;
}

export function useResize({ nodeRef, resizeHandleRef, isSelected, axis, setSize }: UseResizeProps) {
  const term = useTerminal();

  useEffect(() => {
    if (!nodeRef.current || !resizeHandleRef.current || !isSelected) {
      return;
    }

    const $node = nodeRef.current;
    const $handle = resizeHandleRef.current;

    function onResizeStart(event: MouseEvent) {
      if (event.target !== $handle) {
        return;
      }

      document.addEventListener("mousemove", onResizeMouseMove);
      document.addEventListener("mouseup", onResizeEnd);
    }

    function onResizeMouseMove(event: MouseEvent) {
      const nodeRect = $node.getBoundingClientRect();

      const offsetHorizontal = event.clientX - nodeRect.x;
      const offsetVertical = event.clientY - nodeRect.y;

      const cols = clamp(1, Math.floor(offsetHorizontal / term.columnWidth), term.columns);
      const rows = clamp(1, Math.floor(offsetVertical / term.rowHeight), term.rows);

      setSize({ width: cols, height: rows });
    }

    function onResizeEnd(_event: MouseEvent) {
      document.removeEventListener("mousemove", onResizeMouseMove);
      document.removeEventListener("mouseup", onResizeEnd);
    }

    $node.addEventListener("mousedown", onResizeStart);

    return () => {
      $node.removeEventListener("mousedown", onResizeStart);
      document.removeEventListener("mousemove", onResizeMouseMove);
      document.removeEventListener("mouseup", onResizeEnd);
    };
  }, [nodeRef, resizeHandleRef, axis, isSelected]);
}
