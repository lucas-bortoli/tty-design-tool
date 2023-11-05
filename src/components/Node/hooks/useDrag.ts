import { useEffect, MutableRefObject } from "react";
import { useTerminal } from "../../TerminalContext";
import { clamp } from "../../../utils/clamp";
import { Point, Size } from "../../../utils/Dimensions";

interface UseDragProps {
  size: Size;
  nodeRef: MutableRefObject<HTMLDivElement | null>;
  isSelected: boolean;
  setPosition: (newValue: Point) => void;
}

export function useDrag({ size, nodeRef, isSelected, setPosition }: UseDragProps) {
  const term = useTerminal();

  useEffect(() => {
    if (!nodeRef.current || !isSelected) {
      return;
    }

    const $node = nodeRef.current;
    let dragOffset: [number, number] | null = null;

    function onDragStart(event: MouseEvent) {
      if (event.target !== $node) {
        return;
      }

      const nodeRect = $node.getBoundingClientRect();

      dragOffset = [event.clientX - nodeRect.x, event.clientY - nodeRect.y];
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
    }

    function onDragMove(event: MouseEvent) {
      const $term = $node.parentElement!;
      const termRect = $term.getBoundingClientRect();
      const offsetX = event.clientX - termRect.x - dragOffset![0];
      const offsetY = event.clientY - termRect.y - dragOffset![1];

      const row = clamp(0, Math.floor(offsetY / term.rowHeight), term.rows - size.height);
      const column = clamp(0, Math.floor(offsetX / term.columnWidth), term.columns - size.width);

      setPosition({ x: column, y: row });
    }

    function onDragEnd(_event: MouseEvent) {
      dragOffset = null;

      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
    }

    $node.addEventListener("mousedown", onDragStart);

    return () => {
      $node.removeEventListener("mousedown", onDragStart);
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
    };
  }, [nodeRef, isSelected, size]);
}
